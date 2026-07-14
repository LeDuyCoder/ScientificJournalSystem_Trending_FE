import { useState, useEffect, useCallback } from 'react';
import { favoriteArticlesApi } from '../api/favoriteArticlesApi';
import { analyticsService } from '../../analytics/services/analyticsService';

export const useFavoriteArticles = (projectId, queryParams = {}) => {
  const [articles, setArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const [articlesRes, keywordsRes] = await Promise.all([
        favoriteArticlesApi.getFavoriteArticles(projectId, queryParams),
        analyticsService.fetchKeywords({ project_id: projectId })
      ]);
      
      const articlesData = articlesRes?.data || articlesRes;
      if (Array.isArray(articlesData)) {
        setArticles(articlesData);
      } else {
        setArticles([]);
      }
      
      setKeywords(keywordsRes?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to fetch favorite articles');
    } finally {
      setLoading(false);
    }
  }, [projectId, JSON.stringify(queryParams)]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, keywords, loading, error, refetch: fetchArticles };
};
