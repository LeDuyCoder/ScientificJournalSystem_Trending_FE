import DashboardGrid from './DashboardGrid';
import './AnalyticsDashboard.css';

import PublicationTrendChart from '../dashboard/PublicationTrendChart';
import CitationMirroringChart from '../dashboard/CitationMirroringChart';
import TopicEvolutionChart from '../dashboard/TopicEvolutionChart';
import FrontierDetectionChart from '../dashboard/FrontierDetectionChart';

const MOCK_CARDS = [
  { id: 'trend', title: 'Publication Trend', subtitle: 'Growth of scholarly output over time' },
  { id: 'mirroring', title: 'Citation Mirroring', subtitle: 'Self-citation vs. External impact mapping' },
  { id: 'evolution', title: 'Topic Evolution', subtitle: 'Shifting research focuses across domains' },
  { id: 'frontier', title: 'Frontier Detection', subtitle: 'Emerging topics by velocity and impact' },
];

/**
 * AnalyticsDashboard implements the core 2x2 layout
 * for the data visualization widgets.
 */
export default function AnalyticsDashboard() {
  return (
    <DashboardGrid columns={2}>
      {MOCK_CARDS.map(card => (
        <div key={card.id} className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title-group">
              <h3 className="analytics-card-title">
                {card.title}
                {card.id === 'trend' && <span className="yoy-badge">+14.2% YoY</span>}
              </h3>
              <p className="analytics-card-subtitle">{card.subtitle}</p>
            </div>
          </div>
          <div className="analytics-card-body">
            {card.id === 'trend' ? (
              <PublicationTrendChart />
            ) : card.id === 'mirroring' ? (
              <CitationMirroringChart />
            ) : card.id === 'evolution' ? (
              <TopicEvolutionChart />
            ) : card.id === 'frontier' ? (
              <FrontierDetectionChart />
            ) : (
              <div className="analytics-mock-chart">
                <span className="analytics-mock-text">Mock Chart Area</span>
                <span className="analytics-mock-subtext">{card.title} Visualization</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </DashboardGrid>
  );
}
