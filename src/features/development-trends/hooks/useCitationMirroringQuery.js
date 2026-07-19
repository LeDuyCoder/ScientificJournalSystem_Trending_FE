import { useQuery } from '@tanstack/react-query';
import { fetchDevelopmentTrendsData } from '../services/developmentTrends.service';

/**
 * Hook to fetch citation mirroring data with TanStack Query caching.
 * @param {string|number} projectId - The project ID
 * @param {object} filters - Active dashboard filters
 * @param {number} refreshTrigger - Dashboard manual refresh trigger
 */
export const useCitationMirroringQuery = (projectId, filters = {}, refreshTrigger) => {
  return useQuery({
    queryKey: ['developmentTrends', projectId, filters, refreshTrigger],
    queryFn: () => fetchDevelopmentTrendsData(projectId, filters),
    enabled: !!projectId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000,   // 60 minutes
    refetchOnWindowFocus: false,
    select: (response) => response?.data?.citationMirroring,
  });
};
