import apiClient from '../../../shared/api/axios';

/**
 * Fetch dashboard statistics from the real API.
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @returns {Promise<object>}
 */
export const fetchDashboardStats = (projectId) => {
  return apiClient.get('/dashboard/stats', {
    params: { project_id: projectId },
  });
};

/**
 * Fetch geographical distribution data from the real API.
 *
 * API: GET /analytics/geo-distribution?project_id=<id>
 *
 * Response shape:
 *   { code: 200, data: [{ countryCode, intensity, count }] }
 *
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @returns {Promise<object>}
 */
export const fetchGeoDistribution = (projectId) => {
  return apiClient.get('/analytics/geo-distribution', {
    params: { project_id: projectId },
  });
};

/**
 * Fetch research landscape distribution data from the real API.
 *
 * API: GET /analytics/distribution?project_id=<id>
 *
 * Response shape:
 *   { code: 200, data: [{ name: string, percentage: number }] }
 *
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @returns {Promise<object>}
 */
export const fetchDistribution = (projectId) => {
  return apiClient.get('/analytics/distribution', {
    params: { project_id: projectId },
  });
};

/**
 * Fetch top entities ranking data from the real API.
 *
 * API: GET /analytics/top-entities?project_id=<id>
 *
 * Response shape:
 *   { code: 200, data: [{ name: string, score: number }] }
 *
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @param {object} options - Optional parameters
 * @param {number} options.limit - Maximum number of entities to fetch
 * @returns {Promise<object>}
 */
export const fetchTopEntities = (projectId, options = {}) => {
  const { limit = 4 } = options;
  return apiClient.get('/analytics/top-entities', {
    params: { project_id: projectId, limit },
  });
};

/**
 * Fetch journal quartile distribution data from the real API.
 *
 * API: GET /analytics/journals/quartiles?project_id=<id>
 *
 * Data structures:
 * @typedef {object} QuartileDistributionItem
 * @property {string} group - Name of the quartile group (e.g. "Q1 (High Impact)")
 * @property {number} percentage - Percentage of journals in this quartile (0-100)
 *
 * @typedef {object} QuartileDistributionResponse
 * @property {number} code - Status code (e.g. 200)
 * @property {string} message - Response message
 * @property {object} data
 * @property {number} data.totalJournals - Total number of journals matching the project
 * @property {QuartileDistributionItem[]} data.distribution - Array of quartile distributions
 *
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @returns {Promise<QuartileDistributionResponse>}
 */
export const fetchQuartiles = (projectId) => {
  return apiClient.get('/analytics/journals/quartiles', {
    params: { project_id: projectId },
  });
};

