import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './TopicEvolutionChart.css';

import { useDashboardContext } from '../../contexts/DashboardContext';

const CustomTooltip = ({ active, payload, label, meta }) => {
  if (active && payload && payload.length && meta) {
    return (
      <div className="evolution-tooltip">
        <p className="evolution-tooltip-year">{label}</p>
        <div className="evolution-tooltip-data">
          {meta.map(m => (
            <p key={m.key} className="evolution-tooltip-row" style={{ color: m.color }}>
              {m.title}: <span>{payload.find(p => p.dataKey === m.key)?.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function TopicEvolutionChart() {
  const { dashboardData } = useDashboardContext();
  const data = dashboardData?.topicEvolution?.data || [];
  const meta = dashboardData?.topicEvolution?.meta || [];

  return (
    <div className="topic-evolution-wrapper" aria-label="Topic Evolution Stacked Area Chart">
      <ResponsiveContainer width="100%" height="60%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {meta.map(m => (
              <linearGradient key={`grad-${m.key}`} id={`color-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={m.color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={m.color} stopOpacity={0.2}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-200)" />
          <XAxis 
            dataKey="period" 
            axisLine={false} 
            tickLine={false} 
            tick={false} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={false}
          />
          <Tooltip content={<CustomTooltip meta={meta} />} cursor={{ stroke: 'var(--color-neutral-300)', strokeWidth: 1, strokeDasharray: '4 4' }} />
          {meta.map(m => (
            <Area 
              key={m.key}
              type="monotone" 
              dataKey={m.key} 
              stackId="1" 
              stroke={m.color} 
              fill={`url(#color-${m.key})`} 
              animationDuration={1500}
              isAnimationActive={true}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className="evolution-custom-legend">
        {meta.map(m => (
          <div key={m.key} className="evolution-legend-item">
            <span className="legend-swatch" style={{ backgroundColor: m.color, border: m.stroke ? `1px solid ${m.stroke}` : 'none' }}></span>
            <div className="legend-text-group">
              <span className="legend-title">{m.title}</span>
              <span className="legend-subtitle">{m.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
