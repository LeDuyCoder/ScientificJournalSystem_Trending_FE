import React from 'react';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import DashboardSection from '../../../shared/components/layout/DashboardSection';
import PublicationTrendCard from '../components/PublicationTrendCard';
import CitationMirroringCard from '../components/CitationMirroringCard';
import TopicEvolutionCard from '../components/TopicEvolutionCard';
import FrontierDetectionCard from '../components/FrontierDetectionCard';
import FutureForecastInsights from '../components/FutureForecastInsights';
import { useDevelopmentTrendsData } from '../hooks/useDevelopmentTrendsData';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
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
  const { filters } = useDashboardContext();
  const { data, loading, error, refetch } = useDevelopmentTrendsData(filters);

  if (loading && !data) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>Loading Development Trends...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...placeholderStyle, height: '400px', flexDirection: 'column', gap: '16px', color: '#dc2626', borderColor: '#fca5a5', padding: '20px', textAlign: 'center' }}>
        <div>Không thể tải dữ liệu phân tích. Vui lòng thử lại.</div>
        <button 
          onClick={refetch} 
          style={{ marginTop: '8px', padding: '8px 16px', background: 'var(--color-primary-orange)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <>
      <DashboardSection title="Analytics Dashboard" className="dashboard-analytics-section">
        <DashboardGrid columns={2}>
          <PublicationTrendCard data={data?.publicationTrend} />
          <CitationMirroringCard data={data?.citationMirroring} />
          <TopicEvolutionCard topicEvolution={data?.topicEvolution} />
          <FrontierDetectionCard data={data?.frontierDetection} />
        </DashboardGrid>
      </DashboardSection>

      <DashboardSection title="Future Forecast Insights" className="dashboard-insights-section">
        <FutureForecastInsights data={data?.forecastInsights} />
      </DashboardSection>
    </>
  );
}
