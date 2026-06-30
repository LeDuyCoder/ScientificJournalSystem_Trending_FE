import React from 'react';
import '../styles/DashboardTabs.css';

/**
 * DashboardTabs orchestrates tab routing/display logic.
 * Expects an array of tab objects: { id, label, content }.
 */
export default function DashboardTabs({ tabs, activeTab, onTabChange }) {
  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <div className="dashboard-tabs-container">
      <div className="dashboard-tabs-header" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`dashboard-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="dashboard-tab-content" role="tabpanel">
        {currentTab?.content}
      </div>
    </div>
  );
}
