import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalStatsSection from '../components/GlobalStatsSection';
import GlobalHeatMapSection from '../components/GlobalHeatMapSection';
import ResearchLandscapeCard from '../components/ResearchLandscapeCard';
import TopEntitiesCard from '../components/TopEntitiesCard';
import ImpactQuartilesCard from '../components/ImpactQuartilesCard';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import { useDashboardStatsQuery } from '../hooks/useDashboardStatsQuery';
import { useGeoDistribution } from '../hooks/useGeoDistribution';
import { useDistribution } from '../hooks/useDistribution';
import { useTopEntities } from '../hooks/useTopEntities';
import { useQuartiles } from '../hooks/useQuartiles';
import { mapFiltersToQueryParams } from '../services/globalEcosystem.service';
import ErrorStateSection from '../../../shared/components/common/ErrorStateSection';
import '../styles/GlobalEcosystemPage.css';

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

export default function GlobalEcosystemPage() {
  const { t } = useTranslation();
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const [selectedGeoCountry, setSelectedGeoCountry] = useState('');
  const queryParams = mapFiltersToQueryParams(filters);

  const { data: kpiStats, isLoading: isStatsLoading, error: statsError } = useDashboardStatsQuery(projectId, refreshTrigger);
  const { data: globalMapData, isLoading: isGeoLoading, error: geoError } = useGeoDistribution(projectId, queryParams, refreshTrigger);
  
  const regionalQueryParams = useMemo(() => ({
    ...queryParams,
    country: selectedGeoCountry
  }), [queryParams, selectedGeoCountry]);
  
  const { data: regionalData, isFetching: isRegionalLoading } = useGeoDistribution(
    projectId,
    regionalQueryParams,
    refreshTrigger
  );

  const { data: landscapeData, isLoading: isLandscapeLoading, error: landscapeError } = useDistribution(projectId, queryParams, refreshTrigger);
  const { data: topEntitiesData, isLoading: isTopEntitiesLoading, error: topEntitiesError } = useTopEntities(projectId, { limit: 4, filters: queryParams, refreshTrigger });
  const { data: quartilesData, isLoading: isQuartilesLoading, error: quartilesError } = useQuartiles(projectId, queryParams, refreshTrigger);

  const isLoading = isStatsLoading || isGeoLoading || isLandscapeLoading || isTopEntitiesLoading || isQuartilesLoading;
  const hasError = statsError || geoError || landscapeError || topEntitiesError || quartilesError;

  if (isLoading) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>{t('common.loading', 'Loading Global Ecosystem...')}</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <ErrorStateSection 
        title={t('common.error', 'Data Loading Failed')}
        message={t('dashboard.loadingFailedDesc', 'Unable to load global ecosystem data. Please check your connection or try again.')}
        onRetry={refreshData}
        minHeight={400}
      />
    );
  }

  return (
    <div className="global-ecosystem-dashboard">
      <GlobalStatsSection stats={kpiStats} />

      <div className="ecosystem-main-layout">
        <div className="ecosystem-left-col">
          <GlobalHeatMapSection
            mapData={globalMapData}
            regionalData={regionalData}
            selectedCountryCode={selectedGeoCountry}
            onCountryChange={setSelectedGeoCountry}
            isGeoLoading={isRegionalLoading && selectedGeoCountry !== ''}
          />
        </div>
        <div className="ecosystem-right-col">
          <ResearchLandscapeCard data={landscapeData} />
          <TopEntitiesCard title={t('dashboard.topEntities', 'Top Entities')} items={topEntitiesData} />
          <ImpactQuartilesCard 
            title={t('dashboard.impactQuartiles', 'Impact Quartiles')} 
            description={quartilesData 
              ? t('dashboard.quartilesDescDynamic', { 
                  group: quartilesData.highestGroup.group, 
                  total: quartilesData.totalJournals,
                  defaultValue: `Highest concentration is in ${quartilesData.highestGroup.group} (${quartilesData.totalJournals} total journals)`
                })
              : t('dashboard.quartilesDescStatic', 'Ratio of publications in top 25% of citation rankings')
            }
            percentage={quartilesData?.percentage ?? 0}
            label={quartilesData?.label ?? "-"}
          />
        </div>
      </div>
    </div>
  );
}
