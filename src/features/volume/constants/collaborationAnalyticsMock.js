export const MOCK_TOP_AUTHORS = [
  { rank: '01', name: 'Dr. Helena Vance', score: 94.2, label: 'Impact Score', color: '#ff6b00' },
  { rank: '02', name: 'Prof. Marcus Thorne', score: 89.8, label: 'Impact Score', color: '#ff6b00' },
  { rank: '03', name: 'Dr. Akira Saito', score: 86.5, label: 'Impact Score', color: '#ff6b00' },
  { rank: '04', name: 'Sarah J. Miller', score: 82.1, label: 'Impact Score', color: '#ff6b00' },
];

export const MOCK_LEADING_INSTITUTIONS = [
  { rank: '01', name: 'Stanford Bio-Dynamics Lab', score: 98.1, label: 'Citations', color: '#1b2432' },
  { rank: '02', name: 'CERN Theoretical Group', score: 95.4, label: 'Citations', color: '#1b2432' },
  { rank: '03', name: 'University of Oxford', score: 91.0, label: 'Citations', color: '#1b2432' },
  { rank: '04', name: 'MIT Media Lab', score: 88.2, label: 'Citations', color: '#1b2432' },
];

export const MOCK_IMPACT_MATRIX = [
  { id: 1, x: 20, y: 55, r: 4, type: 'author' },
  { id: 2, x: 35, y: 35, r: 6, type: 'author' },
  { id: 3, x: 45, y: 45, r: 3, type: 'author' },
  { id: 4, x: 80, y: 65, r: 5, type: 'author' },
  { id: 5, x: 55, y: 40, r: 4, type: 'institution' },
  { id: 6, x: 90, y: 20, r: 7, type: 'institution' },
];

export const MOCK_KEY_INSIGHTS = {
  description: 'Aggregate metrics across 2,400 institutional collaborations.',
  metrics: [
    { value: '4.2x', label: 'AVG GROWTH IN JOINT VENTURES' },
    { value: '18.5%', label: 'INTER-DISCIPLINARY CROSS-OVER' },
    { value: '92%', label: 'PUBLICATION SUCCESS RATE' },
  ]
};

export const MOCK_GLOBAL_NETWORK = {
  nodes: [
    { id: 1, x: 30, y: 40, type: 'author', radius: 4 },
    { id: 2, x: 45, y: 80, type: 'author', radius: 8 },
    { id: 3, x: 60, y: 60, type: 'author', radius: 3 },
    { id: 4, x: 85, y: 50, type: 'author', radius: 5 },
    { id: 5, x: 75, y: 20, type: 'institution', radius: 4 },
    { id: 6, x: 80, y: 85, type: 'institution', radius: 5 },
  ],
  edges: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 3, target: 5 },
    { source: 4, target: 5 },
    { source: 4, target: 6 },
    { source: 2, target: 4 },
    { source: 1, target: 5 },
  ]
};

export const MOCK_TOPIC_INTENSITY_AUTHORS = {
  columns: ['AI/ML', 'BIO-MED', 'PHYSIC', 'CHEM', 'ETHICS'],
  rows: ['H. Vance', 'M. Thorne', 'A. Saito', 'S. Miller'],
  data: [
    [0.8, 0.4, 0.2, 0.1, 0.3],
    [0.3, 0.7, 0.9, 0.1, 0.1],
    [0.1, 0.2, 0.4, 0.8, 0.2],
    [0.6, 0.1, 0.1, 0.2, 0.7],
  ]
};

export const MOCK_TOPIC_INTENSITY_INSTITUTIONS = {
  columns: ['AI/ML', 'BIO-MED', 'PHYSIC', 'CHEM', 'ETHICS'],
  rows: ['Stanford', 'CERN', 'Oxford', 'MIT'],
  data: [
    [0.9, 0.8, 0.2, 0.4, 0.1],
    [0.1, 0.2, 0.9, 0.3, 0.1],
    [0.4, 0.6, 0.5, 0.7, 0.8],
    [0.8, 0.5, 0.6, 0.4, 0.5],
  ]
};
