import React, { useState } from 'react';
import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardStack from '../components/layout/DashboardStack';
import DashboardFilters from '../components/layout/DashboardFilters';
import DashboardFooter from '../components/layout/DashboardFooter';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import GlobalEcosystemDashboard from '../components/dashboard/GlobalEcosystemDashboard';
import DevelopmentTrendsDashboard from '../components/dashboard/DevelopmentTrendsDashboard';
import { DashboardProvider, useDashboardContext } from '../contexts/DashboardContext';
import { FiAlertCircle, FiInbox } from 'react-icons/fi';

const placeholderStyle = {
  background: 'var(--color-surface)',
  border: 'var(--border-light)',
  borderStyle: 'dashed',
  borderRadius: 'var(--radius-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-neutral-500)',
  fontSize: 'var(--font-size-body)',
};

const DashboardContent = () => {
  const { loading, error, dashboardData } = useDashboardContext();
  const [activeTab, setActiveTab] = useState('global-ecosystem');

  const tabs = [
    {
      id: 'global-ecosystem',
      label: 'Global Ecosystem',
      content: <GlobalEcosystemDashboard />
    },
    {
      id: 'development-trends',
      label: 'Development & Trends',
      content: <DevelopmentTrendsDashboard />
    }
  ];

  const renderContent = () => {
    if (loading && !dashboardData) {
      // Only show global loading if we don't have initial data.
      // If we have data, we'll let the button show the loading state to avoid layout thrashing.
      return (
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          <div>Loading Dashboard...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5' }}>
          <FiAlertCircle size={32} />
          <div>Unable to load dashboard data. Try again later.</div>
        </div>
      );
    }

    if (!dashboardData) {
      return (
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
          <FiInbox size={32} />
          <div>No dashboard data available.</div>
        </div>
      );
    }

    return (
      <DashboardTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    );
  };

  return (
    <>
      <DashboardContainer>
        <DashboardStack>
          {/* 2. Filter Control Section */}
          <DashboardFilters />

          {renderContent()}
        </DashboardStack>
      </DashboardContainer>

      {/* 5. Footer Section */}
      <DashboardFooter />
    </>
  );
};

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
