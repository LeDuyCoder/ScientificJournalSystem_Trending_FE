// src/services/dashboardDataService.js

// Generate realistic organic curve data
const generateTrendData = () => {
  const data = [];
  let basePub = 200;
  for (let i = 0; i <= 24; i++) {
    basePub += Math.floor(Math.random() * 40) + 10;
    data.push({
      period: `M${i+1}`,
      publications: basePub + Math.floor(Math.sin(i) * 30)
    });
  }
  return data;
};

const generateMirroringData = () => {
  const data = [];
  let ext = 100;
  let self = 40;
  for (let i = 0; i <= 24; i++) {
    ext += Math.floor(Math.random() * 25) + 5;
    self += Math.floor(Math.random() * 8) + 2;
    data.push({
      period: `M${i+1}`,
      external: ext + Math.floor(Math.sin(i*0.5) * 20),
      self: self + Math.floor(Math.cos(i*0.8) * 10)
    });
  }
  return data;
};

const generateEvolutionData = () => {
  const data = [];
  let s1 = 50, s2 = 80, s3 = 120;
  for (let i = 0; i <= 24; i++) {
    s1 += Math.floor(Math.random() * 15) + 5;
    s2 += Math.floor(Math.random() * 10) + 2;
    s3 += Math.floor(Math.random() * 5) + 1;
    data.push({
      period: `M${i+1}`,
      quantum: s1 + Math.floor(Math.sin(i) * 10),
      neural: s2 + Math.floor(Math.cos(i) * 15),
      other: s3 + Math.floor(Math.sin(i*0.5) * 8)
    });
  }
  return data;
};

const frontierDetectionData = [
  { topic: 'CRISPR V3', velocity: 92, impact: 96, size: 120, isFrontier: true },
  { topic: 'GEN AI', velocity: 78, impact: 72, size: 90, isFrontier: false },
  { topic: 'IOT 6G', velocity: 88, impact: 82, size: 85, isFrontier: false },
  { topic: 'LEGACY', velocity: 60, impact: 65, size: 70, isFrontier: false },
  { topic: 'Quantum Crypto', velocity: 85, impact: 91, size: 95, isFrontier: false },
  { topic: 'Neuro-Symbolic AI', velocity: 95, impact: 88, size: 75, isFrontier: false },
  { topic: 'Edge Computing', velocity: 72, impact: 68, size: 110, isFrontier: false },
  { topic: 'Synthetic Bio', velocity: 82, impact: 85, size: 105, isFrontier: false },
  { topic: 'Nanomedicine', velocity: 68, impact: 78, size: 80, isFrontier: false },
  { topic: 'Photonics', velocity: 65, impact: 74, size: 65, isFrontier: false },
];

const topicEvolutionMeta = [
  { key: 'quantum', title: 'Quantum Computing', subtitle: 'Expanding 42%', color: 'var(--color-primary-orange)' },
  { key: 'neural', title: 'Neural Networks', subtitle: 'Stable 12%', color: '#fdba74' },
  { key: 'other', title: 'Other Domains', subtitle: 'Baseline', color: '#fef3c7', stroke: '#e5e7eb' }
];

const futureInsightsData = [
  {
    id: 'peak',
    type: 'Predictive Peak',
    summary: 'Bio-engineering is projected to reach its citation apex in Q3 2027 based on current velocity.',
    confidence: 'High',
    accent: 'growth'
  },
  {
    id: 'saturation',
    type: 'Saturation Alert',
    summary: 'Standard ML models show signs of topic saturation; expect a pivot towards hardware acceleration.',
    confidence: 'Medium',
    accent: 'warning'
  },
  {
    id: 'synergy',
    type: 'Cross-Domain Synergy',
    summary: 'New cluster forming at the intersection of Material Science and Neural Engineering.',
    confidence: 'High',
    accent: 'innovation'
  }
];

/**
 * Fetches and normalizes dashboard data based on current filters.
 * Returns a Promise to simulate network latency.
 * @param {Object} filters 
 * @returns {Promise<Object>}
 */
export const fetchDashboardData = (filters) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate potential network error
      if (filters.timeframe === 'error') {
        reject(new Error('Failed to fetch dashboard data'));
        return;
      }

      resolve({
        publicationTrend: generateTrendData(),
        citationMirroring: generateMirroringData(),
        topicEvolution: {
          data: generateEvolutionData(),
          meta: topicEvolutionMeta
        },
        frontierDetection: frontierDetectionData,
        futureInsights: futureInsightsData
      });
    }, 1500);
  });
};
