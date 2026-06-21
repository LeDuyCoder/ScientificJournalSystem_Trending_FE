import React from 'react';
import DashboardGrid from './DashboardGrid';
import './AnalyticsDashboard.css';

import PublicationTrendChart from '../dashboard/PublicationTrendChart';

const MOCK_CARDS = [
  { id: 'trend', title: 'Publication Trend' },
  { id: 'mirroring', title: 'Citation Mirroring' },
  { id: 'evolution', title: 'Topic Evolution' },
  { id: 'frontier', title: 'Frontier Detection' },
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
            <h3 className="analytics-card-title">
              {card.title}
              {card.id === 'trend' && <span className="yoy-badge">+18.4% YoY</span>}
            </h3>
          </div>
          <div className="analytics-card-body">
            {card.id === 'trend' ? (
              <PublicationTrendChart />
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
