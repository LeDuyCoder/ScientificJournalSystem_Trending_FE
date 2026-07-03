import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/axios';

/**
 * Hook to fetch dashboard search suggestions.
 * @param {string} query 
 * @param {string} type 
 */
export const useDashboardSearchQuery = (query, type = 'all') => {
  return useQuery({
    queryKey: ['dashboard', 'search', query, type],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      const response = await apiClient.get('/analytics/dashboard/search', {
        params: { q: query, type }
      });
      return response.data?.suggestions || [];
    },
    enabled: query.length >= 2,
    staleTime: 60 * 1000,
  });
};
