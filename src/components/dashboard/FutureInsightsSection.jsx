import DashboardGrid from '../layout/DashboardGrid';
import { FiTrendingUp, FiAlertTriangle, FiShare2 } from 'react-icons/fi';
import { useDashboardContext } from '../../contexts/DashboardContext';
import './FutureInsightsSection.css';

const getIcon = (id) => {
  switch (id) {
    case 'peak': return <FiTrendingUp />;
    case 'saturation': return <FiAlertTriangle />;
    case 'synergy': return <FiShare2 />;
    default: return null;
  }
};

export default function FutureInsightsSection() {
  const { dashboardData } = useDashboardContext();
  const data = dashboardData?.futureInsights || [];

  return (
    <div className="future-insights-wrapper" aria-label="Future Insights Section">
      <DashboardGrid columns={3}>
        {data.map(insight => (
          <div key={insight.id} className={`insight-card insight-accent-${insight.accent}`}>
            <div className="insight-icon-container">
              {getIcon(insight.id)}
            </div>
            <div className="insight-card-header">
              <h3 className="insight-card-title">{insight.type}</h3>
            </div>
            
            <div className="insight-card-body">
              <p className="insight-summary">{insight.summary}</p>
            </div>
          </div>
        ))}
      </DashboardGrid>
    </div>
  );
}
