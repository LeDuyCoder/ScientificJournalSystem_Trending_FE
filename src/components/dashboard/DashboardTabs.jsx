import React from 'react';
import './DashboardTabs.css';

export default function DashboardTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="dashboard-tabs-container" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`dashboard-tab ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onTabChange(tab.key)}
          aria-selected={activeTab === tab.key}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
