import { analyticsApi } from '../api/analyticsApi';

/**
 * Service layer for Analytics feature
 */
export const analyticsService = {
  /**
   * Get curated articles
   * @returns {Promise<Array>}
   */
  fetchCuratedArticles: async () => {
    try {
      const data = await analyticsApi.getCuratedArticles();
      return data;
    } catch (error) {
      console.error('Error fetching curated articles:', error);
      throw error;
    }
  },

  /**
   * Get keywords
   * @returns {Promise<Array>}
   */
  fetchKeywords: async () => {
    try {
      const data = await analyticsApi.getKeywords();
      return data;
    } catch (error) {
      console.error('Error fetching keywords:', error);
      throw error;
    }
  }
};
