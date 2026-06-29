import { useState, useEffect, useCallback } from 'react';
import { fetchCollaborationAnalytics } from '../api/collaborationAnalyticsApi';

export const useCollaborationAnalytics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchCollaborationAnalytics();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch collaboration analytics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const result = await fetchCollaborationAnalytics();
        if (mounted) setData(result);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to fetch collaboration analytics');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  return { data, isLoading, error, refetch: fetchData };
};
