export const collaborationAnalyticsMock = {
  authors: [
    { rank: "01", name: "Dr. Helena Vance", score: 94.2 },
    { rank: "02", name: "Prof. Marcus Thorne", score: 89.8 },
    { rank: "03", name: "Dr. Akira Saito", score: 86.5 },
    { rank: "04", name: "Sarah J. Miller", score: 82.1 }
  ],
  institutions: [
    { rank: "01", name: "Stanford Bio-Dynamics Lab", citations: 98.1 },
    { rank: "02", name: "CERN Theoretical Group", citations: 95.4 },
    { rank: "03", name: "University of Oxford", citations: 91.0 },
    { rank: "04", name: "MIT Media Lab", citations: 88.2 }
  ],
  insights: {
    description: "Aggregate metrics across 2,400 institutional collaborations.",
    jointVenturesGrowth: "4.2x",
    interdisciplinaryCrossOver: "18.5%",
    publicationSuccessRate: "92%"
  },
  impactMatrix: [
    { x: 12, y: 72, size: 70, type: "active" },
    { x: 22, y: 45, size: 120, type: "active" },
    { x: 40, y: 60, size: 50, type: "active" },
    { x: 58, y: 43, size: 45, type: "institution" },
    { x: 72, y: 76, size: 80, type: "active" },
    { x: 86, y: 25, size: 150, type: "institution" }
  ],
  topicMatrix: {
    mode: "AUTHORS",
    rows: ["H. Vance", "M. Thorne", "A. Saito", "S. Miller"],
    columns: ["AIML", "BIO-MED", "PHYSIC", "CHEM", "ETHICS"],
    values: [
      [5, 3, 1, 1, 2],
      [1, 4, 5, 1, 0],
      [0, 1, 2, 5, 1],
      [3, 0, 1, 1, 4]
    ]
  },
  networkData: {
    nodes: [
      { id: 'USA', group: 1, radius: 25 },
      { id: 'UK', group: 2, radius: 20 },
      { id: 'Germany', group: 2, radius: 18 },
      { id: 'China', group: 3, radius: 22 },
      { id: 'Japan', group: 3, radius: 15 }
    ],
    links: [
      { source: 'USA', target: 'UK', value: 8 },
      { source: 'USA', target: 'China', value: 6 },
      { source: 'USA', target: 'Germany', value: 5 },
      { source: 'UK', target: 'Germany', value: 7 },
      { source: 'China', target: 'Japan', value: 5 }
    ]
  }
};
