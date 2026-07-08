import React from 'react';

export default function MapLegend() {
  return (
    <div className="map-legend-card">
      <div className="legend-title">Activity Density</div>
      <div className="legend-gradient-bar" />
      <div className="legend-labels">
        <span>Low</span>
        <span>Peak</span>
      </div>
    </div>
  );
}
