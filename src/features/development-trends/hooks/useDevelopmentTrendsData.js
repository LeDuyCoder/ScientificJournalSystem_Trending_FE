import { useState, useEffect, useCallback } from 'react';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { fetchDevelopmentTrendsData } from '../services/developmentTrends.service';

export function useDevelopmentTrendsData() {
  const { projectId, filters, refreshTrigger, setLoading: setDashboardLoading } = useDashboardContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setDashboardLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await fetchDevelopmentTrendsData(projectId, filters);
      setData(result);
    } catch (err) {
      setError(err?.message || 'Failed to load development trends data');
    } finally {
      setLoading(false);
      setDashboardLoading(false);
    }
  }, [projectId, filters, setDashboardLoading]);

  useEffect(() => {
    loadData();
  }, [refreshTrigger, loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData
  };
}
