import React from 'react';
import '../../../shared/components/layout/layout.css';

/**
 * DashboardContainer wraps the entire dashboard page.
 * It ensures the dashboard has a max-width and is centered horizontally.
 */
export default function DashboardContainer({ children }) {
  return (
    <div className="dashboard-container">
      {children}
    </div>
  );
}
