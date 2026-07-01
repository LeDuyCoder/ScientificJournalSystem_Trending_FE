import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJournalsData, getTopJournalRanking, getQuartileDistribution, getImpactMatrix, getMigrationAnalysis } from '../services/journals.service';

export function useJournalsData() {
  const { id } = useParams();
  // Fallback 'default-id' to '1' to prevent 404/500 errors if user doesn't pass a valid ID
  const projectId = id === 'default-id' ? '1' : id;
  
  // Create local states if filters/refresh are needed later, 
  // for now we just use an empty object to satisfy the API
  const filters = {};
  const refreshTrigger = 0;

  // Global data for the mocked parts (for now)
  const [data, setData] = useState(null);
  
  // Specific states
  const [topRanking, setTopRanking] = useState({ data: null, loading: true, error: null });
  const [quartile, setQuartile] = useState({ data: null, loading: true, error: null });
  const [impactMatrix, setImpactMatrix] = useState({ data: null, loading: true, error: null });
  const [migration, setMigration] = useState({ data: null, loading: true, error: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTopRanking = useCallback(async (currentFilters, currentProjectId) => {
    setTopRanking(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getTopJournalRanking({ ...currentFilters, project_id: currentProjectId });
      const items = result.items || result.data || result;
      setTopRanking({ data: items, loading: false, error: null });
    } catch (err) {
      setTopRanking({ data: null, loading: false, error: err?.message || 'Failed to load top journal ranking' });
    }
  }, []);

  const loadQuartile = useCallback(async (currentFilters, currentProjectId) => {
    setQuartile(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getQuartileDistribution({ ...currentFilters, project_id: currentProjectId });
      setQuartile({ data: result.data || result, loading: false, error: null });
    } catch (err) {
      setQuartile({ data: null, loading: false, error: err?.message || 'Failed to load quartile distribution' });
    }
  }, []);

  const loadImpactMatrix = useCallback(async (currentFilters, currentProjectId) => {
    setImpactMatrix(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getImpactMatrix({ ...currentFilters, project_id: currentProjectId });
      const items = result.items || result.data || result;
      setImpactMatrix({ data: items, loading: false, error: null });
    } catch (err) {
      setImpactMatrix({ data: null, loading: false, error: err?.message || 'Failed to load impact matrix' });
    }
  }, []);

  const loadMigration = useCallback(async (currentFilters, currentProjectId) => {
    setMigration(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getMigrationAnalysis({ ...currentFilters, project_id: currentProjectId });
      setMigration({ data: result.data || result, loading: false, error: null });
    } catch (err) {
      setMigration({ data: null, loading: false, error: err?.message || 'Failed to load migration analysis' });
    }
  }, []);

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
    if (!projectId) return;
    loadTopRanking(filters, projectId);
    loadQuartile(filters, projectId);
    loadImpactMatrix(filters, projectId);
    loadMigration(filters, projectId);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), projectId, refreshTrigger, loadTopRanking, loadQuartile, loadImpactMatrix, loadMigration, loadData]);

  return {
    data, 
    loading, 
    error,
    topRanking,
    quartile,
    impactMatrix,
    migration,
    refetch: () => {
      loadTopRanking(filters, projectId);
      loadQuartile(filters, projectId);
      loadImpactMatrix(filters, projectId);
      loadMigration(filters, projectId);
      loadData();
    }
  };
}
