import { useCollaborationAnalytics } from '../hooks/useCollaborationAnalytics';
import CollaborationTabs from '../components/collaboration-analytics/CollaborationTabs';
import CollaborationHeader from '../components/collaboration-analytics/CollaborationHeader';
import TopInfluentialAuthorsCard from '../components/collaboration-analytics/TopInfluentialAuthorsCard';
import LeadingInstitutionsCard from '../components/collaboration-analytics/LeadingInstitutionsCard';
import AuthorImpactMatrix from '../components/collaboration-analytics/AuthorImpactMatrix';
import KeyInsightsCard from '../components/collaboration-analytics/KeyInsightsCard';
import GlobalCollaborationNetwork from '../components/collaboration-analytics/GlobalCollaborationNetwork';
import TopicIntensityMatrix from '../components/collaboration-analytics/TopicIntensityMatrix';
import CollaborationAnalyticsSkeleton from '../components/collaboration-analytics/CollaborationAnalyticsSkeleton';
import '../components/collaboration-analytics/CollaborationAnalytics.css';

const CollaborationAnalyticsPage = () => {
  const { data, isLoading, error, refetch } = useCollaborationAnalytics();

  return (
    <div className="ca-page">
      <CollaborationHeader />
      <CollaborationTabs />

      {isLoading && <CollaborationAnalyticsSkeleton />}

      {error && (
        <div className="ca-error">
          <p>Failed to load analytics data: {error}</p>
          <button className="ca-retry-btn" onClick={refetch}>Try Again</button>
        </div>
      )}

      {!isLoading && !error && !data && (
        <div className="ca-empty">
          <p>No analytics data available for this view.</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="ca-grid">
          {/* Top Row: Authors | Institutions */}
          <div className="ca-row-top">
            <TopInfluentialAuthorsCard authors={data.authors} />
            <LeadingInstitutionsCard institutions={data.institutions} />
          </div>

          {/* Middle Row: Scatter Chart | Insights */}
          <div className="ca-row-middle">
            <AuthorImpactMatrix data={data.impactMatrix} />
            <KeyInsightsCard insights={data.insights} />
          </div>

          {/* Bottom Row: Network | Topic Matrix */}
          <div className="ca-row-bottom">
            <GlobalCollaborationNetwork data={data.networkData} />
            <TopicIntensityMatrix data={data.topicMatrix} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationAnalyticsPage;
