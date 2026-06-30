import React from 'react';
import GlobalStatsSection from '../components/GlobalStatsSection';
import GlobalHeatMapSection from '../components/GlobalHeatMapSection';
import ResearchLandscapeCard from '../components/ResearchLandscapeCard';
import TopEntitiesCard from '../components/TopEntitiesCard';
import ImpactQuartilesCard from '../components/ImpactQuartilesCard';
import { useGlobalEcosystemData } from '../hooks/useGlobalEcosystemData';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
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
  const { filters } = useDashboardContext();
  const { data, loading, error } = useGlobalEcosystemData(filters);

  if (loading && !data) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>Loading Global Ecosystem...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5' }}>
        <div>Unable to load global ecosystem data. Try again later.</div>
      </div>
    );
  }

  return (
    <div className="global-ecosystem-dashboard">
      <GlobalStatsSection stats={data?.kpiStats} />

      <div className="ecosystem-main-layout">
        <div className="ecosystem-left-col">
          <GlobalHeatMapSection data={data?.heatMapData} />
        </div>
        <div className="ecosystem-right-col">
          <ResearchLandscapeCard data={data?.landscapeData} />
          <TopEntitiesCard title="Top Entities" items={data?.topEntitiesData} />
          <ImpactQuartilesCard 
            title="Impact Quartiles" 
            description="Ratio of publications in top 25% of citation rankings"
            percentage={65}
            label="Q1"
          />
        </div>
      </div>
    </div>
  );
}
