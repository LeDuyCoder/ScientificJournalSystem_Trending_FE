import {
  MOCK_TOP_AUTHORS,
  MOCK_LEADING_INSTITUTIONS,
  MOCK_IMPACT_MATRIX,
  MOCK_KEY_INSIGHTS,
  MOCK_GLOBAL_NETWORK,
  MOCK_TOPIC_INTENSITY_AUTHORS,
  MOCK_TOPIC_INTENSITY_INSTITUTIONS
} from '../constants/collaborationAnalyticsMock';

export const fetchCollaborationAnalytics = () => {
  // TODO: Replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topAuthors: MOCK_TOP_AUTHORS,
        leadingInstitutions: MOCK_LEADING_INSTITUTIONS,
        impactMatrix: MOCK_IMPACT_MATRIX,
        keyInsights: MOCK_KEY_INSIGHTS,
        globalNetwork: MOCK_GLOBAL_NETWORK,
        topicIntensityAuthors: MOCK_TOPIC_INTENSITY_AUTHORS,
        topicIntensityInstitutions: MOCK_TOPIC_INTENSITY_INSTITUTIONS
      });
    }, 800);
  });
};
