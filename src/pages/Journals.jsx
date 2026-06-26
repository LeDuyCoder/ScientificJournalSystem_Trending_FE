import React from 'react';
import DashboardHeader from '../components/header/DashboardHeader';
import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardGrid from '../components/layout/DashboardGrid';
import TopJournalRankingCard from '../components/dashboard/visualizations/TopJournalRankingCard';
import QuartileDistributionCard from '../components/dashboard/visualizations/QuartileDistributionCard';

export default function Journals() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <DashboardHeader />
      <DashboardContainer>
        <DashboardGrid columns={2}>
          <QuartileDistributionCard />
          <TopJournalRankingCard />
        </DashboardGrid>
      </DashboardContainer>
    </div>
  );
}
