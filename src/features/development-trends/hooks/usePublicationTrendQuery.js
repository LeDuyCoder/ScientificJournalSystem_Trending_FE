import { useQuery } from '@tanstack/react-query';
import { fetchDevelopmentTrendsData } from '../services/developmentTrends.service';

/**
 * Hook to fetch publication trend data with TanStack Query caching.
 * @param {string|number} projectId - The project ID
 * @param {object} filters - Active dashboard filters
 * @param {number} refreshTrigger - Dashboard manual refresh trigger
 */
export const usePublicationTrendQuery = (projectId, filters = {}, refreshTrigger) => {
  return useQuery({
    queryKey: ['developmentTrends', projectId, filters, refreshTrigger],
    queryFn: () => fetchDevelopmentTrendsData(projectId, filters),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    refetchOnWindowFocus: false,
    select: (response) => response?.data?.publicationTrend,
  });
};
