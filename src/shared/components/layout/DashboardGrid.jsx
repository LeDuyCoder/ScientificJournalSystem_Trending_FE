import React from 'react';
import './layout.css';

/**
 * DashboardGrid provides a reusable grid system for analytics modules and widgets.
 * Responsive: configured columns on Desktop, fewer on Tablet, 1 col on Mobile.
 */
export default function DashboardGrid({ children, columns = 2, className = '' }) {
  return (
    <div className={`dashboard-grid dashboard-grid-cols-${columns} ${className}`}>
      {children}
    </div>
  );
}
