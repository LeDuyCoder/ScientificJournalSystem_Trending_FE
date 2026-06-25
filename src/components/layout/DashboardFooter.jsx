import React from 'react';
import './DashboardFooter.css';

export default function DashboardFooter() {
  return (
    <footer className="dashboard-footer">
      <div className="dashboard-footer-left">
        <div className="dashboard-footer-brand">Scientia</div>
        <div className="dashboard-footer-copyright">
          © 2026 Scientia Bibliometric Analytics. All rights reserved.
        </div>
      </div>
      <div className="dashboard-footer-right">
        <a href="#privacy" className="dashboard-footer-link">Privacy Policy</a>
        <a href="#terms" className="dashboard-footer-link">Terms of Service</a>
        <a href="#docs" className="dashboard-footer-link">Documentation</a>
        <a href="#support" className="dashboard-footer-link">Contact Support</a>
      </div>
    </footer>
  );
}
