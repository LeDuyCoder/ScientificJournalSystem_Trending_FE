import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

/**
 * Hook to manage curated articles state
 */
export const useCuratedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesData, keywordsData] = await Promise.all([
          analyticsService.fetchCuratedArticles(),
          analyticsService.fetchKeywords()
        ]);
        setArticles(articlesData);
        setKeywords(keywordsData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, keywords, loading, error };
};
