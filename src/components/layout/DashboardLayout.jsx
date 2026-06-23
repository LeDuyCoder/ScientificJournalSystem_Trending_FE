import React from 'react';
import './layout.css';

/**
 * DashboardLayout provides the foundational vertical stacking for dashboard sections.
 * Ensures consistent spacing between Header, Filters, Analytics, etc.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}
