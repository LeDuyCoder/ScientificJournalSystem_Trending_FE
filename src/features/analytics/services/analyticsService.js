import { analyticsApi } from '../api/analyticsApi';

/**
 * Service layer for Analytics feature
 */
export const analyticsService = {
  /**
   * Get curated articles
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  fetchCuratedArticles: async (params) => {
    try {
      const data = await analyticsApi.getCuratedArticles(params);
      return data;
    } catch (error) {
      console.error('Error fetching curated articles:', error);
      throw error;
    }
  },

  /**
   * Get project keywords
   * @param {Object} params
   * @returns {Promise<Array>}
   */
  fetchKeywords: async (params) => {
    try {
      const data = await analyticsApi.getKeywords(params);
      return data;
    } catch (error) {
      console.error('Error fetching keywords:', error);
      throw error;
    }
  },

  /**
   * Add a keyword to a project
   */
  addProjectKeyword: async (projectId, keyword) => {
    try {
      const data = await analyticsApi.addKeyword(projectId, keyword);
      return data;
    } catch (error) {
      console.error('Error adding project keyword:', error);
      throw error;
    }
  },

  /**
   * Remove a keyword from a project
   */
  removeProjectKeyword: async (projectId, keywordId) => {
    try {
      const data = await analyticsApi.removeKeyword(projectId, keywordId);
      return data;
    } catch (error) {
      console.error('Error removing project keyword:', error);
      throw error;
    }
  },

  /**
   * Search keywords
   */
  searchKeywords: async (query) => {
    try {
      const data = await analyticsApi.searchKeywords(query);
      return data;
    } catch (error) {
      console.error('Error searching keywords:', error);
      throw error;
    }
  },

  /**
   * Get tracked journals
   * @param {Object} params
   * @returns {Promise<Array>}
   */
  fetchTrackedJournals: async (params) => {
    try {
      const data = await analyticsApi.getTrackedJournals(params);
      return data;
    } catch (error) {
      console.error('Error fetching tracked journals:', error);
      throw error;
    }
  }
};
