import { useState, useEffect, useCallback } from 'react';
import { fetchJournalsData } from '../services/journals.service';

export function useJournalsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchJournalsData();
      setData(result);
    } catch (err) {
      setError(err?.message || 'Failed to load journals data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData
  };
}
