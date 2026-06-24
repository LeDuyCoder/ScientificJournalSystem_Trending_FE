import React from 'react';
import DashboardSection from '../layout/DashboardSection';
import AnalyticsDashboard from '../layout/AnalyticsDashboard';
import FutureInsightsSection from './FutureInsightsSection';
import DashboardFilters from '../layout/DashboardFilters';
import { useDashboardContext } from '../../contexts/DashboardContext';
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

export default function OverviewDashboardContent() {
  const { loading, error, dashboardData } = useDashboardContext();

  const renderContent = () => {
    if (loading && !dashboardData) {
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
      {/* 2. Filter Control Section */}
      <DashboardFilters />

      {renderContent()}
    </>
  );
}
