import json
import logging
from django.db.models import Sum, Q
from ..models import VisionGradingResult, VisionGradingStep, ExamAnalyticsCache, Submission, Exam, Question
import google.generativeai as genai
from .analytics_prompt import ANALYTICS_SYSTEM_PROMPT

logger = logging.getLogger(__name__)

class ExamAnalyticsService:
    def __init__(self, model_name="gemini-3-pro-preview", api_key=None):
        self.model_name = model_name
        self.api_key = api_key

    def compute_analytics(self, exam_id: int, force_refresh=False) -> dict:
        """
        Main entry point. Computes Phase 1 (deterministic) and Phase 2 (AI-powered) analytics.
        Returns the combined JSON payload matching the dashboard's data contract.
        """
        # Check cache unless forcing refresh
        if not force_refresh:
            try:
                cache = ExamAnalyticsCache.objects.get(exam_id=exam_id)
                return cache.analytics_json
            except ExamAnalyticsCache.DoesNotExist:
                pass

        logger.info(f"Computing analytics for exam {exam_id}")
        
        # --- Phase 1: Deterministic Data ---
        exam, questions, submissions, results, steps = self._load_data(exam_id)
        
        if not submissions:
            return {"error": "No submissions found for this exam"}

        score_matrix = self._build_score_matrix(submissions, results, questions)
        students_with_groups = self._assign_groups(score_matrix)
        class_metrics = self._compute_class_metrics(students_with_groups)
        students_with_risk = self._compute_risk_scores(students_with_groups, steps)
        student_groups = self._build_student_groups(students_with_risk)
        group_weaknesses = self._compute_group_weaknesses(student_groups, score_matrix)

        # --- Phase 2: AI-Powered Analysis ---
        ai_response = self._run_ai_analysis(exam, questions, steps, student_groups)

        # --- Assembly: Merge Deterministic + AI Data ---
        final_payload = self._assemble_final_output(
            class_metrics, 
            students_with_risk, 
            student_groups, 
            group_weaknesses, 
            ai_response,
            score_matrix,
            questions,
            steps
        )

        # Cache result
        ExamAnalyticsCache.objects.update_or_create(
            exam_id=exam_id,
            defaults={
                'analytics_json': final_payload,
                'model_name': self.model_name,
                'version': 1
            }
        )

        return final_payload

    def _load_data(self, exam_id: int):
        exam = Exam.objects.get(id=exam_id)
        questions = list(Question.objects.filter(exam_id=exam_id))
        submissions = list(Submission.objects.filter(exam_id=exam_id))
        sub_ids = [s.id for s in submissions]
        
        # Only use latest results
        results = list(VisionGradingResult.objects.filter(
            submission_id__in=sub_ids, 
            is_latest=True
        ))
        
        res_ids = [r.id for r in results]
        steps = list(VisionGradingStep.objects.filter(grading_result_id__in=res_ids))
        
        return exam, questions, submissions, results, steps

    def _build_score_matrix(self, submissions, results, questions):
        """Builds deduplicated score matrix mapping (sub_id, q_id) to score and status."""
        # Fix is_latest duplication by taking the most recently updated result per (submission, question)
        results.sort(key=lambda x: x.updated_at, reverse=True)
        dedup_results = {}
        for r in results:
            key = (r.submission_id, r.question_id)
            if key not in dedup_results:
                dedup_results[key] = r

        # Infer max scores if needed
        q_max_scores = {}
        for q in questions:
            if q.max_score and q.max_score > 0:
                q_max_scores[q.id] = q.max_score
            else:
                # Infer max score from observed scores
                q_results = [r for r in dedup_results.values() if r.question_id == q.id and r.score is not None]
                if q_results:
                    q_max_scores[q.id] = max((r.score for r in q_results))
                else:
                    q_max_scores[q.id] = 1.0 # Ultimate fallback

        matrix = {}
        for s in submissions:
            matrix[s.id] = {
                'submission': s,
                'total_score': 0.0,
                'results': {}
            }
            # Use override score if available, otherwise sum of question scores
            raw_sum = 0.0
            for q in questions:
                r = dedup_results.get((s.id, q.id))
                score = r.score if r and r.score is not None else 0.0
                max_s = q_max_scores[q.id]
                status = "unattempted"
                if r:
                    if r.is_correct:
                        status = "correct"
                    elif r.is_unattempted:
                        status = "unattempted"
                    elif score > 0:
                        status = "partial"
                    else:
                        status = "incorrect"
                        
                matrix[s.id]['results'][q.id] = {
                    'score': score,
                    'maxScore': max_s,
                    'status': status,
                    'label': q.label
                }
                raw_sum += score
            
            # Use report score if present, then override, then sum
            if getattr(s, 'report_score', None) is not None:
                matrix[s.id]['total_score'] = float(s.report_score)
            elif getattr(s, 'override_total_score', None) is not None:
                matrix[s.id]['total_score'] = float(s.override_total_score)
            else:
                matrix[s.id]['total_score'] = raw_sum

        return matrix

    def _assign_groups(self, score_matrix):
        """Assign groups based on total score."""
        for s_id, data in score_matrix.items():
            score = data['total_score']
            if score >= 8.0:
                data['group'] = 'Giỏi'
            elif score >= 6.5:
                data['group'] = 'Khá'
            elif score >= 5.0:
                data['group'] = 'TB'
            else:
                data['group'] = 'Yếu'
        return score_matrix

    def _compute_class_metrics(self, students_with_groups):
        scores = [d['total_score'] for d in students_with_groups.values()]
        total = len(scores)
        if total == 0:
            return {"totalStudents": 0, "averageScore": 0, "highestScore": 0, "lowestScore": 0, "attendanceRate": 0}
            
        return {
            "totalStudents": total,
            "averageScore": round(sum(scores) / total, 2),
            "highestScore": max(scores),
            "lowestScore": min(scores),
            "attendanceRate": 100 # Default for now
        }

    def _compute_risk_scores(self, students_with_groups, steps):
        """Calculate deterministic risk score."""
        # Count critical original errors per student
        student_error_counts = {}
        for step in steps:
            if step.is_correct == False and step.error_classification == 'original':
                res = step.grading_result
                student_error_counts[res.submission_id] = student_error_counts.get(res.submission_id, 0) + 1

        for s_id, data in students_with_groups.items():
            score = data['total_score']
            max_possible = 10.0
            
            score_comp = max(0, (1 - score / max_possible)) * 60
            err_count = student_error_counts.get(s_id, 0)
            severity_comp = min(err_count * 4, 40)
            
            risk = min(100, round(score_comp + severity_comp))
            data['riskScore'] = risk
            data['riskBreakdown'] = {
                'averageScore': round(score_comp, 1),
                'severity': round(severity_comp, 1),
                'trend': 0,
                'total': risk
            }
            data['original_error_count'] = err_count
            
        return students_with_groups

    def _build_student_groups(self, students_with_risk):
        groups = {
            "Giỏi": {"id": "1", "name": "Nhóm Giỏi", "level": "Giỏi", "count": 0, "total_score": 0, "students": [], "riskLevel": "Thấp"},
            "Khá": {"id": "2", "name": "Nhóm Khá", "level": "Khá", "count": 0, "total_score": 0, "students": [], "riskLevel": "Thấp"},
            "TB": {"id": "3", "name": "Nhóm TB", "level": "TB", "count": 0, "total_score": 0, "students": [], "riskLevel": "Trung bình"},
            "Yếu": {"id": "4", "name": "Nhóm Yếu", "level": "Yếu", "count": 0, "total_score": 0, "students": [], "riskLevel": "Cao"},
        }
        
        total_students = len(students_with_risk)
        
        for s_id, data in students_with_risk.items():
            g = data['group']
            groups[g]['count'] += 1
            groups[g]['total_score'] += data['total_score']
            groups[g]['students'].append({
                "id": str(s_id),
                "name": data['submission'].student_name or f"Student {s_id}",
                "score": data['total_score'],
                "riskScore": data['riskScore'],
                "group": g
            })
            
        for g_name, g_data in groups.items():
            g_data['percentage'] = round((g_data['count'] / total_students) * 100, 1) if total_students > 0 else 0
            g_data['averageScore'] = round(g_data['total_score'] / g_data['count'], 2) if g_data['count'] > 0 else 0
            
        return groups

    def _compute_group_weaknesses(self, student_groups, score_matrix):
        group_weaknesses = {"Giỏi": [], "Khá": [], "TB": [], "Yếu": []}
        
        # For each group, find questions where >50% scored 0 or <= half max
        for group_name, group_data in student_groups.items():
            group_student_ids = [int(s['id']) for s in group_data['students']]
            if not group_student_ids:
                continue
                
            q_stats = {}
            for s_id in group_student_ids:
                for q_id, q_data in score_matrix[s_id]['results'].items():
                    if q_id not in q_stats:
                        q_stats[q_id] = {'label': q_data['label'], 'fail_count': 0, 'total': 0}
                    q_stats[q_id]['total'] += 1
                    if q_data['score'] <= (q_data['maxScore'] / 2):
                        q_stats[q_id]['fail_count'] += 1
                        
            for q_id, stats in q_stats.items():
                if stats['total'] > 0 and (stats['fail_count'] / stats['total']) > 0.5:
                    perc = round((stats['fail_count'] / stats['total']) * 100)
                    group_weaknesses[group_name].append({
                        "question_label": stats['label'],
                        "percentage": perc,
                        "description": f"{stats['fail_count']}/{stats['total']} học sinh {group_name} không làm được hoặc bị điểm kém {stats['label']}"
                    })
                    
        return group_weaknesses

    def _run_ai_analysis(self, exam, questions, steps, student_groups):
        """Phase 2: Single structured LLM call to get topics, error taxonomy, and interventions."""
        # 1. Prepare Questions
        q_context = []
        for q in questions:
            q_context.append({
                "label": q.label,
                "content_summary": getattr(q, 'content_summary', '') or ""
            })

        # 2. Prepare Errors (only incorrect original steps — limit to 150 for token budget)
        bad_steps = [s for s in steps if not s.is_correct and s.error_classification in ('original', 'critical', 'none')]
        error_context = []
        for s in bad_steps[:150]:
            error_context.append({
                "submission_id": s.grading_result.submission_id,
                "question_id": s.grading_result.question_id,
                "step": s.description,
                "feedback": s.feedback
            })

        # 3. Prepare Groups
        group_context = {
            g: [st['name'] for st in data['students']] for g, data in student_groups.items()
        }

        prompt = f"""Exam: {exam.name} (Lớp {exam.grade_level})

Questions:
{json.dumps(q_context, ensure_ascii=False, indent=2)}

Errors Sample:
{json.dumps(error_context, ensure_ascii=False, indent=2)}

Groups:
{json.dumps(group_context, ensure_ascii=False, indent=2)}
"""
        try:
            # Configure API key — prefer explicitly passed key, then fall back to settings
            from django.conf import settings as dj_settings
            api_key = self.api_key or getattr(dj_settings, 'GEMINI_API_KEY', None)
            if not api_key:
                raise ValueError("No Gemini API key configured")

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=ANALYTICS_SYSTEM_PROMPT,
                generation_config=genai.types.GenerationConfig(
                    response_mime_type="application/json"
                )
            )
            response = model.generate_content(prompt)
            raw = response.text.strip()
            # Strip markdown code fences if model adds them
            if raw.startswith("```"):
                raw = raw.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
            return json.loads(raw)
        except Exception as e:
            logger.error(f"AI Analysis failed: {e}", exc_info=True)
            return {
                "question_topics": {},
                "error_taxonomy": [],
                "group_interventions": {}
            }

    def _assemble_final_output(self, class_metrics, students_with_risk, student_groups, group_weaknesses, ai_response, score_matrix, questions, steps):
        """Merge deterministic data with AI response into the final payload."""
        topics_ai = ai_response.get("question_topics", {})
        errors_ai = ai_response.get("error_taxonomy", [])
        interventions_ai = ai_response.get("group_interventions", {})

        # Pre-compute: which students had incorrect results per question label
        # q_label -> set of student names who scored <= 50% on that question
        label_to_struggling_students = {}
        for s_id, s_data in students_with_risk.items():
            s_name = s_data['submission'].student_name or f"HS{s_id}"
            for q_id, q_data in s_data['results'].items():
                label = q_data['label']
                if q_data['score'] <= (q_data['maxScore'] / 2.0):
                    label_to_struggling_students.setdefault(label, set()).add(s_name)

        # For each AI error, compute affected students from affected_questions
        for err in errors_ai:
            q_labels = err.get('affected_questions', []) or err.get('questionIds', [])
            affected = set()
            for label in q_labels:
                affected.update(label_to_struggling_students.get(label, set()))
            err['_resolved_affected_students'] = list(affected)

        # 1. Build Students List
        students_list = []
        for s_id, data in students_with_risk.items():
            q_results = []
            for q_id, q_data in data['results'].items():
                q_results.append({
                    "question": q_data['label'],
                    "score": q_data['score'],
                    "maxScore": q_data['maxScore'],
                    "status": q_data['status'],
                    "topic": topics_ai.get(q_data['label'], "Ch\u01b0a ph\u00e2n lo\u1ea1i")
                })

            student_name = data['submission'].student_name or f"HS{s_id}"
            # Tag which AI error patterns this student is affected by (deterministic)
            student_error_tags = []
            for err in errors_ai:
                if student_name in err.get('_resolved_affected_students', []):
                    student_error_tags.append(err.get('tag', ''))

            students_list.append({
                "id": str(s_id),
                "name": student_name,
                "score": data['total_score'],
                "riskScore": data['riskScore'],
                "progress": 0,
                "group": data['group'],
                "studentId": f"HS{s_id}",
                "averageScore": data['total_score'],
                "scoreHistory": [{"test": "Current", "score": data['total_score']}],
                "riskBreakdown": data['riskBreakdown'],
                "questionResults": q_results,
                "progressSteps": [],
                "errors": student_error_tags
            })

        # 2. Build commonErrors (count is now deterministic)
        common_errors = []
        for err in errors_ai:
            affected_list = err.get('_resolved_affected_students', [])
            count = len(affected_list)
            perc = round((count / max(1, class_metrics['totalStudents'])) * 100)
            common_errors.append({
                "id": err.get('id', 'ERR_UNKNOWN'),
                "tag": err.get('tag', 'L\u1ed7i kh\u00f4ng x\u00e1c \u0111\u1ecbnh'),
                "count": count,
                "percentage": perc,
                "severity": err.get('severity', 'medium'),
                "rootCause": err.get('rootCause', ''),
                "example": err.get('example', ''),
                "affectedStudents": affected_list,
                "questionIds": err.get('affected_questions', []),
                "recommendation": "\n".join([a.get('description', '') for a in err.get('suggestedActions', [])])
            })
            
        # 3. Build topics
        topics_map = {}
        for q_label, topic_name in topics_ai.items():
            if topic_name not in topics_map:
                topics_map[topic_name] = {"id": f"topic_{len(topics_map)+1}", "name": topic_name, "questions": []}
            topics_map[topic_name]["questions"].append(q_label)
            
        topics_list = []
        for t_name, t_data in topics_map.items():
            # Calculate mastery
            q_labels = t_data['questions']
            correct_count = 0
            total_attempts = 0
            students_with_gaps = []
            
            for s_data in students_list:
                s_correct = []
                s_incorrect = []
                for q_res in s_data['questionResults']:
                    if q_res['question'] in q_labels:
                        total_attempts += 1
                        if q_res['status'] == 'correct':
                            correct_count += 1
                            s_correct.append(q_res['question'])
                        else:
                            s_incorrect.append(q_res['question'])
                
                if s_incorrect:
                    def_perc = round((len(s_incorrect) / max(1, len(q_labels))) * 100)
                    students_with_gaps.append({
                        "id": s_data['id'],
                        "name": s_data['name'],
                        "deficitPercentage": def_perc,
                        "questionsCorrect": s_correct,
                        "questionsIncorrect": s_incorrect,
                        "examples": [f"Sai ở: {', '.join(s_incorrect)}"],
                        "group": s_data['group']
                    })
                    
            t_data["masteryRate"] = round((correct_count / max(1, total_attempts)) * 100)
            t_data["studentsWithGaps"] = students_with_gaps
            topics_list.append(t_data)
            
        # 4. Build errorDetailMap
        error_detail_map = {}
        for err in errors_ai:
            err_id = err.get('id', '')
            if err_id:
                # Build affected students detailed list
                aff_students_detailed = []
                for s_name in err.get('affected_students', []):
                    # Find student in students_list
                    s_match = next((s for s in students_list if s['name'] == s_name), None)
                    if s_match:
                        aff_students_detailed.append({
                            "id": s_match['id'],
                            "name": s_match['name'],
                            "group": s_match['group'],
                            "score": s_match['score'],
                            "errors": err.get('affected_questions', [])
                        })
                        
                error_detail_map[err_id] = {
                    "fullDescription": err.get('rootCause', ''),
                    "commonMistakes": err.get('commonMistakes', []),
                    "affectedStudents": aff_students_detailed,
                    "relatedTopics": err.get('relatedTopics', []),
                    "suggestedActions": err.get('suggestedActions', [])
                }
                
        # 5. Build groupDetailMap
        group_detail_map = {}
        for g_name, g_data in student_groups.items():
            # Get AI interventions
            g_interventions = interventions_ai.get(g_name, {"immediate": [], "longTerm": []})
            
            # Map weaknesses to the exact string required by dashboard
            g_weaknesses = []
            for w in group_weaknesses.get(g_name, []):
                 g_weaknesses.append({
                     "topic": w['question_label'] + " - " + topics_ai.get(w['question_label'], ""),
                     "percentage": w['percentage'],
                     "description": w['description']
                 })
                 
            # Find common errors for this group
            g_errors = []
            for err in common_errors:
                # Count how many students in this group have this error
                g_err_count = sum(1 for s_name in err['affectedStudents'] if any(s['name'] == s_name for s in g_data['students']))
                if g_err_count > 0:
                    g_errors.append({
                        "error": f"{err['id']} - {err['tag']}",
                        "count": g_err_count,
                        "severity": err['severity']
                    })

            group_detail_map[g_name] = {
                "name": g_data['name'],
                "count": g_data['count'],
                "averageScore": g_data['averageScore'],
                "riskLevel": g_data['riskLevel'],
                "students": [{"id": s['id'], "name": s['name'], "score": s['score'], "riskScore": s['riskScore'], "group": s['group']} for s in g_data['students']],
                "commonWeaknesses": g_weaknesses,
                "commonErrors": g_errors,
                "interventionPlan": g_interventions
            }
            
        # 6. Format studentGroups array for dashboard
        student_groups_list = []
        for g_name, g_data in student_groups.items():
             student_groups_list.append({
                 "id": g_data['id'],
                 "name": g_data['name'],
                 "level": g_data['level'],
                 "count": g_data['count'],
                 "percentage": g_data.get('percentage', 0),
                 "averageScore": g_data.get('averageScore', 0),
                 "commonErrors": [], # Dashboard expects empty array here usually
                 "knowledgeGaps": [],
                 "riskLevel": "low" if g_name in ["Giỏi", "Khá"] else ("medium" if g_name == "TB" else "high")
             })

        return {
            "classMetrics": class_metrics,
            "students": students_list,
            "commonErrors": common_errors,
            "studentGroups": student_groups_list,
            "topics": topics_list,
            "errorDetailMap": error_detail_map,
            "groupDetailMap": group_detail_map
        }
