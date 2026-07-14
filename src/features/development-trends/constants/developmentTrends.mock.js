// Pre-generated static lists or generators for development-trends to prevent visual jitter

const generateTrendData = () => {
  const data = [];
  let basePub = 200;
  for (let i = 0; i <= 24; i++) {
    basePub += 15 + (i % 3) * 5;
    data.push({
      period: `M${i+1}`,
      publications: basePub + Math.floor(Math.sin(i) * 15)
    });
  }
  return data;
};

const generateMirroringData = () => {
  const data = [];
  let ext = 100;
  let self = 40;
  for (let i = 0; i <= 24; i++) {
    ext += 10 + (i % 2) * 5;
    self += 4 + (i % 3) * 2;
    data.push({
      period: `M${i+1}`,
      external: ext + Math.floor(Math.sin(i*0.5) * 10),
      self: self + Math.floor(Math.cos(i*0.8) * 5)
    });
  }
  return data;
};

const generateEvolutionData = () => {
  const data = [];
  let s1 = 50, s2 = 80, s3 = 120;
  for (let i = 0; i <= 24; i++) {
    s1 += 8;
    s2 += 5;
    s3 += 2;
    data.push({
      period: `M${i+1}`,
      quantum: s1 + Math.floor(Math.sin(i) * 5),
      neural: s2 + Math.floor(Math.cos(i) * 7),
      other: s3 + Math.floor(Math.sin(i*0.5) * 4)
    });
  }
  return data;
};

export const publicationTrend = generateTrendData();
export const citationMirroring = generateMirroringData();
export const topicEvolution = {
  data: generateEvolutionData(),
  meta: [
    { key: 'quantum', title: 'Quantum Computing', subtitle: 'Expanding 42%', color: 'var(--color-primary-orange)' },
    { key: 'neural', title: 'Neural Networks', subtitle: 'Stable 12%', color: '#fdba74' },
    { key: 'other', title: 'Other Domains', subtitle: 'Baseline', color: '#fef3c7', stroke: '#e5e7eb' }
  ]
};

export const frontierDetection = [
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

export const futureInsights = [
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
