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

const MOCK_DATA = [
  { year: '2019', bio: 120, medical: 80, computer: 40 },
  { year: '2020', bio: 150, medical: 95, computer: 55 },
  { year: '2021', bio: 180, medical: 120, computer: 75 },
  { year: '2022', bio: 220, medical: 145, computer: 110 },
  { year: '2023', bio: 270, medical: 180, computer: 150 },
  { year: '2024', bio: 320, medical: 230, computer: 210 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="evolution-tooltip">
        <p className="evolution-tooltip-year">{label}</p>
        <div className="evolution-tooltip-data">
          <p className="evolution-tooltip-row" style={{ color: '#3b82f6' }}>
            Biological Sciences: <span>{payload.find(p => p.dataKey === 'bio')?.value}</span>
          </p>
          <p className="evolution-tooltip-row" style={{ color: '#10b981' }}>
            Medical Research: <span>{payload.find(p => p.dataKey === 'medical')?.value}</span>
          </p>
          <p className="evolution-tooltip-row" style={{ color: 'var(--color-primary-orange)' }}>
            Computer Science: <span>{payload.find(p => p.dataKey === 'computer')?.value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function TopicEvolutionChart() {
  return (
    <div className="topic-evolution-wrapper" aria-label="Topic Evolution Stacked Area Chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={MOCK_DATA}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="colorMedical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="colorComputer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary-orange)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-primary-orange)" stopOpacity={0.2}/>
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
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="square"
            wrapperStyle={{ fontSize: '12px', color: 'var(--color-neutral-600)' }}
          />
          <Area 
            type="monotone" 
            dataKey="computer" 
            name="Computer Science"
            stackId="1" 
            stroke="var(--color-primary-orange)" 
            fill="url(#colorComputer)" 
            animationDuration={1500}
            isAnimationActive={true}
          />
          <Area 
            type="monotone" 
            dataKey="medical" 
            name="Medical Research"
            stackId="1" 
            stroke="#10b981" 
            fill="url(#colorMedical)" 
            animationDuration={1500}
            isAnimationActive={true}
          />
          <Area 
            type="monotone" 
            dataKey="bio" 
            name="Biological Sciences"
            stackId="1" 
            stroke="#3b82f6" 
            fill="url(#colorBio)" 
            animationDuration={1500}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
