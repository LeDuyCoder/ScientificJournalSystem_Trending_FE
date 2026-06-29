import './KPIStatCard.css';

export default function KPIStatCard({ title, value, trend, trendValue, icon: Icon }) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  const isStable = trend === 'stable';

  return (
    <div className="kpi-stat-card">
      <div className="kpi-stat-header">
        <h3 className="kpi-stat-title">{title}</h3>
        {Icon && <Icon className="kpi-stat-icon" />}
      </div>
      <div className="kpi-stat-content">
        <div className="kpi-stat-details">
          <div className="kpi-stat-value">{value}</div>
          <div className={`kpi-stat-trend ${trend}`}>
            {isPositive && <span className="trend-arrow">↗</span>}
            {isNegative && <span className="trend-arrow">↘</span>}
            {isStable && <span className="trend-arrow">—</span>}
            <span className="trend-value">{trendValue}</span>
          </div>
        </div>
        <div className="kpi-stat-chart">
          <svg viewBox="0 0 100 30" className={`sparkline ${trend}`} preserveAspectRatio="none">
            {isPositive && <path d="M0,25 Q25,5 50,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />}
            {isNegative && <path d="M0,5 Q25,25 50,10 T100,25" fill="none" stroke="currentColor" strokeWidth="2" />}
            {isStable && <path d="M0,15 L100,15" fill="none" stroke="currentColor" strokeWidth="2" />}
          </svg>
        </div>
      </div>
    </div>
  );
}
