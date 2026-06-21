import React from 'react';
import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardSection from '../components/layout/DashboardSection';
import DashboardGrid from '../components/layout/DashboardGrid';

export default function Dashboard() {
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

  return (
    <DashboardContainer>
      <DashboardLayout>
        {/* 1. Header Section */}
        <DashboardSection className="dashboard-header-section">
          <div style={{ ...placeholderStyle, height: '80px', padding: 'var(--spacing-md)' }}>
            Header Section Placeholder
          </div>
        </DashboardSection>

        {/* 2. Filter Control Section */}
        <DashboardSection className="dashboard-filter-section">
          <div style={{ ...placeholderStyle, height: '60px', padding: 'var(--spacing-md)' }}>
            Filter Control Section Placeholder
          </div>
        </DashboardSection>

        {/* 3. Analytics Dashboard Section */}
        <DashboardSection title="Analytics Dashboard" className="dashboard-analytics-section">
          <DashboardGrid columns={4}>
            <div style={{ ...placeholderStyle, height: '140px' }}>Widget Placeholder</div>
            <div style={{ ...placeholderStyle, height: '140px' }}>Widget Placeholder</div>
            <div style={{ ...placeholderStyle, height: '140px' }}>Widget Placeholder</div>
            <div style={{ ...placeholderStyle, height: '140px' }}>Widget Placeholder</div>
          </DashboardGrid>
        </DashboardSection>

        {/* 4. Insights Section */}
        <DashboardSection title="Insights" className="dashboard-insights-section">
          <DashboardGrid columns={2}>
            <div style={{ ...placeholderStyle, height: '350px' }}>Chart Placeholder</div>
            <div style={{ ...placeholderStyle, height: '350px' }}>Chart Placeholder</div>
          </DashboardGrid>
        </DashboardSection>

        {/* 5. Footer Section */}
        <DashboardSection className="dashboard-footer-section">
          <div style={{ ...placeholderStyle, height: '60px', borderStyle: 'solid', background: 'var(--color-neutral-100)' }}>
            Footer Section Placeholder
          </div>
        </DashboardSection>

      </DashboardLayout>
    </DashboardContainer>
  );
}
