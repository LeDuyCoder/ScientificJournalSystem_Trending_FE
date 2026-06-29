import DashboardContainer from '../components/layout/DashboardContainer';
import DashboardGrid from '../components/layout/DashboardGrid';
import TopJournalRankingCard from '../components/dashboard/visualizations/TopJournalRankingCard';
import QuartileDistributionCard from '../components/dashboard/visualizations/QuartileDistributionCard';
import ImpactMatrixCard from '../components/dashboard/visualizations/ImpactMatrixCard';
import MigrationAnalysisCard from '../components/dashboard/visualizations/MigrationAnalysisCard';

export default function Journals() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <DashboardContainer>
        <DashboardGrid columns={2}>
          <QuartileDistributionCard />
          <TopJournalRankingCard />
          <ImpactMatrixCard />
          <MigrationAnalysisCard />
        </DashboardGrid>
      </DashboardContainer>
    </div>
  );
}
