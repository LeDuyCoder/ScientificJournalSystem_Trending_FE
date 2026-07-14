import React from 'react';
import './layout.css';

/**
 * DashboardStack provides the foundational vertical stacking for dashboard sections.
 * Ensures consistent spacing between Filters, Analytics, etc.
 */
export default function DashboardStack({ children }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}
