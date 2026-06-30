import {
  publicationTrend,
  citationMirroring,
  topicEvolution,
  frontierDetection,
  futureInsights
} from '../constants/developmentTrends.mock';

export const fetchDevelopmentTrendsData = (filters) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filters?.timeframe === 'error') {
        reject(new Error('Failed to fetch development trends data'));
        return;
      }
      resolve({
        publicationTrend,
        citationMirroring,
        topicEvolution,
        frontierDetection,
        futureInsights
      });
    }, 1000);
  });
};
