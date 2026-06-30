import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function TopicEvolutionCard({ topicEvolution }) {
  const topics = topicEvolution?.topics || [];

  if (topics.length === 0) {
    return (
      <div className="analytics-card">
        <div className="analytics-card-header">
          <div className="analytics-card-title-group">
            <h3 className="analytics-card-title">Topic Evolution</h3>
            <p className="analytics-card-subtitle">Shifting research focuses across domains</p>
          </div>
        </div>
        <div className="analytics-card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-body)' }}>
          Không có dữ liệu phù hợp với bộ lọc hiện tại.
        </div>
      </div>
    );
  }

  const COLORS = ['var(--color-primary-orange)', '#fdba74', '#fcd34d'];
  const STROKES = [null, null, '#e5e7eb'];

  const meta = topics.map((t, idx) => ({
    key: `topic_${idx}`,
    title: t.name,
    subtitle: `${t.domain} ${t.percentage}%`,
    color: COLORS[idx % COLORS.length],
    stroke: STROKES[idx % STROKES.length]
  }));

  // Get all unique years
  const yearsSet = new Set();
  topics.forEach(t => {
    t.data?.forEach(d => yearsSet.add(d.year));
  });
  const years = Array.from(yearsSet).sort((a, b) => a - b);

  const chartData = years.map(year => {
    const row = { year };
    topics.forEach((t, idx) => {
      const yearData = t.data?.find(d => d.year === year);
      row[`topic_${idx}`] = yearData ? yearData.value : 0;
    });
    return row;
  });

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div className="analytics-card-title-group">
          <h3 className="analytics-card-title">Topic Evolution</h3>
          <p className="analytics-card-subtitle">Shifting research focuses across domains</p>
        </div>
      </div>
      <div className="analytics-card-body">
        <div className="topic-evolution-wrapper" aria-label="Topic Evolution Stacked Area Chart">
          <ResponsiveContainer width="100%" height="60%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--color-neutral-500)', fontSize: 10 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--color-neutral-500)', fontSize: 10 }} 
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
      </div>
    </div>
  );
}
