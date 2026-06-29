import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './KeywordsNetworks.css';

const KeywordTrendVectorsChart = ({ data }) => {
  const [activeRange, setActiveRange] = useState('monthly'); // 'daily' | 'monthly'

  const chartData = useMemo(() => {
    if (!data) return [];
    return activeRange === 'daily' ? data.daily : data.monthly;
  }, [data, activeRange]);

  if (!data) {
    return <div className="kn-card"><div className="kn-empty">No trend data available</div></div>;
  }



  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <div>
          <h2 className="kn-card-title">Keyword Trend Vectors</h2>
          <div className="kn-card-subtitle">Frontier topic acceleration over the last 12 months</div>
        </div>
        <div className="kn-toggle">
          <button 
            className={`kn-toggle-btn ${activeRange === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveRange('daily')}
          >
            Daily
          </button>
          <button 
            className={`kn-toggle-btn ${activeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveRange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="kn-card-content" style={{ height: '300px', width: '100%', minWidth: 0, marginTop: '24px' }}>
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={60}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: 'var(--color-neutral-500)', fontWeight: 600 }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} background={{ fill: '#EADDD7' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#B45309" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KeywordTrendVectorsChart;
