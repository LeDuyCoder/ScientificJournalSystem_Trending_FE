import React from 'react';
import DashboardGrid from '../layout/DashboardGrid';
import { FiTrendingUp, FiAlertTriangle, FiShare2 } from 'react-icons/fi';
import './FutureInsightsSection.css';

const INSIGHTS_DATA = [
  {
    id: 'peak',
    type: 'Predictive Peak',
    summary: 'Quantum Biology publications are expected to accelerate over the next 24 months.',
    confidence: 'High',
    icon: <FiTrendingUp />,
    accent: 'growth'
  },
  {
    id: 'saturation',
    type: 'Saturation Alert',
    summary: 'Natural Language Processing models nearing theoretical architectural limits.',
    confidence: 'Medium',
    icon: <FiAlertTriangle />,
    accent: 'warning'
  },
  {
    id: 'synergy',
    type: 'Cross-domain Synergy',
    summary: 'AI methodologies increasingly intersecting with advanced materials science.',
    confidence: 'High',
    icon: <FiShare2 />,
    accent: 'innovation'
  }
];

export default function FutureInsightsSection() {
  return (
    <div className="future-insights-wrapper" aria-label="Future Insights Section">
      <DashboardGrid columns={3}>
        {INSIGHTS_DATA.map(insight => (
          <div key={insight.id} className={`insight-card insight-accent-${insight.accent}`}>
            <div className="insight-card-header">
              <div className="insight-icon-container">
                {insight.icon}
              </div>
              <h3 className="insight-card-title">{insight.type}</h3>
            </div>
            
            <div className="insight-card-body">
              <p className="insight-summary">{insight.summary}</p>
            </div>
            
            <div className="insight-card-footer">
              <span className="insight-confidence-label">Confidence:</span>
              <span className={`insight-confidence-value confidence-${insight.confidence.toLowerCase()}`}>
                {insight.confidence}
              </span>
            </div>
          </div>
        ))}
      </DashboardGrid>
    </div>
  );
}
