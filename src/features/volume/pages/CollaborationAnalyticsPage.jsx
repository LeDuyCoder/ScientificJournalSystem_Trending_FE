import React from 'react';
import DashboardFooter from '../../../components/layout/DashboardFooter';
import CollaborationTabs from '../components/collaboration-analytics/CollaborationTabs';
import CollaborationHeader from '../components/collaboration-analytics/CollaborationHeader';
import TopInfluentialAuthorsCard from '../components/collaboration-analytics/TopInfluentialAuthorsCard';
import LeadingInstitutionsCard from '../components/collaboration-analytics/LeadingInstitutionsCard';
import AuthorImpactMatrix from '../components/collaboration-analytics/AuthorImpactMatrix';
import KeyInsightsCard from '../components/collaboration-analytics/KeyInsightsCard';
import GlobalCollaborationNetwork from '../components/collaboration-analytics/GlobalCollaborationNetwork';
import TopicIntensityMatrix from '../components/collaboration-analytics/TopicIntensityMatrix';
import CollaborationAnalyticsSkeleton from '../components/collaboration-analytics/CollaborationAnalyticsSkeleton';
import { useCollaborationAnalytics } from '../hooks/useCollaborationAnalytics';
import '../components/collaboration-analytics/CollaborationAnalytics.css';

const CollaborationAnalyticsPage = () => {
  const { data, isLoading, error } = useCollaborationAnalytics();

  return (
    <>
      <div className="ca-page">
        <CollaborationTabs />
        
        {isLoading ? (
          <CollaborationAnalyticsSkeleton />
        ) : error ? (
          <div className="kn-error">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : !data ? (
          <div className="kn-empty">
            <h2>No Data</h2>
            <p>No collaboration analytics data available.</p>
          </div>
        ) : (
          <>
            <CollaborationHeader />
            <div className="ca-layout">
              <div className="ca-row ca-row-half">
                <TopInfluentialAuthorsCard data={data.topAuthors} />
                <LeadingInstitutionsCard data={data.leadingInstitutions} />
              </div>
              
              <div className="ca-row ca-row-2-1">
                <AuthorImpactMatrix data={data.impactMatrix} />
                <KeyInsightsCard data={data.keyInsights} />
              </div>
              
              <div className="ca-row ca-row-half">
                <GlobalCollaborationNetwork data={data.globalNetwork} />
                <TopicIntensityMatrix 
                  authorData={data.topicIntensityAuthors} 
                  institutionData={data.topicIntensityInstitutions} 
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
