import { createClient } from '@supabase/supabase-js';
import { AnalyticsData, ExamSummary } from '../types/analytics';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'http://placeholder',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'
);

const API_URL = import.meta.env.VITE_API_URL === 'RELATIVE' ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8001');
const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS === 'true';

const getHeaders = async (): Promise<Record<string, string>> => {
  // In dev bypass, skip auth header — backend has no auth enforced locally
  if (DEV_BYPASS) {
    return { 'Content-Type': 'application/json' };
  }
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Authorization': `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchExams = async (): Promise<ExamSummary[]> => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/api/exams/`, { headers });
  if (!res.ok) throw new Error('Failed to fetch exams');
  return res.json();
};

export const fetchAnalytics = async (examId: number, force = false): Promise<AnalyticsData> => {
  const headers = await getHeaders();
  const endpoint = force ? `${API_URL}/api/exams/${examId}/refresh/` : `${API_URL}/api/exams/${examId}/analytics/`;
  const method = force ? 'POST' : 'GET';
  
  const res = await fetch(endpoint, { method, headers });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
};
