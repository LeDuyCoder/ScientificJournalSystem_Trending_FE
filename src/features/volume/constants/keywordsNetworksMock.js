export const MOCK_TREND_VECTORS = {
  daily: [
    { name: 'LLM Bias', value: 45 },
    { name: 'Quantum Sim', value: 80 },
    { name: 'Neuro-Symbolic', value: 35 },
    { name: 'Graph RAG', value: 20 },
    { name: 'Synthetic Bio', value: 90 },
    { name: 'Edge ML', value: 15 },
  ],
  monthly: [
    { name: 'LLM Bias', value: 200 },
    { name: 'Quantum Sim', value: 320 },
    { name: 'Neuro-Symbolic', value: 150 },
    { name: 'Graph RAG', value: 100 },
    { name: 'Synthetic Bio', value: 450 },
    { name: 'Edge ML', value: 80 },
  ],
};

export const MOCK_COUNTRY_COLLAB = [
  { source: 'UNITED STATES', target: 'CHINA', value: 50 },
  { source: 'UNITED STATES', target: 'EUROPEAN UNION', value: 80 },
  { source: 'UNITED STATES', target: 'JAPAN', value: 40 },
  { source: 'CHINA', target: 'EUROPEAN UNION', value: 60 },
  { source: 'CHINA', target: 'JAPAN', value: 30 },
  { source: 'EUROPEAN UNION', target: 'JAPAN', value: 70 },
];

export const MOCK_TEMPORAL_SHIFT = [
  // 7 rows x 8 cols mock grid
  ...Array(56).fill(0).map((_, i) => ({
    id: i,
    intensity: Math.random(),
  }))
];
