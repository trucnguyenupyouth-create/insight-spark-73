from django.db import models

# Read-only mirrors of the grading app tables (no migrations generated for these)
class Exam(models.Model):
    name = models.CharField(max_length=255)
    topic = models.CharField(max_length=255, blank=True, null=True)
    grade_level = models.IntegerField(blank=True, null=True)
    exam_type = models.CharField(max_length=50)
    owner_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'exams_exam'

class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.DO_NOTHING)
    label = models.CharField(max_length=50)
    max_score = models.FloatField(blank=True, null=True)
    content_summary = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exams_question'

class Submission(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.DO_NOTHING)
    student_name = models.CharField(max_length=255, blank=True, null=True)
    override_total_score = models.FloatField(blank=True, null=True)
    # report_score does not exist in this production schema — omitted intentionally
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'submissions_submission'

class VisionGradingResult(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.DO_NOTHING)
    question = models.ForeignKey(Question, on_delete=models.DO_NOTHING)
    score = models.FloatField(blank=True, null=True)
    is_correct = models.BooleanField(default=False)
    is_unattempted = models.BooleanField(default=False)
    is_latest = models.BooleanField(default=True)
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'vision_grading_results'

class VisionGradingStep(models.Model):
    grading_result = models.ForeignKey(VisionGradingResult, on_delete=models.DO_NOTHING)
    description = models.TextField()
    is_correct = models.BooleanField(default=True)
    error_classification = models.CharField(max_length=50, default='none')
    feedback = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'vision_grading_steps'


# Dashboard-owned cache table
class ExamAnalyticsCache(models.Model):
    exam_id = models.IntegerField(unique=True)
    analytics_json = models.JSONField()
    model_name = models.CharField(max_length=100)
    computed_at = models.DateTimeField(auto_now=True)
    version = models.IntegerField(default=1)

    class Meta:
        managed = False
        db_table = 'exam_analytics_cache'
