import { useState, useEffect, useCallback } from 'react';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { fetchGlobalEcosystemData } from '../services/globalEcosystem.service';

export function useGlobalEcosystemData() {
  const { filters, refreshTrigger, setLoading: setDashboardLoading, projectId } = useDashboardContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setDashboardLoading(true);
    setError(null);
    try {
      const result = await fetchGlobalEcosystemData(filters, projectId);
      setData(result);
    } catch (err) {
      setError(err?.message || 'Failed to load global ecosystem data');
    } finally {
      setLoading(false);
      setDashboardLoading(false);
    }
  }, [filters, projectId, setDashboardLoading]);


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
