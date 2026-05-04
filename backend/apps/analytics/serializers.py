from rest_framework import serializers
from .models import Exam, ExamAnalyticsCache

class ExamListSerializer(serializers.ModelSerializer):
    submission_count = serializers.IntegerField(read_only=True)
    graded_count = serializers.IntegerField(read_only=True)
    analytics_cached = serializers.BooleanField(read_only=True)
    analytics_computed_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Exam
        fields = [
            "id",
            "name",
            "topic",
            "grade_level",
            "exam_type",
            "created_at",
            "submission_count",
            "graded_count",
            "analytics_cached",
            "analytics_computed_at"
        ]
