import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../api/analyticsApi';
import { AnalyticsData } from '../types/analytics';

export const useExamAnalytics = (examId: number) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (force = false) => {
    try {
      setLoading(true);
      const result = await fetchAnalytics(examId, force);
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [examId]);

  return { data, loading, error, refresh: () => loadData(true) };
};
