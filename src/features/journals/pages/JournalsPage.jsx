import React from 'react';
import DashboardContainer from '../../dashboard/components/DashboardContainer';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import TopJournalRankingCard from '../components/TopJournalRankingCard';
import QuartileDistributionCard from '../components/QuartileDistributionCard';
import ImpactMatrixCard from '../components/ImpactMatrixCard';
import MigrationAnalysisCard from '../components/MigrationAnalysisCard';
import { useJournalsData } from '../hooks/useJournalsData';
import '../styles/JournalsPage.css';

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

export default function JournalsPage() {
  const { data, loading, error, topRanking, quartile, impactMatrix, migration, refetch } = useJournalsData();

  if (loading && !data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '24px' }}>
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          <div>Loading Journals...</div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '24px' }}>
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5' }}>
          <div>Unable to load journals data. Try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="journals-page" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <DashboardContainer>
        <DashboardGrid columns={2}>
          <QuartileDistributionCard 
            data={quartile.data} 
            loading={quartile.loading} 
            error={quartile.error} 
          />
          <TopJournalRankingCard 
            data={topRanking.data} 
            loading={topRanking.loading} 
            error={topRanking.error} 
          />
          <ImpactMatrixCard 
            data={impactMatrix.data} 
            loading={impactMatrix.loading} 
            error={impactMatrix.error} 
          />
          <MigrationAnalysisCard 
            data={migration.data}
            isLoading={migration.loading}
            error={migration.error}
            onRetry={refetch}
          />
        </DashboardGrid>
      </DashboardContainer>
    </div>
  );
}
