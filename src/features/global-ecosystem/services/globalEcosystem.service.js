import {
  topEntitiesData,
  heatMapData,
  landscapeData,
  kpiStats
} from '../constants/globalEcosystem.mock';

export const fetchGlobalEcosystemData = (filters) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filters?.timeframe === 'error') {
        reject(new Error('Failed to fetch global ecosystem data'));
        return;
      }
      resolve({
        topEntitiesData,
        heatMapData,
        landscapeData,
        kpiStats
      });
    }, 1000);
  });
};
