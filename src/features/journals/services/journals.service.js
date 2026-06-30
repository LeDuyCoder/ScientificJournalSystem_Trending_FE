import {
  quartileDistribution,
  topJournals,
  impactMatrixData,
  migrationAnalysis
} from '../constants/journals.mock';

export const fetchJournalsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        quartileDistribution,
        topJournals,
        impactMatrixData,
        migrationAnalysis
      });
    }, 1000);
  });
};
