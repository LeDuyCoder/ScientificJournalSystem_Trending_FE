import apiClient from '../../../shared/api/axios';
import {
  quartileDistribution,
  impactMatrixData,
  migrationAnalysis
} from '../constants/journals.mock';

export const getTopJournalRanking = async (params) => {
  try {
    const response = await apiClient.get('/analytics/journals/ranking', { params });
    // Handle format: { data: { items: [...] } } or { items: [...] }
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getQuartileDistribution = async (params) => {
  try {
    const response = await apiClient.get('/analytics/journals/quartiles', { params });
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getImpactMatrix = async (params) => {
  try {
    const response = await apiClient.get('/analytics/journals/impact-matrix', { params });
    // Dữ liệu API trả về đã có sẵn: journalName, sjrCitationScore, hIndex, quartile, size
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getMigrationAnalysis = async (params) => {
  try {
    const response = await apiClient.get('/analytics/journals/migration', { params });
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const fetchJournalsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        quartileDistribution,
        topJournals: [], // We won't use this anymore
        impactMatrixData,
        migrationAnalysis
      });
    }, 1000);
  });
};
