import React from 'react';
import './layout.css';

/**
 * LayoutSection is a semantic wrapper for distinct sections within the dashboard
 * (e.g., "Insights Area", "Recent Activity").
 */
const LayoutSection = ({ title, children, action }) => {
  return (
    <section className="layout-section">
      {(title || action) && (
        <div className="layout-section-header">
          {title && <h2 className="layout-section-title">{title}</h2>}
          {action && <div className="layout-section-action">{action}</div>}
        </div>
      )}
      <div className="layout-section-content">
        {children}
      </div>
    </section>
  );
};

export default LayoutSection;
