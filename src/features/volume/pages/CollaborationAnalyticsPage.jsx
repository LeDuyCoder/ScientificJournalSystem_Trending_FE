import React from 'react';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import CollaborationTabs from '../components/collaboration-analytics/CollaborationTabs';
import CollaborationHeader from '../components/collaboration-analytics/CollaborationHeader';
import TopInfluentialAuthorsCard from '../components/collaboration-analytics/TopInfluentialAuthorsCard';
import LeadingInstitutionsCard from '../components/collaboration-analytics/LeadingInstitutionsCard';
import AuthorImpactMatrix from '../components/collaboration-analytics/AuthorImpactMatrix';
import KeyInsightsCard from '../components/collaboration-analytics/KeyInsightsCard';
import GlobalCollaborationNetwork from '../components/collaboration-analytics/GlobalCollaborationNetwork';
import TopicIntensityMatrix from '../components/collaboration-analytics/TopicIntensityMatrix';
import CollaborationAnalyticsSkeleton from '../components/collaboration-analytics/CollaborationAnalyticsSkeleton';
import { 
  useInfluentialRankingsQuery, 
  useAuthorProductivityMatrixQuery,
  useCollaborationInsightsQuery,
  useGlobalCollaborationNetworkQuery,
  useTopicIntensityMatrixQuery 
} from '../hooks/useCollaborationAnalyticsQueries';
import { useParams } from 'react-router-dom';
import '../components/collaboration-analytics/CollaborationAnalytics.css';

const CollaborationAnalyticsPage = () => {
  const { id } = useParams();
  const projectId = id === 'default-id' ? '1' : id;

  const { data: rankings, isLoading: isLoadingRankings, error: errRankings } = useInfluentialRankingsQuery(projectId);
  const { data: impactMatrix, isLoading: isLoadingImpact, error: errImpact } = useAuthorProductivityMatrixQuery(projectId);
  const { data: keyInsights, isLoading: isLoadingInsights, error: errInsights } = useCollaborationInsightsQuery(projectId);
  const { data: globalNetwork, isLoading: isLoadingNetwork, error: errNetwork } = useGlobalCollaborationNetworkQuery(projectId);
  
  const [intensityType, setIntensityType] = React.useState('author');
  const { data: topicIntensity, isLoading: isLoadingIntensity, error: errIntensity } = useTopicIntensityMatrixQuery(projectId, intensityType);

  const isLoading = isLoadingRankings || isLoadingImpact || isLoadingInsights || isLoadingNetwork || isLoadingIntensity;
  const error = errRankings || errImpact || errInsights || errNetwork || errIntensity;

  return (
    <>
      <div className="ca-page">
        <CollaborationTabs />
        
        {isLoading ? (
          <CollaborationAnalyticsSkeleton />
        ) : error ? (
          <div className="kn-error">
            <h2>Error</h2>
            <p>{error.message}</p>
          </div>
        ) : (
          <>
            <CollaborationHeader />
            <div className="ca-layout">
              <div className="ca-row ca-row-half">
                <TopInfluentialAuthorsCard data={rankings?.authors} />
                <LeadingInstitutionsCard data={rankings?.institutions} />
              </div>
              
              <div className="ca-row ca-row-2-1">
                <AuthorImpactMatrix data={impactMatrix} />
                <KeyInsightsCard data={keyInsights} />
              </div>
              
              <div className="ca-row ca-row-half">
                <GlobalCollaborationNetwork data={globalNetwork} />
                <TopicIntensityMatrix 
                  data={topicIntensity}
                  type={intensityType}
                  onTypeChange={setIntensityType}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <DashboardFooter />
    </>
  );
};

export default CollaborationAnalyticsPage;
