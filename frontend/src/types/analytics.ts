// src/types/analytics.ts

export interface ExamMeta {
  id: number;
  name: string;
  grade_level: number;
  topic?: string;
  computed_at: string;
  model_used: string;
}

export interface ExamSummary {
  id: number;
  name: string;
  topic?: string;
  grade_level: number;
  exam_type: string;
  created_at: string;
  submission_count: number;
  graded_count: number;
  analytics_cached: boolean;
  analytics_computed_at?: string;
}

// ... the rest of the existing types from insight-spark-73-ref can be imported or merged, 
// I will just define what's needed for the top level.

export interface AnalyticsData {
  examMeta: ExamMeta;
  classMetrics: any;
  students: any[];
  commonErrors: any[];
  studentGroups: any[];
  topics: any[];
  errorDetailMap: Record<string, any>;
  groupDetailMap: Record<string, any>;
}
