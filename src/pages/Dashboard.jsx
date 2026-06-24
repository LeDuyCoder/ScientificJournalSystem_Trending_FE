import React, { useState } from 'react';
import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardFooter from '../components/layout/DashboardFooter';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import OverviewDashboardContent from '../components/dashboard/OverviewDashboardContent';
import { DashboardProvider } from '../contexts/DashboardContext';

const dashboardTabs = [
  {
    key: 'overview',
    label: 'Overview'
  }
];

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* 1. Header Section */}
      <DashboardHeader />

      <DashboardContainer>
        <DashboardLayout>
          {/* Dashboard Tabs Navigation */}
          <DashboardTabs 
            tabs={dashboardTabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Render Active Tab Content */}
          {activeTab === 'overview' && <OverviewDashboardContent />}
        </DashboardLayout>
      </DashboardContainer>

      {/* Footer Section */}
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
