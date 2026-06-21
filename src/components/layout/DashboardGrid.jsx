import React from 'react';
import './layout.css';

/**
 * DashboardGrid provides the reusable 2x2 grid system for analytics modules.
 * Responsive: 2 cols on Desktop/Tablet, 1 col on Mobile.
 */
const DashboardGrid = ({ children, columns = 2 }) => {
  return (
    <div className={`dashboard-grid dashboard-grid-cols-${columns}`}>
      {children}
    </div>
  );
};

export default DashboardGrid;
