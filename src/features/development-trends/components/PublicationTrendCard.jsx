import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { usePublicationTrendQuery } from '../hooks/usePublicationTrendQuery';
import LoadingSkeleton from '../../../shared/components/common/LoadingSkeleton';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    return (
      <div className="trend-tooltip">
        <p className="trend-tooltip-year">{label}</p>
        <p className="trend-tooltip-value">
          {t('dashboard.publications', 'Publications')}: <span className="trend-tooltip-number">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PublicationTrendCard() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const { data, isLoading, error } = usePublicationTrendQuery(projectId, filters, refreshTrigger);
  
  if (isLoading) {
    return (
      <div className="analytics-card">
        <div className="analytics-card-header">
          <div className="analytics-card-title-group">
            <h3 className="analytics-card-title">{t('dashboard.publicationTrend', 'Publication Trend')}</h3>
            <p className="analytics-card-subtitle">{t('dashboard.publicationTrendSub', 'Growth of scholarly output over time')}</p>
          </div>
        </div>
        <LoadingSkeleton height="300px" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="analytics-card">
        <InlineErrorState 
          message={t('dashboard.publicationError', 'Failed to load publication trend')}
          onRetry={refreshData}
        />
      </div>
    );
  }

  const chartData = data?.data || [];
  const growthRate = data?.growthRate;
  const unit = data?.unit || 'YoY';
  
  const yoyText = growthRate !== undefined && growthRate !== null
    ? (growthRate >= 0 ? `+${growthRate}% ${unit}` : `${growthRate}% ${unit}`)
    : null;

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div className="analytics-card-title-group">
          <h3 className="analytics-card-title">
            {t('dashboard.publicationTrend', 'Publication Trend')}
            {yoyText && <span className="yoy-badge">{yoyText}</span>}
          </h3>
          <p className="analytics-card-subtitle">{t('dashboard.publicationTrendSub', 'Growth of scholarly output over time')}</p>
        </div>
      </div>
      <div className="analytics-card-body">
        {chartData.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-body)' }}>
            {t('dashboard.noDataForFilters', 'No data matches the current filters.')}
          </div>
        ) : (
          <div className="publication-trend-chart-wrapper" aria-label="Publication Trend Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPublications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary-orange)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary-orange)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-200)" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-neutral-500)', fontSize: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-neutral-500)', fontSize: 10 }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-neutral-300)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-primary-orange)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPublications)" 
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
