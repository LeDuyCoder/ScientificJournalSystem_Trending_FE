import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

/**
 * Hook to manage curated articles state
 */
export const useCuratedArticles = (projectId, page = 1, filters = {}) => {
  const [articles, setArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    total: 0,
    currentPage: 1
  });

  const [trigger, setTrigger] = useState(0);

  const refetch = () => setTrigger(t => t + 1);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        const [articlesRes, keywordsRes, journalsRes] = await Promise.all([
          analyticsService.fetchCuratedArticles({ project_id: projectId, page, limit: 10, ...filters }),
          analyticsService.fetchKeywords({ project_id: projectId }),
          analyticsService.fetchTrackedJournals({ project_id: projectId })
        ]);
        
        const articlesData = articlesRes?.data || { items: [], totalPages: 1, total: 0, currentPage: 1 };
        
        setArticles(articlesData.items || []);
        setPagination({
          totalPages: articlesData.totalPages || 1,
          total: articlesData.total || 0,
          currentPage: articlesData.currentPage || 1
        });
        
        setKeywords(keywordsRes?.data || []);
        setJournals(journalsRes?.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchArticles();
    }
  }, [projectId, page, JSON.stringify(filters), trigger]);

  return { articles, pagination, keywords, setKeywords, journals, loading, error, refetch };
};
