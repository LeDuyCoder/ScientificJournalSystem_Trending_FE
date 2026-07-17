import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJournalsData, getTopJournalRanking, getQuartileDistribution, getImpactMatrix, getMigrationAnalysis } from '../services/journals.service';

export function useJournalsData() {
  const { id } = useParams();
  const projectId = id === 'default-id' ? '1' : id;
  const filters = {};
  const refreshTrigger = 0;

  const dataQuery = useQuery({
    queryKey: ['journals', 'overview', projectId],
    queryFn: () => fetchJournalsData(),
    staleTime: 60000,
  });

  const topRankingQuery = useQuery({
    queryKey: ['journals', 'topRanking', projectId, filters],
    queryFn: async () => {
      const result = await getTopJournalRanking({ ...filters, project_id: projectId });
      return Array.isArray(result) ? result : (Array.isArray(result.data) ? result.data : (result.journals || result.data?.journals || []));
    },
    staleTime: 60000,
  });

  const quartileQuery = useQuery({
    queryKey: ['journals', 'quartile', projectId, filters],
    queryFn: async () => {
      const result = await getQuartileDistribution({ ...filters, project_id: projectId });
      return result.data || result;
    },
    staleTime: 60000,
  });

  const impactMatrixQuery = useQuery({
    queryKey: ['journals', 'impactMatrix', projectId, filters],
    queryFn: async () => {
      const result = await getImpactMatrix({ ...filters, project_id: projectId });
      return result.items || result.data || result;
    },
    staleTime: 60000,
  });

  const migrationQuery = useQuery({
    queryKey: ['journals', 'migration', projectId, filters],
    queryFn: async () => {
      const result = await getMigrationAnalysis({ ...filters, project_id: projectId });
      return result.data || result;
    },
    staleTime: 60000,
  });

  const refetchAll = () => {
    dataQuery.refetch();
    topRankingQuery.refetch();
    quartileQuery.refetch();
    impactMatrixQuery.refetch();
    migrationQuery.refetch();
  };

  return {
    data: dataQuery.data,
    loading: dataQuery.isLoading,
    error: dataQuery.error,
    topRanking: { data: topRankingQuery.data, loading: topRankingQuery.isLoading, error: topRankingQuery.error },
    quartile: { data: quartileQuery.data, loading: quartileQuery.isLoading, error: quartileQuery.error },
    impactMatrix: { data: impactMatrixQuery.data, loading: impactMatrixQuery.isLoading, error: impactMatrixQuery.error },
    migration: { data: migrationQuery.data, loading: migrationQuery.isLoading, error: migrationQuery.error },
    refetch: refetchAll
  };
}
