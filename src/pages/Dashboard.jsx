import React from 'react';
import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardSection from '../components/layout/DashboardSection';
import DashboardGrid from '../components/layout/DashboardGrid';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardFilters from '../components/layout/DashboardFilters';
import AnalyticsDashboard from '../components/layout/AnalyticsDashboard';
import FutureInsightsSection from '../components/dashboard/FutureInsightsSection';
import DashboardFooter from '../components/layout/DashboardFooter';
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
      <>
        {/* 3. Analytics Dashboard Section */}
        <DashboardSection title="Analytics Dashboard" className="dashboard-analytics-section">
          <AnalyticsDashboard />
        </DashboardSection>

        {/* 4. Insights Section */}
        <DashboardSection title="Future Forecast Insights" className="dashboard-insights-section">
          <FutureInsightsSection />
        </DashboardSection>
      </>
    );
  };

  return (
    <>
      {/* 1. Header Section */}
      <DashboardHeader />

      <DashboardContainer>
        <DashboardLayout>
          {/* 2. Filter Control Section */}
          <DashboardFilters />

          {renderContent()}
        </DashboardLayout>
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
