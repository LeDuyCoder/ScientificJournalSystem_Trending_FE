import React, { useState } from 'react';
import DashboardContainer from '../components/DashboardContainer';
import DashboardStack from '../../../shared/components/layout/DashboardStack';
import DashboardFilters from '../components/DashboardFilters';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import DashboardTabs from '../components/DashboardTabs';
import GlobalEcosystemPage from '../../global-ecosystem/pages/GlobalEcosystemPage';
import DevelopmentTrendsPage from '../../development-trends/pages/DevelopmentTrendsPage';
import { DashboardProvider, useDashboardContext } from '../contexts/DashboardContext';
import { FiAlertCircle } from 'react-icons/fi';

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
  const { error } = useDashboardContext();
  const [activeTab, setActiveTab] = useState('global-ecosystem');

  const tabs = [
    {
      id: 'global-ecosystem',
      label: 'Global Ecosystem',
      content: <GlobalEcosystemPage />
    },
    {
      id: 'development-trends',
      label: 'Development & Trends',
      content: <DevelopmentTrendsPage />
    }
  ];

  const renderContent = () => {
    if (error) {
      return (
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5' }}>
          <FiAlertCircle size={32} />
          <div>Unable to load dashboard data. Try again later.</div>
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
          <DashboardFilters />
          {renderContent()}
        </DashboardStack>
      </DashboardContainer>

      <DashboardFooter />
    </>
  );
};

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
