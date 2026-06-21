import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FiMaximize, FiX } from 'react-icons/fi';
import './FrontierDetectionChart.css';

const MOCK_DATA = [
  { topic: 'CRISPR V3', velocity: 92, impact: 96, size: 120 },
  { topic: 'Quantum AI', velocity: 78, impact: 88, size: 90 },
  { topic: 'Biofabrication', velocity: 64, impact: 71, size: 70 },
  { topic: 'Synthetic Biology', velocity: 82, impact: 76, size: 95 },
  { topic: 'AI Drug Discovery', velocity: 87, impact: 91, size: 110 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="frontier-tooltip">
        <p className="frontier-tooltip-topic">{data.topic}</p>
        <p className="frontier-tooltip-metric">Impact: <span>{data.impact}</span></p>
        <p className="frontier-tooltip-metric">Velocity: <span>{data.velocity}</span></p>
        <p className="frontier-tooltip-metric">Volume: <span>{data.size}</span></p>
      </div>
    );
  }
  return null;
};

const ScatterVisualization = () => (
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
      <XAxis 
        type="number" 
        dataKey="velocity" 
        name="Velocity Score" 
        domain={[50, 100]}
        tick={{ fill: 'var(--color-neutral-500)', fontSize: 12 }}
        tickLine={false}
        axisLine={false}
        label={{ value: 'Velocity Score', position: 'insideBottom', offset: -10, fill: 'var(--color-neutral-600)', fontSize: 12 }}
      />
      <YAxis 
        type="number" 
        dataKey="impact" 
        name="Impact Score" 
        domain={[60, 100]}
        tick={{ fill: 'var(--color-neutral-500)', fontSize: 12 }}
        tickLine={false}
        axisLine={false}
        label={{ value: 'Impact Score', angle: -90, position: 'insideLeft', fill: 'var(--color-neutral-600)', fontSize: 12 }}
      />
      <ZAxis type="number" dataKey="size" range={[200, 1500]} name="Research Volume" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
      <Scatter name="Topics" data={MOCK_DATA} animationDuration={1500}>
        {MOCK_DATA.map((entry, index) => {
          const isHighlighted = entry.topic === 'CRISPR V3';
          return (
            <Cell 
              key={`cell-${index}`} 
              fill={isHighlighted ? 'var(--color-primary-orange)' : '#64748b'} 
              fillOpacity={0.8}
              stroke={isHighlighted ? 'var(--color-primary-orange)' : 'none'}
              strokeWidth={isHighlighted ? 2 : 0}
              style={{ filter: isHighlighted ? 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.6))' : 'none' }}
            />
          );
        })}
      </Scatter>
    </ScatterChart>
  </ResponsiveContainer>
);

export default function FrontierDetectionChart() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="frontier-chart-wrapper" aria-label="Frontier Detection Scatter Plot">
        <button 
          className="frontier-expand-btn" 
          onClick={() => setIsExpanded(true)}
          aria-label="Expand chart"
        >
          <FiMaximize />
        </button>
        <ScatterVisualization />
      </div>

      {isExpanded && (
        <div className="frontier-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="frontier-modal-content" onClick={e => e.stopPropagation()}>
            <div className="frontier-modal-header">
              <h3>Frontier Detection</h3>
              <button 
                className="frontier-close-btn" 
                onClick={() => setIsExpanded(false)}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            <div className="frontier-modal-body">
              <ScatterVisualization />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
