import React from 'react';
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
import Card from '../../common/Card';
import './ImpactMatrixCard.css';

// Mock data as specified
const impactMatrixData = [
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

// Custom shape to render the bubbles
const CustomBubble = (props) => {
  const { cx, cy, payload } = props;
  const radius = payload.size;
  
  // Highlight the largest Q1 bubble with ring style as requested
  if (payload.quartile === 'Q1' && radius === 18) {
    return (
      <g>
        <circle 
          cx={cx} cy={cy} r={radius} 
          fill="#ffffff" 
          stroke="var(--color-primary-orange)" 
          strokeWidth="2" 
        />
        <circle 
          cx={cx} cy={cy} r={radius * 0.4} 
          fill="var(--color-primary-orange)" 
        />
      </g>
    );
  }

  // Standard solid bubbles
  let colorClass = 'imc-bubble-q3';
  if (payload.quartile === 'Q1') colorClass = 'imc-bubble-q1';
  if (payload.quartile === 'Q2') colorClass = 'imc-bubble-q2';

  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      className={colorClass}
    />
  );
};

// Custom tooltip renderer
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="imc-tooltip">
        <div className="imc-tooltip-title">{data.journal}</div>
        <div className="imc-tooltip-item">
          <span className="imc-tooltip-label">Quartile</span>
          <span className="imc-tooltip-value">{data.quartile}</span>
        </div>
        <div className="imc-tooltip-item">
          <span className="imc-tooltip-label">SJR Citation Score</span>
          <span className="imc-tooltip-value">{data.sjrScore}</span>
        </div>
        <div className="imc-tooltip-item">
          <span className="imc-tooltip-label">H-Index</span>
          <span className="imc-tooltip-value">{data.hIndex}</span>
        </div>
        <div className="imc-tooltip-item">
          <span className="imc-tooltip-label">Bubble Size</span>
          <span className="imc-tooltip-value">{data.size}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Top right legend for the Card
const LegendActions = () => (
  <div className="imc-legend">
    <div className="imc-legend-item">
      <div className="imc-legend-color imc-bg-q1"></div>
      <span>Q1</span>
    </div>
    <div className="imc-legend-item">
      <div className="imc-legend-color imc-bg-q2"></div>
      <span>Q2</span>
    </div>
    <div className="imc-legend-item">
      <div className="imc-legend-color imc-bg-q3"></div>
      <span>Q3</span>
    </div>
  </div>
);

// Renders the Impact Matrix Scatter/Bubble chart
const ImpactMatrixCard = () => {
  return (
    <Card 
      title="Impact Matrix" 
      subtitle="SJR vs H-Index Distribution" 
      actions={<LegendActions />}
      className="imc-card"
    >
      <div className="imc-content">
        {/* Chart container */}
        <div className="imc-chart-container" aria-label="SJR vs H-Index scatter chart">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
            >
              {/* Very light, thin grid lines */}
              <CartesianGrid stroke="var(--color-neutral-200)" strokeWidth={0.5} />
              
              {/* Hide ticks and axis line, show only custom label */}
              <XAxis 
                type="number" 
                dataKey="sjrScore" 
                name="SJR Citation Score"
                domain={[0, 5]}
                tickCount={5}
                tick={false}
                axisLine={false}
                label={{ 
                  value: 'SJR CITATION SCORE', 
                  position: 'bottom', 
                  offset: 0, 
                  fontSize: 10, 
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fill: 'var(--color-neutral-500)' 
                }}
              />
              
              {/* Hide ticks and axis line, show only custom label */}
              <YAxis 
                type="number" 
                dataKey="hIndex" 
                name="H-Index"
                domain={[0, 100]}
                tickCount={5}
                tick={false}
                axisLine={false}
                label={{ 
                  value: 'H-INDEX', 
                  angle: -90, 
                  position: 'left', 
                  offset: 0,
                  fontSize: 10, 
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  fill: 'var(--color-neutral-500)' 
                }}
              />
              
              <ZAxis 
                type="number" 
                dataKey="size" 
                range={[50, 400]} 
                name="Size" 
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ strokeDasharray: '3 3', stroke: 'var(--color-neutral-300)' }}
              />
              
              {/* Bubble rendering */}
              <Scatter 
                data={impactMatrixData} 
                shape={<CustomBubble />}
                isAnimationActive={true}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ImpactMatrixCard;
