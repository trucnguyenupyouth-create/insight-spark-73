import { useState, useCallback } from 'react';
import { fetchAnalytics } from '../api/analyticsApi';
import { AnalyticsData } from '../types/analytics';

export const useExamAnalytics = (examId: number) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from cache only — does NOT trigger AI computation
  const loadCached = useCallback(async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const result = await fetchAnalytics(examId, false);
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [examId]);

  // Force re-run AI analysis — only called explicitly by user
  const refresh = useCallback(async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const result = await fetchAnalytics(examId, true);
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [examId]);

  return { data, loading, error, loadCached, refresh };
};
