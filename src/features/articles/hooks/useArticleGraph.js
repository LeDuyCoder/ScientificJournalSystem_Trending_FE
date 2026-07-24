import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { searchArticlesGraph } from '../services/articleGraph.service';

/**
 * Hook to fetch article graph data with TanStack Query caching.
 * The response is cached by (keyword, limit) to eliminate redundant API calls.
 *
 * @param {{ keyword?: string, limit?: number }} params
 */
export function useArticleGraph({ keyword = 'graph', limit = 50 } = {}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['articleGraph', keyword, limit],
    queryFn: () => searchArticlesGraph({ keyword, limit }),
    enabled: !!keyword,
    staleTime: 30 * 60 * 1000,   // 30 minutes fresh -> no refetch
    gcTime: 60 * 60 * 1000,      // 1 hour in memory
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  // Manual reload (accepts new params via loadGraph({keyword, limit}))
  const loadGraph = useCallback(
    (nextParams = {}) => {
      const nextKeyword = nextParams.keyword ?? keyword;
      const nextLimit = nextParams.limit ?? limit;
      return queryClient.fetchQuery({
        queryKey: ['articleGraph', nextKeyword, nextLimit],
        queryFn: () => searchArticlesGraph({ keyword: nextKeyword, limit: nextLimit }),
        staleTime: 30 * 60 * 1000,
      });
    },
    [keyword, limit, queryClient]
  );

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message || '',
    loadGraph,
  };
}