import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDevelopmentTrendsData } from '../services/developmentTrends.service';
import { getPreloadedDevTrends } from './devTrendsCache';

/**
 * Hook to fetch publication trend data with TanStack Query caching.
 * Uses preloader cache as placeholderData to avoid skeleton flash.
 */
export const usePublicationTrendQuery = (projectId, filters = {}, refreshTrigger) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['developmentTrends', projectId, filters, refreshTrigger],
    queryFn: () => fetchDevelopmentTrendsData(projectId, filters),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: () => getPreloadedDevTrends(queryClient, projectId),
    select: (response) => response?.data?.publicationTrend,
  });
};
