import { useQuery } from '@tanstack/react-query';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { getTopJournalRanking, getQuartileDistribution, getImpactMatrix, getMigrationAnalysis } from '../services/journals.service';

/**
 * Helper to map frontend filters to API query params
 */
const mapFiltersToParams = (filters) => {
  if (!filters) return {};
  const queryParams = {};
  
  if (filters.subject_category && filters.subject_category !== 'All Categories') {
    queryParams.subject_area = filters.subject_category;
  } else if (filters.domain && filters.domain !== 'All Domains') {
    queryParams.subject_area = filters.domain;
  }
  
  const currentYear = new Date().getFullYear() - 1;
  if (filters.timeframe) {
    switch (filters.timeframe) {
      case 'Last Year':
        queryParams.from_year = currentYear - 1;
        queryParams.to_year = currentYear;
        break;
      case 'Last 3 Years':
        queryParams.from_year = currentYear - 3;
        queryParams.to_year = currentYear;
        break;
      case 'Last 5 Years':
        queryParams.from_year = currentYear - 5;
        queryParams.to_year = currentYear;
        break;
      case 'Last 10 Years':
        queryParams.from_year = currentYear - 10;
        queryParams.to_year = currentYear;
        break;
      default:
        break;
    }
  }
  return queryParams;
};

export function useJournalsData() {
  const { projectId, filters, refreshTrigger } = useDashboardContext();
  const queryParams = mapFiltersToParams(filters);

  // 1. Top Journal Ranking Query
  const topRankingQuery = useQuery({
    queryKey: ['journals', 'ranking', projectId, queryParams, refreshTrigger],
    queryFn: () => getTopJournalRanking({ ...queryParams, project_id: projectId }),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (result) => {
      return Array.isArray(result) 
        ? result 
        : (Array.isArray(result?.data) 
            ? result.data 
            : (result?.journals || result?.data?.journals || []));
    }
  });

  // 2. Quartile Distribution Query
  const quartileQuery = useQuery({
    queryKey: ['journals', 'quartiles', projectId, queryParams, refreshTrigger],
    queryFn: () => getQuartileDistribution({ ...queryParams, project_id: projectId }),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (result) => result?.data || result
  });

  // 3. Impact Matrix Query
  const impactMatrixQuery = useQuery({
    queryKey: ['journals', 'impact-matrix', projectId, queryParams, refreshTrigger],
    queryFn: () => getImpactMatrix({ ...queryParams, project_id: projectId }),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (result) => result?.items || result?.data || result
  });

  // 4. Migration Analysis Query
  const migrationQuery = useQuery({
    queryKey: ['journals', 'migration', projectId, queryParams, refreshTrigger],
    queryFn: () => getMigrationAnalysis({ ...queryParams, project_id: projectId }),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (result) => result?.data || result
  });

  const refetch = () => {
    topRankingQuery.refetch();
    quartileQuery.refetch();
    impactMatrixQuery.refetch();
    migrationQuery.refetch();
  };

  return {
    data: true, // dummy truthy value to bypass full page loader in JournalsPage
    loading: false,
    error: null,
    topRanking: {
      data: topRankingQuery.data || null,
      loading: topRankingQuery.isLoading,
      error: topRankingQuery.error
    },
    quartile: {
      data: quartileQuery.data || null,
      loading: quartileQuery.isLoading,
      error: quartileQuery.error
    },
    impactMatrix: {
      data: impactMatrixQuery.data || null,
      loading: impactMatrixQuery.isLoading,
      error: impactMatrixQuery.error
    },
    migration: {
      data: migrationQuery.data || null,
      loading: migrationQuery.isLoading,
      error: migrationQuery.error
    },
    refetch
  };
}
