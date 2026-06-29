import { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FiMaximize, FiX } from 'react-icons/fi';
import './FrontierDetectionChart.css';

import { useDashboardContext } from '../../contexts/DashboardContext';

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

const CustomNode = (props) => {
  const { cx, cy, payload } = props;
  const isFrontier = payload.isFrontier;
  
  // Base dimensions
  const width = isFrontier ? 90 : 60;
  const height = isFrontier ? 60 : 40;
  
  if (isFrontier) {
    return (
      <g transform={`translate(${cx - width/2}, ${cy - height/2})`}>
        <rect width={width} height={height} rx={8} fill="#ffedd5" stroke="#f97316" strokeWidth={2} />
        <text x={width/2} y={height/2 - 5} textAnchor="middle" fill="#9a3412" fontSize={11} fontWeight={700}>{payload.topic}</text>
        <text x={width/2} y={height/2 + 10} textAnchor="middle" fill="#c2410c" fontSize={9} fontWeight={600}>FRONTIER</text>
      </g>
    );
  }

  return (
    <g transform={`translate(${cx - width/2}, ${cy - height/2})`}>
      <rect width={width} height={height} rx={8} fill="#f8fafc" stroke="#94a3b8" strokeWidth={1} />
      <text x={width/2} y={height/2 + 4} textAnchor="middle" fill="#475569" fontSize={10} fontWeight={600}>{payload.topic}</text>
    </g>
  );
};

const ScatterVisualization = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
      <XAxis 
        type="number" 
        dataKey="velocity" 
        name="Velocity Score" 
        domain={[50, 100]}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: 'CITATION VELOCITY', position: 'bottom', offset: 0, fill: 'var(--color-neutral-500)', fontSize: 10, fontWeight: 600, letterSpacing: '1px' }}
      />
      <YAxis 
        type="number" 
        dataKey="impact" 
        name="Impact Score" 
        domain={[60, 100]}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: 'IMPACT FACTOR', angle: -90, position: 'left', offset: 0, fill: 'var(--color-neutral-500)', fontSize: 10, fontWeight: 600, letterSpacing: '1px' }}
      />
      <ZAxis type="number" dataKey="size" range={[200, 1500]} name="Research Volume" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
      <Scatter name="Topics" data={data} shape={<CustomNode />} animationDuration={1500} />
    </ScatterChart>
  </ResponsiveContainer>
);

export default function FrontierDetectionChart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { dashboardData } = useDashboardContext();
  const rawData = dashboardData?.frontierDetection || [];

  const fixedMapping = {
    'LEGACY': { topic: 'Legacy', velocity: 55, impact: 65, isFrontier: false },
    'GEN AI': { topic: 'Gen AI', velocity: 70, impact: 75, isFrontier: false },
    'IOT 6G': { topic: 'IoT 6G', velocity: 85, impact: 85, isFrontier: false },
    'CRISPR V3': { topic: 'CRISPR V3', velocity: 98, impact: 95, isFrontier: true }
  };

  let chartData = rawData
    .filter(d => fixedMapping[d.topic.toUpperCase()])
    .map(d => ({
      ...d,
      ...fixedMapping[d.topic.toUpperCase()]
    }));

  if (chartData.length === 0) {
    chartData = [
      { topic: 'Legacy', velocity: 55, impact: 65, size: 70, isFrontier: false },
      { topic: 'Gen AI', velocity: 70, impact: 75, size: 90, isFrontier: false },
      { topic: 'IoT 6G', velocity: 85, impact: 85, size: 85, isFrontier: false },
      { topic: 'CRISPR V3', velocity: 98, impact: 95, size: 120, isFrontier: true }
    ];
  }

  // Ensure strict ordering: Legacy -> Gen AI -> IoT 6G -> CRISPR V3
  const order = ['Legacy', 'Gen AI', 'IoT 6G', 'CRISPR V3'];
  chartData.sort((a, b) => order.indexOf(a.topic) - order.indexOf(b.topic));

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
        <ScatterVisualization data={chartData} />
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
              <ScatterVisualization data={chartData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
