import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const KeywordTrendVectorsChart = ({ data, timeframe, onTimeframeChange }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <div>
          <h2 className="kn-card-title">Keyword Trend Vectors</h2>
          <p className="kn-card-subtitle">Frontier topic acceleration over the last 12 months</p>
        </div>
        <div className="kn-toggle-group">
          <button 
            className={`kn-toggle-btn ${timeframe === 'daily' ? 'active' : ''}`}
            onClick={() => onTimeframeChange('daily')}
          >
            Daily
          </button>
          <button 
            className={`kn-toggle-btn ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => onTimeframeChange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      <div style={{ width: '100%', height: 250, marginTop: '24px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--color-neutral-500)' }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'var(--color-neutral-100)' }} contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            {/* Using a single bar for simplicity as per requirements, mimicking a stacked bar with background */}
            <Bar dataKey="value" fill="var(--color-primary-orange)" background={{ fill: '#EADDD7' }} radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KeywordTrendVectorsChart;
