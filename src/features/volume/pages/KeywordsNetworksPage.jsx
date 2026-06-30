import DashboardFooter from '../../../shared/components/layout/DashboardFooter';
import VolumeAnalyticsTabs from '../components/keywords-networks/VolumeAnalyticsTabs';
import CoreClustersCard from '../components/keywords-networks/CoreClustersCard';
import KeywordTrendVectorsChart from '../components/keywords-networks/KeywordTrendVectorsChart';
import CountryCollaborationChord from '../components/keywords-networks/CountryCollaborationChord';
import CollaborationInsightsCard from '../components/keywords-networks/CollaborationInsightsCard';
import ConceptualProximityCard from '../components/keywords-networks/ConceptualProximityCard';
import DomainCrossLinksCard from '../components/keywords-networks/DomainCrossLinksCard';
import TemporalClusterShiftCard from '../components/keywords-networks/TemporalClusterShiftCard';
import { useKeywordsNetworks } from '../hooks/useKeywordsNetworks';
import '../components/keywords-networks/KeywordsNetworks.css';

const KeywordsNetworksPage = () => {
  const { data, isLoading, error, refetch, timeframe } = useKeywordsNetworks();

  return (
    <>
      <div className="kn-page">
        <VolumeAnalyticsTabs />
        
        {isLoading ? (
          <div className="kn-loading">
            <div>Loading analytics...</div>
          </div>
        ) : error ? (
          <div className="kn-error">
            <div>{error}</div>
            <button onClick={() => refetch()} className="kn-btn-primary" style={{ marginTop: '16px', width: 'auto' }}>Retry</button>
          </div>
        ) : !data ? (
          <div className="kn-empty">
            <div>No data available.</div>
          </div>
        ) : (
          <div className="kn-layout">
            <div className="kn-row kn-row-1">
              <CoreClustersCard />
              <KeywordTrendVectorsChart 
                data={data.trendVectors} 
                timeframe={timeframe} 
                onTimeframeChange={(tf) => refetch(tf)} 
              />
            </div>
            
            <div className="kn-row kn-row-2">
              <CountryCollaborationChord />
              <CollaborationInsightsCard />
            </div>
            
            <div className="kn-row kn-row-3">
              <ConceptualProximityCard />
              <DomainCrossLinksCard />
              <TemporalClusterShiftCard data={data.temporalShift} />
            </div>
          </div>
        )}
      </div>
      <DashboardFooter />
    </>
  );
};

export default KeywordsNetworksPage;
