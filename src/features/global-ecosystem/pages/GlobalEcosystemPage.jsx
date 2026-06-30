import React from 'react';
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
  const { projectId, filters, refreshTrigger } = useDashboardContext();
  const queryParams = mapFiltersToQueryParams(filters);

  const { data: kpiStats, isLoading: isStatsLoading, error: statsError } = useDashboardStatsQuery(projectId, refreshTrigger);
  const { data: heatMapData, isLoading: isGeoLoading, error: geoError } = useGeoDistribution(projectId, queryParams, refreshTrigger);
  const { data: landscapeData, isLoading: isLandscapeLoading, error: landscapeError } = useDistribution(projectId, queryParams, refreshTrigger);
  const { data: topEntitiesData, isLoading: isTopEntitiesLoading, error: topEntitiesError } = useTopEntities(projectId, { limit: 4, filters: queryParams, refreshTrigger });
  const { data: quartilesData, isLoading: isQuartilesLoading, error: quartilesError } = useQuartiles(projectId, queryParams, refreshTrigger);

  const isLoading = isStatsLoading || isGeoLoading || isLandscapeLoading || isTopEntitiesLoading || isQuartilesLoading;
  const hasError = statsError || geoError || landscapeError || topEntitiesError || quartilesError;

  if (isLoading) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>Loading Global Ecosystem...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5' }}>
        <div>Unable to load global ecosystem data. Try again later.</div>
      </div>
    );
  }

  return (
    <div className="global-ecosystem-dashboard">
      <GlobalStatsSection stats={kpiStats} />

      <div className="ecosystem-main-layout">
        <div className="ecosystem-left-col">
          <GlobalHeatMapSection data={heatMapData} />
        </div>
        <div className="ecosystem-right-col">
          <ResearchLandscapeCard data={landscapeData} />
          <TopEntitiesCard title="Top Entities" items={topEntitiesData} />
          <ImpactQuartilesCard 
            title="Impact Quartiles" 
            description={quartilesData 
              ? `Highest concentration is in ${quartilesData.highestGroup.group} (${quartilesData.totalJournals} total journals)` 
              : "Ratio of publications in top 25% of citation rankings"
            }
            percentage={quartilesData?.percentage ?? 0}
            label={quartilesData?.label ?? "-"}
          />
        </div>
      </div>
    </div>
  );
}
