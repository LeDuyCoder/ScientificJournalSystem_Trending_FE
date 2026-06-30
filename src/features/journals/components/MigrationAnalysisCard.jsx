import React from 'react';
import Card from '../../../shared/components/common/Card';

const PeriodBadge = () => (
  <div className="mac-badge">
    2024–<br/>2026
  </div>
);

const MigrationAnalysisCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card 
      title="Migration Analysis" 
      subtitle="Subscription to Open Access Transition" 
      actions={<PeriodBadge />}
      className="mac-card"
    >
      <div className="mac-content">
        <div className="mac-chart-container" aria-label="Migration Analysis Flow Chart">
          <svg viewBox="0 0 400 300" className="mac-svg" preserveAspectRatio="xMidYMid meet">
            <path className="mac-link-orange" d="M 100 30 C 200 30, 200 30, 300 30 L 300 100 C 200 100, 200 100, 100 100 Z" />
            <path className="mac-link-gray" d="M 100 100 C 200 100, 200 180, 300 180 L 300 220 C 200 220, 200 140, 100 140 Z" />
            <path className="mac-link-orange" d="M 100 160 C 200 160, 200 100, 300 100 L 300 150 C 200 150, 200 185, 100 185 Z" />
            <path className="mac-link-gray" d="M 100 185 C 200 185, 200 220, 300 220 L 300 240 C 200 240, 200 205, 100 205 Z" />

            <rect x="20" y="30" width="80" height="110" className="mac-node mac-node-sub" />
            <foreignObject x="20" y="30" width="80" height="110">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">SUBSCRIPTION</span>
              </div>
            </foreignObject>

            <rect x="20" y="160" width="80" height="45" className="mac-node mac-node-hyb" />
            <foreignObject x="20" y="160" width="80" height="45">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">HYBRID</span>
              </div>
            </foreignObject>

            <rect x="300" y="30" width="80" height="120" className="mac-node mac-node-foa" />
            <foreignObject x="300" y="30" width="80" height="120">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">FULL OPEN ACCESS</span>
              </div>
            </foreignObject>

            <rect x="300" y="180" width="80" height="60" className="mac-node mac-node-leg" />
            <foreignObject x="300" y="180" width="80" height="60">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-dark">LEGACY MODEL</span>
              </div>
            </foreignObject>
          </svg>
        </div>
        <div className="mac-footer">
          <span className="mac-footer-metric">TOTAL: {data.total}</span>
          <span className="mac-footer-metric">TRANSITION RATE: +{data.transitionRate}%</span>
        </div>
      </div>
    </Card>
  );
};

export default MigrationAnalysisCard;
