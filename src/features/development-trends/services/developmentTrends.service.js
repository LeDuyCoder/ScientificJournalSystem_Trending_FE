import apiClient from '../../../shared/api/axios';

export const fetchDevelopmentTrendsData = async (filters) => {
  const response = await apiClient.get('/analytics/development-trends', {
    params: {
      timeframe: filters?.timeframe,
      domain: filters?.domain,
      region: filters?.region
    }
  });
  return response.data;
};
