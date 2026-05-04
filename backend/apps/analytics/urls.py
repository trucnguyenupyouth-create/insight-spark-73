from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExamAnalyticsViewSet, health_check

router = DefaultRouter()
router.register(r'exams', ExamAnalyticsViewSet, basename='exam')

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('', include(router.urls)),
]
