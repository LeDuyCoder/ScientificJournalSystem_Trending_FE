import apiClient from '../../../shared/api/axios';

/**
 * API for Analytics feature
 */
export const analyticsApi = {
  /**
   * Fetch curated articles
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>}
   */
  getCuratedArticles: (params) => {
    return apiClient.get('/analytics/curated-articles', { params });
  },

  getKeywords: (params) => {
    return apiClient.get('/analytics/project-keywords', { params });
  },

  addKeyword: (projectId, keyword) => {
    return apiClient.post('/analytics/project-keywords', { keyword }, { params: { project_id: projectId } });
  },

  removeKeyword: (projectId, keywordId) => {
    return apiClient.delete(`/analytics/project-keywords/${keywordId}`, { params: { project_id: projectId } });
  },

  searchKeywords: (query) => {
    return apiClient.get('/dashboard/search', { params: { q: query, type: 'keyword' } });
  },

  getTrackedJournals: (params) => {
    return apiClient.get('/analytics/tracked-journals', { params });
  }
};
