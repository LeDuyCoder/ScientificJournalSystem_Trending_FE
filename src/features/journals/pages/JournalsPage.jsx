import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardContainer from '../../dashboard/components/DashboardContainer';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import TopJournalRankingCard from '../components/TopJournalRankingCard';
import QuartileDistributionCard from '../components/QuartileDistributionCard';
import ImpactMatrixCard from '../components/ImpactMatrixCard';
import MigrationAnalysisCard from '../components/MigrationAnalysisCard';
import { useJournalsData } from '../hooks/useJournalsData';
import ErrorStateSection from '../../../shared/components/common/ErrorStateSection';
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
  const { t } = useTranslation();
  const { data, loading, error, topRanking, quartile, impactMatrix, migration, refetch } = useJournalsData();

  const isAnyLoading = loading || topRanking.loading || quartile.loading || impactMatrix.loading || migration.loading;
  
  if (isAnyLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '24px' }}>
        <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          <div>{t('common.loading', 'Loading Journals...')}</div>
        </div>
      </div>
    );
  }

  const hasAnyError = error || topRanking.error || quartile.error || impactMatrix.error || migration.error;

  if (hasAnyError && !data) {
    return (
      <ErrorStateSection 
        title={t('common.error', 'Data Loading Failed')}
        message={t('dashboard.loadingFailedDesc', 'Unable to load journals data. Please check your connection or try again.')}
        onRetry={refetch}
        minHeight={400}
      />
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
            onRetry={refetch}
          />
          <TopJournalRankingCard 
            data={topRanking.data} 
            loading={topRanking.loading} 
            error={topRanking.error} 
            onRetry={refetch}
          />
          <ImpactMatrixCard 
            data={impactMatrix.data} 
            loading={impactMatrix.loading} 
            error={impactMatrix.error} 
            onRetry={refetch}
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
