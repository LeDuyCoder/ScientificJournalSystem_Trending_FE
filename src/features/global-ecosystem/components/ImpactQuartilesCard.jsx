import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { useQuartiles } from '../hooks/useQuartiles';
import { mapFiltersToQueryParams } from '../services/globalEcosystem.service';
import LoadingSkeleton from '../../../shared/components/common/LoadingSkeleton';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

export default function ImpactQuartilesCard() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const queryParams = mapFiltersToQueryParams(filters);
  const { data: quartilesData, isLoading, error } = useQuartiles(projectId, queryParams, refreshTrigger);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  if (isLoading) {
    return (
      <div className="donut-chart-container dashboard-card">
        <div className="donut-chart-info">
          <h3 className="donut-chart-title">{t('dashboard.impactQuartiles', 'Impact Quartiles')}</h3>
        </div>
        <LoadingSkeleton height="150px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="donut-chart-container dashboard-card">
        <InlineErrorState 
          message={t('dashboard.quartilesError', 'Failed to load impact quartiles')}
          onRetry={refreshData}
        />
      </div>
    );
  }

  const percentage = quartilesData?.percentage ?? 0;
  const label = quartilesData?.label ?? "-";
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const description = quartilesData 
    ? t('dashboard.quartilesDescDynamic', { 
        group: quartilesData.highestGroup.group, 
        total: quartilesData.totalJournals,
        defaultValue: `Highest concentration is in ${quartilesData.highestGroup.group} (${quartilesData.totalJournals} total journals)`
      })
    : t('dashboard.quartilesDescStatic', 'Ratio of publications in top 25% of citation rankings');

  return (
    <div className="donut-chart-container dashboard-card">
      <div className="donut-chart-info">
        <h3 className="donut-chart-title">{t('dashboard.impactQuartiles', 'Impact Quartiles')}</h3>
        <p className="donut-chart-description">{description}</p>
      </div>
      
      <div className="donut-chart-visual">
        <svg className="donut-svg" viewBox="0 0 100 100">
          <circle
            className="donut-bg"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeWidth="8"
          />
          <circle
            className="donut-progress"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="donut-chart-label">
          <span className="donut-percentage">{percentage}%</span>
          <span className="donut-text">{label}</span>
        </div>
      </div>
    </div>
  );
}
