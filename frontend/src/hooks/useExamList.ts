import { useState, useEffect } from 'react';
import { fetchExams } from '../api/analyticsApi';
import { ExamSummary } from '../types/analytics';

export const useExamList = () => {
  const [exams, setExams] = useState<ExamSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExams()
      .then((data) => {
        setExams(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { exams, loading, error };
};
