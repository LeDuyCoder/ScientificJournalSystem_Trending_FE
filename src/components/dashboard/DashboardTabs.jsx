import './DashboardTabs.css';

export default function DashboardTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="dashboard-tabs-container">
      <div className="dashboard-tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`dashboard-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="dashboard-tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
