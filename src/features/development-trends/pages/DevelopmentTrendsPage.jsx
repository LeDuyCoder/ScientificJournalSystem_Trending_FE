import React from 'react';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import DashboardSection from '../../../shared/components/layout/DashboardSection';
import PublicationTrendCard from '../components/PublicationTrendCard';
import CitationMirroringCard from '../components/CitationMirroringCard';
import TopicEvolutionCard from '../components/TopicEvolutionCard';
import FrontierDetectionCard from '../components/FrontierDetectionCard';
import FutureForecastInsights from '../components/FutureForecastInsights';
import { usePublicationTrendQuery } from '../hooks/usePublicationTrendQuery';
import { useCitationMirroringQuery } from '../hooks/useCitationMirroringQuery';
import { useTopicEvolutionQuery } from '../hooks/useTopicEvolutionQuery';
import { useFrontierDetectionQuery } from '../hooks/useFrontierDetectionQuery';
import { useForecastInsightsQuery } from '../hooks/useForecastInsightsQuery';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import ErrorStateSection from '../../../shared/components/common/ErrorStateSection';
import '../styles/DevelopmentTrendsPage.css';

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

export default function DevelopmentTrendsPage() {
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();

  const { data: publicationTrend, isLoading: isPubLoading, error: pubError } = usePublicationTrendQuery(projectId, filters, refreshTrigger);
  const { data: citationMirroring, isLoading: isMirrorLoading, error: mirrorError } = useCitationMirroringQuery(projectId, filters, refreshTrigger);
  const { data: topicEvolution, isLoading: isEvolutionLoading, error: evolutionError } = useTopicEvolutionQuery(projectId, filters, refreshTrigger);
  const { data: frontierDetection, isLoading: isFrontierLoading, error: frontierError } = useFrontierDetectionQuery(projectId, filters, refreshTrigger);
  const { data: forecastInsights, isLoading: isForecastLoading, error: forecastError } = useForecastInsightsQuery(projectId, filters, refreshTrigger);

  const isLoading = isPubLoading || isMirrorLoading || isEvolutionLoading || isFrontierLoading || isForecastLoading;
  const hasError = pubError || mirrorError || evolutionError || frontierError || forecastError;

  if (isLoading) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>Loading Development Trends...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <ErrorStateSection 
        title="Không thể tải dữ liệu"
        message="Không thể tải dữ liệu phân tích phát triển và xu hướng. Vui lòng kiểm tra lại kết nối hoặc thử lại."
        onRetry={refreshData}
        minHeight={400}
      />
    );
  }

  return (
    <>
      <DashboardSection title="Analytics Dashboard" className="dashboard-analytics-section">
        <DashboardGrid columns={2}>
          <PublicationTrendCard data={publicationTrend} />
          <CitationMirroringCard data={citationMirroring} />
          <TopicEvolutionCard topicEvolution={topicEvolution} />
          <FrontierDetectionCard data={frontierDetection} />
        </DashboardGrid>
      </DashboardSection>

      <DashboardSection title="Future Forecast Insights" className="dashboard-insights-section">
        <FutureForecastInsights data={forecastInsights} />
      </DashboardSection>
    </>
  );
}
