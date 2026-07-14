import React from 'react';
import './layout.css';

/**
 * DashboardSection is a semantic wrapper for distinct sections within the dashboard
 * (e.g., "Analytics Area", "Insights").
 */
export default function DashboardSection({ title, children, action, className = '' }) {
  return (
    <section className={`dashboard-section ${className}`}>
      {(title || action) && (
        <div className="dashboard-section-header">
          {title && <h2 className="dashboard-section-title">{title}</h2>}
          {action && <div className="dashboard-section-action">{action}</div>}
        </div>
      )}
      <div className="dashboard-section-content">
        {children}
      </div>
    </section>
  );
}
