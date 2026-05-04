from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q, Subquery, OuterRef
from django.utils import timezone
from .models import Exam, Submission, ExamAnalyticsCache
from .serializers import ExamListSerializer
from .services.exam_analytics import ExamAnalyticsService

class ExamAnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ExamListSerializer

    def get_queryset(self):
        if not self.request.user or not self.request.user.is_authenticated:
            return Exam.objects.none()
            
        owner_id = getattr(self.request.user, 'id', None)
        qs = Exam.objects.filter(owner_id=owner_id).order_by("-created_at")

        # Annotate submission counts
        qs = qs.annotate(
            submission_count=Count('submission', distinct=True),
            # Approximate graded count (has at least one result or override score)
            graded_count=Count('submission', filter=Q(submission__visiongradingresult__isnull=False) | Q(submission__override_total_score__isnull=False), distinct=True)
        )

        # Annotate cache status
        cache_sq = ExamAnalyticsCache.objects.filter(exam_id=OuterRef('pk'))
        qs = qs.annotate(
            analytics_cached=Subquery(cache_sq.values('exam_id')[:1]),
            analytics_computed_at=Subquery(cache_sq.values('computed_at')[:1])
        )
        return qs

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        exam = self.get_object()
        
        force = request.query_params.get('force', 'false').lower() == 'true'
        
        service = ExamAnalyticsService()
        result = service.compute_analytics(exam.id, force_refresh=force)
        
        if "error" in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
        # Add exam metadata
        cache = ExamAnalyticsCache.objects.filter(exam_id=exam.id).first()
        computed_at = cache.computed_at if cache else timezone.now()
        model_used = cache.model_name if cache else service.model_name
        
        final_payload = {
            "examMeta": {
                "id": exam.id,
                "name": exam.name,
                "grade_level": exam.grade_level,
                "topic": exam.topic,
                "computed_at": computed_at,
                "model_used": model_used
            }
        }
        final_payload.update(result)
        
        return Response(final_payload)

    @action(detail=True, methods=['post'])
    def refresh(self, request, pk=None):
        exam = self.get_object()
        service = ExamAnalyticsService()
        result = service.compute_analytics(exam.id, force_refresh=True)
        
        if "error" in result:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
        # Add exam metadata
        cache = ExamAnalyticsCache.objects.get(exam_id=exam.id)
        
        final_payload = {
            "examMeta": {
                "id": exam.id,
                "name": exam.name,
                "grade_level": exam.grade_level,
                "topic": exam.topic,
                "computed_at": cache.computed_at,
                "model_used": cache.model_name
            }
        }
        final_payload.update(result)
        
        return Response(final_payload)

@api_view(['GET'])
@permission_classes([])
def health_check(request):
    return Response({"status": "ok"})
