import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { useTopEntities } from '../hooks/useTopEntities';
import { mapFiltersToQueryParams } from '../services/globalEcosystem.service';
import LoadingSkeleton from '../../../shared/components/common/LoadingSkeleton';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

export default function TopEntitiesCard() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const queryParams = mapFiltersToQueryParams(filters);
  const { data: items = [], isLoading, error } = useTopEntities(projectId, { limit: 4, filters: queryParams, refreshTrigger });

  if (isLoading) {
    return (
      <div className="ranking-list-container dashboard-card">
        <div className="ranking-list-header">
          <h3 className="ranking-list-title">{t('dashboard.topEntities', 'Top Entities')}</h3>
        </div>
        <LoadingSkeleton height="150px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ranking-list-container dashboard-card">
        <InlineErrorState 
          message={t('dashboard.topEntitiesError', 'Failed to load top entities')}
          onRetry={refreshData}
        />
      </div>
    );
  }

  const maxValue = items.length > 0 ? Math.max(...items.map(item => item.value)) : 1;

  return (
    <div className="ranking-list-container dashboard-card">
      <div className="ranking-list-header">
        <h3 className="ranking-list-title">{t('dashboard.topEntities', 'Top Entities')}</h3>
      </div>
      
      <div className="ranking-list-content">
        {items.map((item, index) => (
          <div key={index} className="ranking-item">
            <div className="ranking-item-info">
              <span className="ranking-item-name">{item.name}</span>
              <span className="ranking-item-value">{item.displayValue}</span>
            </div>
            <div className="ranking-item-bar-container">
              <div 
                className="ranking-item-bar" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
