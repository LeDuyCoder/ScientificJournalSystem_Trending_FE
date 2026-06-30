// Mock data for Journals feature

export const quartileDistribution = {
  totalJournals: 2400,
  items: [
    { quartile: "Q1", label: "High Impact", percentage: 42, colorToken: "orange" },
    { quartile: "Q2", label: "Moderate", percentage: 35, colorToken: "dark" },
    { quartile: "Q3", label: "Standard", percentage: 18, colorToken: "gray" },
    { quartile: "Q4", label: "Developing", percentage: 5, colorToken: "lightGray" }
  ]
};

export const topJournals = [
  {
    name: "Nature Bibliometrics",
    impactFactor: 42.1,
    color: "orange"
  },
  {
    name: "Journal of Data Science",
    impactFactor: 38.4,
    color: "dark"
  },
  {
    name: "Review of Quantitative Analysis",
    impactFactor: 31.2,
    color: "gray"
  },
  {
    name: "Global Informatics",
    impactFactor: 24.7,
    color: "lightGray"
  }
];

export const impactMatrixData = [
  {
    journal: "Nature Bibliometrics",
    quartile: "Q1",
    sjrScore: 4.2,
    hIndex: 82,
    size: 18
  },
  {
    journal: "Journal of Data Science",
    quartile: "Q1",
    sjrScore: 3.8,
    hIndex: 74,
    size: 12
  },
  {
    journal: "Review of Quantitative Analysis",
    quartile: "Q2",
    sjrScore: 3.2,
    hIndex: 68,
    size: 10
  },
  {
    journal: "Global Informatics",
    quartile: "Q2",
    sjrScore: 2.6,
    hIndex: 52,
    size: 11
  },
  {
    journal: "Computational Metrics",
    quartile: "Q3",
    sjrScore: 1.8,
    hIndex: 41,
    size: 8
  },
  {
    journal: "Applied Research Index",
    quartile: "Q3",
    sjrScore: 1.2,
    hIndex: 33,
    size: 6
  }
];

export const migrationAnalysis = {
  period: "2024-2026",
  total: 842,
  transitionRate: 12.4,
  nodes: [
    { id: "subscription", label: "SUBSCRIPTION" },
    { id: "hybrid", label: "HYBRID" },
    { id: "fullOpenAccess", label: "FULL OPEN ACCESS" },
    { id: "legacyModel", label: "LEGACY MODEL" }
  ],
  links: [
    { source: "subscription", target: "fullOpenAccess", value: 420 },
    { source: "subscription", target: "legacyModel", value: 260 },
    { source: "hybrid", target: "fullOpenAccess", value: 110 },
    { source: "hybrid", target: "legacyModel", value: 52 }
  ]
};
