import { useState, useEffect, useCallback } from 'react';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { fetchDevelopmentTrendsData } from '../services/developmentTrends.service';

export function useDevelopmentTrendsData() {
  const { filters, refreshTrigger, setLoading: setDashboardLoading } = useDashboardContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setDashboardLoading(true);
    setError(null);
    try {
      const result = await fetchDevelopmentTrendsData(filters);
      setData(result);
    } catch (err) {
      setError(err?.message || 'Failed to load development trends data');
    } finally {
      setLoading(false);
      setDashboardLoading(false);
    }
  }, [filters, setDashboardLoading]);

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
