import { useCallback, useEffect, useState } from 'react';
import { searchArticlesGraph } from '../services/articleGraph.service';

export function useArticleGraph({ keyword = 'graph', limit = 50 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGraph = useCallback(
    async (nextParams = {}) => {
      const nextKeyword = nextParams.keyword ?? keyword;
      const nextLimit = nextParams.limit ?? limit;

      setLoading(true);
      setError('');

      try {
        const result = await searchArticlesGraph({
          keyword: nextKeyword,
          limit: nextLimit,
        });

        setData(result);
      } catch (err) {
        setData(null);
        setError(err?.message || 'Failed to load article graph');
      } finally {
        setLoading(false);
      }
    },
    [keyword, limit]
  );

  useEffect(() => {
    loadGraph();
  }, [loadGraph]);

  return {
    data,
    loading,
    error,
    loadGraph,
  };
}