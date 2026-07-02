import apiClient from '../../../shared/api/axios';

/**
 * Fetch development trends data from the API.
 * @param {string|number} projectId - The project ID
 * @param {object} filters - Frontend filters (timeframe, domain, subject_category, region)
 * @returns {Promise<object>} The server response containing development trends data
 */
export const fetchDevelopmentTrendsData = (projectId, filters = {}) => {
  const cleanProjectId = projectId && projectId !== 'default-id' ? projectId : undefined;
  
  return apiClient.get('/analytics/development-trends', {
    params: {
      project_id: cleanProjectId,
      timeframe: filters?.timeframe,
      domain: filters?.domain,
      subject_category: filters?.subject_category,
      region: filters?.region
    }
  });
};
