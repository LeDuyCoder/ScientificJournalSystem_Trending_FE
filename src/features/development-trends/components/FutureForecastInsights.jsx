import React from 'react';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import { FiTrendingUp, FiAlertTriangle, FiShare2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { useForecastInsightsQuery } from '../hooks/useForecastInsightsQuery';
import LoadingSkeleton from '../../../shared/components/common/LoadingSkeleton';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

const getIcon = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('peak')) return <FiTrendingUp />;
  if (t.includes('saturation') || t.includes('alert')) return <FiAlertTriangle />;
  if (t.includes('synergy') || t.includes('cross_domain')) return <FiShare2 />;
  return <FiTrendingUp />;
};

const getAccent = (type) => {
  const t = String(type || '').toLowerCase();
  if (t.includes('peak')) return 'growth';
  if (t.includes('saturation') || t.includes('alert')) return 'warning';
  if (t.includes('synergy') || t.includes('cross_domain')) return 'innovation';
  return 'growth';
};

export default function FutureForecastInsights() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const { data, isLoading, error } = useForecastInsightsQuery(projectId, filters, refreshTrigger);

  if (isLoading) {
    return (
      <div className="future-insights-wrapper" aria-label="Future Insights Section">
        <DashboardGrid columns={3}>
          <div className="insight-card"><LoadingSkeleton height="150px" /></div>
          <div className="insight-card"><LoadingSkeleton height="150px" /></div>
          <div className="insight-card"><LoadingSkeleton height="150px" /></div>
        </DashboardGrid>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="future-insights-wrapper">
        <InlineErrorState 
          message={t('dashboard.forecastError', 'Failed to load forecast insights')}
          onRetry={refreshData}
        />
      </div>
    );
  }

  const insights = data || [];

  if (insights.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', background: 'var(--color-surface)', border: 'var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-body)' }}>
        {t('dashboard.noDataForFilters', 'No data matches the current filters.')}
      </div>
    );
  }

  return (
    <div className="future-insights-wrapper" aria-label="Future Insights Section">
      <DashboardGrid columns={3}>
        {insights.map((insight, idx) => {
          const accent = getAccent(insight.type);
          return (
            <div key={idx} className={`insight-card insight-accent-${accent}`}>
              <div className="insight-icon-container">
                {getIcon(insight.type)}
              </div>
              <div className="insight-card-header">
                <h3 className="insight-card-title">{insight.title}</h3>
              </div>
              <div className="insight-card-body">
                <p className="insight-summary">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </DashboardGrid>
    </div>
  );
}
