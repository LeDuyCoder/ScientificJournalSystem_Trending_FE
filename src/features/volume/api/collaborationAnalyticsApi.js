import { collaborationAnalyticsMock } from '../constants/collaborationAnalyticsMock';

export const fetchCollaborationAnalytics = async () => {
  // TODO: Replace with actual backend integration
  // return axios.get('/api/v1/analytics/collaboration');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(collaborationAnalyticsMock);
    }, 800);
  });
};
