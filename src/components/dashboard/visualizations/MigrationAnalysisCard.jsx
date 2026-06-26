import React from 'react';
import Card from '../../common/Card';
import './MigrationAnalysisCard.css';

// Using the provided mock data strictly
const migrationAnalysis = {
  period: "2024-2026",
  total: 842,
  transitionRate: 12.4,
  nodes: [
    { id: "subscription", label: "SUBSCRIPTION" },
    { id: "hybrid", label: "HYBRID" },
    { id: "fullOpenAccess", label: "FULL OPEN ACCESS" },
    { id: "legacyModel", label: "LEGACY MODEL" }
  ],
  links: [
    { source: "subscription", target: "fullOpenAccess", value: 420 },
    { source: "subscription", target: "legacyModel", value: 260 },
    { source: "hybrid", target: "fullOpenAccess", value: 110 },
    { source: "hybrid", target: "legacyModel", value: 52 }
  ]
};

// Reusable Top-Right Badge
const PeriodBadge = () => (
  <div className="mac-badge">
    2024–<br/>2026
  </div>
);

/**
 * MigrationAnalysisCard renders a static Sankey-style visualization
 * matching the Scientia Dashboard mockup without a dynamic algorithm.
 */
const MigrationAnalysisCard = () => {
  return (
    <Card 
      title="Migration Analysis" 
      subtitle="Subscription to Open Access Transition" 
      actions={<PeriodBadge />}
      className="mac-card"
    >
      <div className="mac-content">
        
        {/* Flow Container */}
        <div className="mac-chart-container" aria-label="Migration Analysis Flow Chart">
          {/* Using a 400x300 viewBox to maintain perfect proportions responsively */}
          <svg viewBox="0 0 400 300" className="mac-svg" preserveAspectRatio="xMidYMid meet">
            
            {/* Flow Connections (Drawn first to sit behind nodes) */}
            
            {/* Subscription -> Full Open Access */}
            <path 
              className="mac-link-orange" 
              d="M 100 30 C 200 30, 200 30, 300 30 L 300 100 C 200 100, 200 100, 100 100 Z" 
            />
            
            {/* Subscription -> Legacy Model */}
            <path 
              className="mac-link-gray" 
              d="M 100 100 C 200 100, 200 180, 300 180 L 300 220 C 200 220, 200 140, 100 140 Z" 
            />
            
            {/* Hybrid -> Full Open Access */}
            <path 
              className="mac-link-orange" 
              d="M 100 160 C 200 160, 200 100, 300 100 L 300 150 C 200 150, 200 185, 100 185 Z" 
            />
            
            {/* Hybrid -> Legacy Model */}
            <path 
              className="mac-link-gray" 
              d="M 100 185 C 200 185, 200 220, 300 220 L 300 240 C 200 240, 200 205, 100 205 Z" 
            />

            {/* Nodes */}
            
            {/* SUBSCRIPTION Node (Left, Top) */}
            <rect x="20" y="30" width="80" height="110" className="mac-node mac-node-sub" />
            <foreignObject x="20" y="30" width="80" height="110">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">SUBSCRIPTION</span>
              </div>
            </foreignObject>

            {/* HYBRID Node (Left, Bottom) */}
            <rect x="20" y="160" width="80" height="45" className="mac-node mac-node-hyb" />
            <foreignObject x="20" y="160" width="80" height="45">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">HYBRID</span>
              </div>
            </foreignObject>

            {/* FULL OPEN ACCESS Node (Right, Top) */}
            <rect x="300" y="30" width="80" height="120" className="mac-node mac-node-foa" />
            <foreignObject x="300" y="30" width="80" height="120">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-light">FULL OPEN ACCESS</span>
              </div>
            </foreignObject>

            {/* LEGACY MODEL Node (Right, Bottom) */}
            <rect x="300" y="180" width="80" height="60" className="mac-node mac-node-leg" />
            <foreignObject x="300" y="180" width="80" height="60">
              <div className="mac-node-html">
                <span className="mac-node-text mac-text-dark">LEGACY MODEL</span>
              </div>
            </foreignObject>

          </svg>
        </div>

        {/* Footer Metrics */}
        <div className="mac-footer">
          <span className="mac-footer-metric">TOTAL: {migrationAnalysis.total}</span>
          <span className="mac-footer-metric">TRANSITION RATE: +{migrationAnalysis.transitionRate}%</span>
        </div>

      </div>
    </Card>
  );
};

export default MigrationAnalysisCard;
