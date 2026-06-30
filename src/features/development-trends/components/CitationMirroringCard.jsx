import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="mirroring-tooltip">
        <p className="mirroring-tooltip-year">{label}</p>
        <div className="mirroring-tooltip-data">
          <p className="mirroring-tooltip-external">
            External: <span>{payload.find(p => p.dataKey === 'external')?.value}</span>
          </p>
          <p className="mirroring-tooltip-self">
            Self: <span>{payload.find(p => p.dataKey === 'self')?.value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function CitationMirroringCard({ data }) {
  const chartData = data?.data || [];

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div className="analytics-card-title-group">
          <h3 className="analytics-card-title">Citation Mirroring</h3>
          <p className="analytics-card-subtitle">Self-citation vs. External impact mapping</p>
        </div>
      </div>
      <div className="analytics-card-body">
        {chartData.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-body)' }}>
            Không có dữ liệu phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          <div className="citation-mirroring-wrapper" aria-label="Citation Mirroring Dual Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-neutral-300)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', color: 'var(--color-neutral-600)', top: '-40px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="external" 
                  name="External"
                  stroke="var(--color-primary-orange)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
                <Line 
                  type="monotone" 
                  dataKey="self" 
                  name="Self"
                  stroke="#1f2937" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
