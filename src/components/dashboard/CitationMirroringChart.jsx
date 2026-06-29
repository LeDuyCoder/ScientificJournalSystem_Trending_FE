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

import { useDashboardContext } from '../../contexts/DashboardContext';

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
  const { dashboardData } = useDashboardContext();
  const data = dashboardData?.citationMirroring || [];

  return (
    <div className="citation-mirroring-wrapper" aria-label="Citation Mirroring Dual Line Chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
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
  );
}
