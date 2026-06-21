import React from 'react';
import './layout.css';

/**
 * DashboardLayout provides the foundational layout wrapper for all dashboard modules.
 * Ensures consistent max-width, spacing, and alignment beside the Sidebar.
 */
const DashboardLayout = ({ children, header, filters, footer }) => {
  return (
    <div className="dashboard-layout">
      {header && <div className="dashboard-header-area">{header}</div>}
      
      {filters && <div className="dashboard-filters-area">{filters}</div>}
      
      <div className="dashboard-content-area">
        {children}
      </div>
      
      {footer && <div className="dashboard-footer-area">{footer}</div>}
    </div>
  );
};

export default DashboardLayout;
