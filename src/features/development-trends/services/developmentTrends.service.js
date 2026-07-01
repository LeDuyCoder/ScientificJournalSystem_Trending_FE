import apiClient from '../../../shared/api/axios';

export const fetchDevelopmentTrendsData = async (projectId, filters) => {
  const cleanProjectId = projectId && projectId !== 'default-id' ? projectId : undefined;
  
  const response = await apiClient.get('/analytics/development-trends', {
    params: {
      project_id: cleanProjectId,
      timeframe: filters?.timeframe,
      domain: filters?.domain,
      subject_category: filters?.subject_category,
      region: filters?.region
    }
  });
  return response.data;
};
