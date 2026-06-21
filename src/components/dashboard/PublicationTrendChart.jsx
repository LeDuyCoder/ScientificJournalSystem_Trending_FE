import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './PublicationTrendChart.css';

const MOCK_DATA = [
  { year: '2019', publications: 320 },
  { year: '2020', publications: 410 },
  { year: '2021', publications: 560 },
  { year: '2022', publications: 720 },
  { year: '2023', publications: 910 },
  { year: '2024', publications: 1180 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="trend-tooltip">
        <p className="trend-tooltip-year">{label}</p>
        <p className="trend-tooltip-value">
          Publications: <span className="trend-tooltip-number">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PublicationTrendChart() {
  return (
    <div className="publication-trend-chart-wrapper" aria-label="Publication Trend Line Chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={MOCK_DATA}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPublications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary-orange)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-primary-orange)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-200)" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-neutral-500)', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-neutral-500)', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-neutral-300)', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="publications" 
            stroke="var(--color-primary-orange)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPublications)" 
            animationDuration={1500}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
