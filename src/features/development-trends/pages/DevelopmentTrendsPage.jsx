import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';
import DashboardSection from '../../../shared/components/layout/DashboardSection';
import PublicationTrendCard from '../components/PublicationTrendCard';
import CitationMirroringCard from '../components/CitationMirroringCard';
import TopicEvolutionCard from '../components/TopicEvolutionCard';
import FrontierDetectionCard from '../components/FrontierDetectionCard';
import FutureForecastInsights from '../components/FutureForecastInsights';
import '../styles/DevelopmentTrendsPage.css';

export default function DevelopmentTrendsPage() {
  const { t } = useTranslation();

  return (
    <>
      <DashboardSection title={t('dashboard.analyticsTitle', 'Analytics Dashboard')} className="dashboard-analytics-section">
        <DashboardGrid columns={2}>
          <PublicationTrendCard />
          <CitationMirroringCard />
          <TopicEvolutionCard />
          <FrontierDetectionCard />
        </DashboardGrid>
      </DashboardSection>

      <DashboardSection title={t('dashboard.forecastTitle', 'Future Forecast Insights')} className="dashboard-insights-section">
        <FutureForecastInsights />
      </DashboardSection>
    </>
  );
}
