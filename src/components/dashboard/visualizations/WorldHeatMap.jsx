import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './WorldHeatMap.css';

export default function WorldHeatMap({ data = [] }) {
  // Hardcoded coordinates for the map projection to match country names
  const countryCoordinates = {
    'US': { cx: 200, cy: 150 },
    'China': { cx: 620, cy: 160 },
    'Germany': { cx: 420, cy: 110 },
    'UK': { cx: 390, cy: 100 },
    'Japan': { cx: 680, cy: 150 },
    'France': { cx: 400, cy: 120 },
    'Canada': { cx: 180, cy: 90 },
    'Australia': { cx: 650, cy: 280 },
    'India': { cx: 560, cy: 180 }
  };

  return (
    <div className="world-heatmap-container dashboard-card">
      <div className="world-heatmap-header">
        <div>
          <h2 className="world-heatmap-title">Geographical Heat Map</h2>
          <p className="world-heatmap-subtitle">Global research output intensity by jurisdiction</p>
        </div>
        <div className="world-heatmap-actions">
          <button className="icon-button" aria-label="Search">
            <FiSearch />
          </button>
          <button className="icon-button" aria-label="Filter">
            <FiFilter />
          </button>
        </div>
      </div>
      
      <div className="world-heatmap-content">
        <div className="mock-map">
          <div className="map-placeholder">
            <svg viewBox="0 0 800 400" className="map-svg" preserveAspectRatio="xMidYMid meet">
              <rect width="100%" height="100%" fill="#4B5563" />
              {/* Realistic SVG World Map paths would go here. We use a stylized abstract representation for the mockup */}
              <path d="M 120 40 Q 300 20 400 100 T 700 150 Q 600 300 400 350 T 150 250 Z" fill="#6B7280" opacity="0.4" />
              <path d="M 100 250 Q 200 300 250 350 T 200 380 Q 150 350 100 300 Z" fill="#6B7280" opacity="0.4" />
              <path d="M 500 200 Q 600 250 700 350 T 550 380 Q 450 300 400 250 Z" fill="#6B7280" opacity="0.4" />

              {/* Dynamic Heat spots based on data prop */}
              {data.map((item) => {
                const coords = countryCoordinates[item.country];
                if (!coords) return null;
                // Calculate size and opacity based on intensity
                const radius = (item.intensity / 100) * 25;
                const opacity = (item.intensity / 100) * 0.8 + 0.2;
                
                return (
                  <g key={item.country}>
                    <circle 
                      cx={coords.cx} 
                      cy={coords.cy} 
                      r={radius} 
                      fill="#F97316" 
                      opacity={opacity} 
                    />
                    <circle 
                      cx={coords.cx} 
                      cy={coords.cy} 
                      r={radius / 3} 
                      fill="#FFFFFF" 
                      opacity="0.8" 
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="activity-density-legend">
            <span className="legend-title">ACTIVITY DENSITY</span>
            <div className="legend-gradient">
              <div className="gradient-step" style={{ background: '#FDBA74' }}></div>
              <div className="gradient-step" style={{ background: '#FB923C' }}></div>
              <div className="gradient-step" style={{ background: '#F97316' }}></div>
              <div className="gradient-step" style={{ background: '#EA580C' }}></div>
            </div>
            <div className="legend-labels">
              <span>LOW</span>
              <span>PEAK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
