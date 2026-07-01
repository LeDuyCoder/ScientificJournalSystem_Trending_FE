import apiClient from '../../../shared/api/axios';

export const fetchDevelopmentTrendsData = async (filters) => {
  const searchParams = new URLSearchParams(window.location.search);
  const projectId = searchParams.get('project_id') || searchParams.get('projectId');
  
  const response = await apiClient.get('/analytics/development-trends', {
    params: {
      project_id: projectId || undefined,
      timeframe: filters?.timeframe,
      domain: filters?.domain,
      region: filters?.region
    }
  });
  return response.data;
};
