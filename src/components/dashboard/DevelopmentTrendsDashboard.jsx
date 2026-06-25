import React from 'react';
import AnalyticsDashboard from '../layout/AnalyticsDashboard';
import FutureInsightsSection from './FutureInsightsSection';
import DashboardSection from '../layout/DashboardSection';

export default function DevelopmentTrendsDashboard() {
  return (
    <>
      <DashboardSection title="Analytics Dashboard" className="dashboard-analytics-section">
        <AnalyticsDashboard />
      </DashboardSection>

      <DashboardSection title="Future Forecast Insights" className="dashboard-insights-section">
        <FutureInsightsSection />
      </DashboardSection>
    </>
  );
}
