import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardGrid from '../components/layout/DashboardGrid';
import LayoutSection from '../components/layout/LayoutSection';
import Card from '../components/common/Card';

export default function DashboardDemo() {
  const headerContent = (
    <LayoutSection title="Dashboard Overview">
      <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-surface)', border: 'var(--border-light)', borderRadius: 'var(--radius-md)' }}>
        Header Area Content
      </div>
    </LayoutSection>
  );

  const filtersContent = (
    <LayoutSection>
      <div style={{ padding: 'var(--spacing-sm)', background: 'var(--color-surface)', border: 'var(--border-light)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--spacing-md)' }}>
        <select style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}><option>All Time</option></select>
        <select style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}><option>All Categories</option></select>
        <span>Filters Area</span>
      </div>
    </LayoutSection>
  );

  const footerContent = (
    <LayoutSection>
      <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--color-neutral-600)' }}>
        Footer Area - System Status: Online
      </div>
    </LayoutSection>
  );

  return (
    <DashboardLayout
      header={headerContent}
      filters={filtersContent}
      footer={footerContent}
    >
      <LayoutSection title="Analytics Grid">
        <DashboardGrid columns={2}>
          <Card title="Total Users" subtitle="Active in last 30 days" actions={<button>Details</button>}>
            <div style={{ fontSize: 'var(--font-size-page-title)', fontWeight: 'var(--font-weight-bold)' }}>12,345</div>
            <div style={{ color: 'var(--color-chart-2)', marginTop: 'var(--spacing-sm)' }}>+15% from last month</div>
          </Card>
          
          <Card title="Revenue" subtitle="Current Quarter" actions={<button>Export</button>}>
            <div style={{ fontSize: 'var(--font-size-page-title)', fontWeight: 'var(--font-weight-bold)' }}>$84,590</div>
            <div style={{ color: 'var(--color-chart-2)', marginTop: 'var(--spacing-sm)' }}>+8% from last month</div>
          </Card>
          
          <Card title="Conversion Rate" subtitle="Checkout completions">
            <div style={{ fontSize: 'var(--font-size-page-title)', fontWeight: 'var(--font-weight-bold)' }}>3.2%</div>
            <div style={{ color: 'var(--color-chart-5)', marginTop: 'var(--spacing-sm)' }}>-0.4% from last month</div>
          </Card>
          
          <Card title="Active Sessions" subtitle="Currently online">
            <div style={{ fontSize: 'var(--font-size-page-title)', fontWeight: 'var(--font-weight-bold)' }}>1,024</div>
            <div style={{ color: 'var(--color-chart-1)', marginTop: 'var(--spacing-sm)' }}>Peak traffic</div>
          </Card>
        </DashboardGrid>
      </LayoutSection>

      <LayoutSection title="Insights Area">
        <Card title="Weekly Trends">
          <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-neutral-50)', border: 'var(--border-light)', borderStyle: 'dashed', borderRadius: 'var(--radius-sm)' }}>
            [Chart Placeholder]
          </div>
        </Card>
      </LayoutSection>
      
    </DashboardLayout>
  );
}
