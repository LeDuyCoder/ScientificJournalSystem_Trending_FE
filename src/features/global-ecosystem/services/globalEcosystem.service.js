import apiClient from '../../../shared/api/axios';

const getTrend = (growthRate) => {
  if (growthRate > 0) return 'up';
  if (growthRate < 0) return 'down';
  return 'stable';
};

/**
 * Format growthRate as a display string.
 * @param {number} growthRate
 * @returns {string}
 */
const formatTrendValue = (growthRate) => {
  if (growthRate === 0) return 'stable';
  return `${Math.abs(growthRate)}%`;
};

/**
 * Transform API response data into kpiStats array
 * that GlobalStatsSection expects.
 *
 * API shape:
 *   { totalAuthors: { value, growthRate }, totalJournals: { value, growthRate },
 *     densityIndex: { value, status }, totalRelocated: { value, growthRate } }
 *
 * Component shape:
 *   [{ title, value, trend, trendValue }]
 */
export const transformToKpiStats = (data) => {
  if (!data) return [];

  const { totalAuthors, totalJournals, densityIndex, totalRelocated } = data;

  return [
    {
      title: 'TOP AUTHORS',
      value: totalAuthors?.value?.toLocaleString() ?? '0',
      trend: getTrend(totalAuthors?.growthRate ?? 0),
      trendValue: formatTrendValue(totalAuthors?.growthRate ?? 0),
    },
    {
      title: 'INSTITUTIONS',
      value: totalJournals?.value?.toLocaleString() ?? '0',
      trend: getTrend(totalJournals?.growthRate ?? 0),
      trendValue: formatTrendValue(totalJournals?.growthRate ?? 0),
    },
    {
      title: 'DENSITY INDEX',
      value: densityIndex?.value?.toString() ?? '0',
      trend: densityIndex?.status === 'stable' ? 'stable' : (densityIndex?.status === 'up' ? 'up' : 'down'),
      trendValue: densityIndex?.status ?? 'stable',
    },
    {
      title: 'RELOCATED',
      value: totalRelocated?.value?.toLocaleString() ?? '0',
      trend: getTrend(totalRelocated?.growthRate ?? 0),
      trendValue: formatTrendValue(totalRelocated?.growthRate ?? 0),
    },
  ];
};

/**
 * Map API intensity label → numeric value for the heatmap colour scale.
 * The component uses: >80 → PEAK colour, >60 → HIGH, >40 → MED, else LOW.
 *
 * @param {'PEAK'|'HIGH'|'MEDIUM'|'LOW'|string} label
 * @returns {number}
 */
const intensityLabelToNumber = (label) => {
  switch (label?.toUpperCase()) {
    case 'PEAK': return 90;
    case 'HIGH': return 70;
    case 'MEDIUM': return 50;
    case 'LOW': return 30;
    default: return 0;
  }
};

/**
 * Transform geo-distribution API array into the shape GlobalHeatMapSection expects:
 *   [{ country: string, intensity: number }]
 *
 * API item shape: { countryCode: 'US', intensity: 'PEAK', count: 102 }
 *
 * @param {Array} data - raw API array
 * @returns {Array<{country: string, intensity: number}>}
 */
export const transformGeoData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    country: item.countryCode,
    intensity: intensityLabelToNumber(item.intensity),
  }));
};

/**
 * Transform distribution API array into the shape ResearchLandscapeCard expects:
 *   [{ name: string, value: number }]
 *
 * API item shape: { name: 'Genomics and Phylogenetic Studies', percentage: 3 }
 *
 * @param {Array} data - raw API array
 * @returns {Array<{name: string, value: number}>}
 */
export const transformDistributionData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    name: item.name,
    value: item.percentage,
  }));
};

/**
 * Transform top entities API array into the shape TopEntitiesCard expects:
 *   [{ name: string, value: number, displayValue: string }]
 *
 * API item shape: { name: 'American Cancer Society', score: 100 }
 *
 * @param {Array} data - raw API array
 * @returns {Array<{name: string, value: number, displayValue: string}>}
 */
export const transformTopEntitiesData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    name: item.name,
    value: item.score,
    displayValue: item.score >= 1000
      ? `${(item.score / 1000).toFixed(1)}k`
      : String(item.score),
  }));
};

/**
 * Helper function to find the quartile group with the highest percentage.
 *
 * @param {Array<{group: string, percentage: number}>} distribution - The quartile distribution array
 * @returns {{group: string, percentage: number} | null} The object with the highest percentage, or null if empty
 */
export const getHighestQuartile = (distribution) => {
  if (!Array.isArray(distribution) || distribution.length === 0) return null;

  return distribution.reduce((max, current) => {
    return (current.percentage || 0) > (max.percentage || 0) ? current : max;
  }, distribution[0]);
};

/**
 * Transform quartiles API response into the shape ImpactQuartilesCard expects.
 *
 * @param {object} data - raw API data
 * @returns {object|null}
 */
export const transformQuartilesData = (data) => {
  if (!data || !Array.isArray(data.distribution)) return null;

  const highestQ = getHighestQuartile(data.distribution);
  if (!highestQ) return null;

  // Extract the "Q1", "Q2", "Q3", "Q4" part for the label from "Q1 (High Impact)"
  const labelMatch = highestQ.group.match(/^(Q[1-4])/i);
  const label = labelMatch ? labelMatch[1] : highestQ.group;

  return {
    percentage: highestQ.percentage,
    label: label,
    highestGroup: highestQ,
    totalJournals: data.totalJournals || 0,
  };
};

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
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @param {object} options - Optional parameters
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
 * @param {number|string} projectId - The project ID (from URL param :id)
 * @returns {Promise<object>}
 */
export const fetchQuartiles = (projectId) => {
  return apiClient.get('/analytics/journals/quartiles', {
    params: { project_id: projectId },
  });
};
