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

// --- AI Insights types ---

export interface UrgentAction {
  studentName: string;
  studentScore: number;
  title: string;
  description: string;
  triggerRule: string;
}

export interface SuggestedAction {
  id: string;
  type: "class" | "group" | "individual" | "parent";
  subject: string;
  content: string;
  recipients: string[];
  recipientNames: string[];
  sentAt: string;
  status: "suggested" | "sent" | "delivered" | "read" | "responded";
  canRevoke: boolean;
}

export interface AiInsights {
  overviewInsight: string;
  urgentAction: UrgentAction | null;
  suggestedActions: SuggestedAction[];
}

// --- Main AnalyticsData ---

export interface AnalyticsData {
  examMeta: ExamMeta;
  classMetrics: any;
  students: any[];
  commonErrors: any[];
  studentGroups: any[];
  topics: any[];
  errorDetailMap: Record<string, any>;
  groupDetailMap: Record<string, any>;
  aiInsights?: AiInsights;
}
