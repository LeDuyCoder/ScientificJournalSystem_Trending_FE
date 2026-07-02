import React, { useState } from 'react';
import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import VolumeAnalyticsTabs from '../components/keywords-networks/VolumeAnalyticsTabs';
import CoreClustersCard from '../components/keywords-networks/CoreClustersCard';
import KeywordTrendVectorsChart from '../components/keywords-networks/KeywordTrendVectorsChart';
import CountryCollaborationChord from '../components/keywords-networks/CountryCollaborationChord';
import CollaborationInsightsCard from '../components/keywords-networks/CollaborationInsightsCard';
import ConceptualProximityCard from '../components/keywords-networks/ConceptualProximityCard';
import DomainCrossLinksCard from '../components/keywords-networks/DomainCrossLinksCard';
import TemporalClusterShiftCard from '../components/keywords-networks/TemporalClusterShiftCard';
import { useDashboardContext } from '../../dashboard/contexts/DashboardContext';
import {
  useKeywordVectorsQuery,
  useCountryCollaborationQuery,
  useCollaborationInsightsQuery,
  useNetworkTopologyQuery,
  useCrossLinksQuery,
  useTemporalShiftQuery
} from '../hooks/useKeywordsNetworksQuery';
import '../components/keywords-networks/KeywordsNetworks.css';

const KeywordsNetworksPage = () => {
  const { projectId, filters, refreshTrigger, refreshData } = useDashboardContext();
  const [localTimeframe, setLocalTimeframe] = useState('monthly');

  const { data: keywordVectors, isLoading: isVectorsLoading, error: vectorsError } = useKeywordVectorsQuery(projectId, { ...filters, windowMonths: localTimeframe === 'daily' ? 1 : 12 }, refreshTrigger);
  const { data: countryCollab, isLoading: isCollabLoading, error: collabError } = useCountryCollaborationQuery(projectId, filters, refreshTrigger);
  const { data: collabInsights, isLoading: isInsightsLoading, error: insightsError } = useCollaborationInsightsQuery(projectId, filters, refreshTrigger);
  const { data: topology, isLoading: isTopologyLoading, error: topologyError } = useNetworkTopologyQuery(projectId, filters, refreshTrigger);
  const { data: crossLinks, isLoading: isCrossLoading, error: crossError } = useCrossLinksQuery(projectId, filters, refreshTrigger);
  const { data: temporalShift, isLoading: isTemporalLoading, error: temporalError } = useTemporalShiftQuery(projectId, filters, refreshTrigger);

  const isLoading = isVectorsLoading || isCollabLoading || isInsightsLoading || isTopologyLoading || isCrossLoading || isTemporalLoading;
  const hasError = vectorsError || collabError || insightsError || topologyError || crossError || temporalError;

  return (
    <>
      <div className="kn-page">
        <VolumeAnalyticsTabs />
        
        {isLoading ? (
          <div className="kn-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
            <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
            <div>Loading analytics...</div>
          </div>
        ) : hasError ? (
          <div className="kn-error" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px', color: '#dc2626' }}>
            <div>Unable to load keyword and networks analytics. Try again later.</div>
            <button onClick={refreshData} className="kn-btn-primary" style={{ marginTop: '16px', width: 'auto', background: 'var(--color-primary-orange)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Retry</button>
          </div>
        ) : (
          <div className="kn-layout">
            <div className="kn-row kn-row-1">
              <CoreClustersCard data={keywordVectors} />
              <KeywordTrendVectorsChart 
                data={keywordVectors} 
                timeframe={localTimeframe} 
                onTimeframeChange={setLocalTimeframe} 
              />
            </div>
            
            <div className="kn-row kn-row-2">
              <CountryCollaborationChord data={countryCollab} />
              <CollaborationInsightsCard data={collabInsights} projectId={projectId} filters={filters} />
            </div>
            
            <div className="kn-row kn-row-3">
              <ConceptualProximityCard data={topology} />
              <DomainCrossLinksCard data={crossLinks} />
              <TemporalClusterShiftCard data={temporalShift} />
            </div>
          </div>
        )}
      </div>
      <DashboardFooter />
    </>
  );
};

export default KeywordsNetworksPage;
