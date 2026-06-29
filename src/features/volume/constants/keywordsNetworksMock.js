export const keywordsNetworksMock = {
  coreClusters: {
    metric: '4.2k',
    label: 'Neural Architectures',
    growthText: '+12.4%',
    description:
      'Central nodes show high density in deep learning paradigms with a 12.4% growth vector.'
  },

  keywordTrendVectors: {
    activeRange: 'monthly',
    daily: [
      { name: 'LLM Ethics', value: 42 },
      { name: 'Quantum Sim', value: 58 },
      { name: 'Neuro-Symbolic', value: 47 },
      { name: 'Graph RAG', value: 35 },
      { name: 'Synthetic Bio', value: 62 },
      { name: 'Edge ML', value: 39 }
    ],
    monthly: [
      { name: 'LLM Ethics', value: 55 },
      { name: 'Quantum Sim', value: 78 },
      { name: 'Neuro-Symbolic', value: 63 },
      { name: 'Graph RAG', value: 45 },
      { name: 'Synthetic Bio', value: 84 },
      { name: 'Edge ML', value: 57 }
    ]
  },

  countryChord: {
    countries: ['CHINA', 'JAPAN', 'EUROPEAN UNION', 'US'],
    links: [
      { source: 'CHINA', target: 'JAPAN', value: 62 },
      { source: 'JAPAN', target: 'EUROPEAN UNION', value: 74 },
      { source: 'EUROPEAN UNION', target: 'US', value: 49 },
      { source: 'US', target: 'CHINA', value: 53 }
    ]
  },

  collaborationInsights: {
    description:
      'Global research output has shifted significantly towards multi-national clusters, with Japan and the EU showing the highest reciprocal citation growth of 5.8x YoY.',
    items: [
      { label: 'EMERGING LINK', value: 'Ethics + Quantum AI' },
      { label: 'CRITICAL NODE', value: 'Ethics in Biotech' }
    ]
  },

  conceptualProximity: {
    nodeDensity: '+0.82',
    description:
      'Strong thematic correlation between LLMs and Ethical Alignment paradigms.'
  },

  domainCrossLinks: {
    linkageRate: '74%',
    transferRate: '+12%',
    description:
      'Physics-rooted biological graph modeling influences engineering domains.'
  },

  temporalClusterShift: {
    projection: 'T + 2 Mo Projection',
    driftEntropy: 'LOW',
    description:
      'Clusters are stabilizing around Green Hydrogen and Carbon Capture trends.',
    matrix: [
      [1, 2, 0, 3, 1, 2],
      [2, 0, 3, 1, 2, 1],
      [0, 3, 2, 1, 0, 2],
      [1, 1, 3, 2, 2, 0]
    ]
  }
};
