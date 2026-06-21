import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './CitationMirroringChart.css';

const MOCK_DATA = [
  { year: '2019', external: 240, self: 80 },
  { year: '2020', external: 310, self: 110 },
  { year: '2021', external: 420, self: 150 },
  { year: '2022', external: 580, self: 190 },
  { year: '2023', external: 720, self: 230 },
  { year: '2024', external: 860, self: 280 }
];

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

export default function CitationMirroringChart() {
  return (
    <div className="citation-mirroring-wrapper" aria-label="Citation Mirroring Dual Line Chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={MOCK_DATA}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
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
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}
          />
          <Line 
            type="monotone" 
            dataKey="external" 
            name="External Citations"
            stroke="var(--color-primary-orange)" 
            strokeWidth={3}
            dot={{ r: 4, fill: 'var(--color-surface)', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            isAnimationActive={true}
          />
          <Line 
            type="monotone" 
            dataKey="self" 
            name="Self Citations"
            stroke="#64748b" 
            strokeWidth={3}
            dot={{ r: 4, fill: 'var(--color-surface)', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
