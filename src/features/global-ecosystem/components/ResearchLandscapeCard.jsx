import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiShare2 } from 'react-icons/fi';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { useDistribution } from '../hooks/useDistribution';
import { mapFiltersToQueryParams } from '../services/globalEcosystem.service';
import LoadingSkeleton from '../../../shared/components/common/LoadingSkeleton';
import InlineErrorState from '../../../shared/components/common/InlineErrorState';

export default function ResearchLandscapeCard() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const queryParams = mapFiltersToQueryParams(filters);
  const { data, isLoading, error } = useDistribution(projectId, queryParams, refreshTrigger);
  
  if (isLoading) {
    return (
      <div className="research-landscape-container dashboard-card">
        <div className="research-landscape-header">
          <div className="header-title-with-icon">
            <FiShare2 className="header-icon" />
            <h3 className="research-landscape-title">{t('dashboard.researchLandscape', 'Research Landscape')}</h3>
          </div>
        </div>
        <LoadingSkeleton height="150px" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="research-landscape-container dashboard-card">
        <InlineErrorState 
          message={t('dashboard.landscapeError', 'Failed to load research landscape')}
          onRetry={refreshData}
        />
      </div>
    );
  }

  const validData = Array.isArray(data) ? data : [];
  
  const getClassForIndex = (index) => {
    const classes = ['biotech', 'ai', 'materials'];
    return classes[index % classes.length];
  };

  return (
    <div className="research-landscape-container dashboard-card">
      <div className="research-landscape-header">
        <div className="header-title-with-icon">
          <FiShare2 className="header-icon" />
          <h3 className="research-landscape-title">{t('dashboard.researchLandscape', 'Research Landscape')}</h3>
        </div>
      </div>
      
      <div className="research-landscape-grid">
        {validData.length > 0 && (
          <div className={`landscape-card ${getClassForIndex(0)}`}>
            <div className="landscape-card-content">
              <span className="landscape-label">{validData[0].name}</span>
              <span className="landscape-value">{validData[0].value}<small>%</small></span>
            </div>
          </div>
        )}
        <div className="landscape-column">
          {validData.slice(1, 3).map((item, index) => (
            <div key={item.name} className={`landscape-card ${getClassForIndex(index + 1)}`}>
              <div className="landscape-card-content">
                <span className="landscape-label">{item.name}</span>
                <span className="landscape-value">{item.value}<small>%</small></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
