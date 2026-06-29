import { useKeywordsNetworks } from '../hooks/useKeywordsNetworks';
import VolumeAnalyticsTabs from '../components/keywords-networks/VolumeAnalyticsTabs';
import CoreClustersCard from '../components/keywords-networks/CoreClustersCard';
import KeywordTrendVectorsChart from '../components/keywords-networks/KeywordTrendVectorsChart';
import CountryCollaborationChord from '../components/keywords-networks/CountryCollaborationChord';
import CollaborationInsightsCard from '../components/keywords-networks/CollaborationInsightsCard';
import ConceptualProximityCard from '../components/keywords-networks/ConceptualProximityCard';
import DomainCrossLinksCard from '../components/keywords-networks/DomainCrossLinksCard';
import TemporalClusterShiftCard from '../components/keywords-networks/TemporalClusterShiftCard';
import '../components/keywords-networks/KeywordsNetworks.css';

const KeywordsNetworksPage = () => {
  const { data, isLoading, error } = useKeywordsNetworks();

  return (
    <div className="kn-page">
      <div className="kn-header">
        <h1 className="kn-title">Volume Analytics</h1>
        <p className="kn-subtitle">Analyze keyword trends and research collaboration networks</p>
      </div>

      <VolumeAnalyticsTabs />

      {isLoading && (
        <div className="kn-loading">
          Loading analytics data...
        </div>
      )}

      {error && (
        <div className="kn-error">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="kn-grid">
          {/* Row 1 */}
          <div className="kn-row-1">
            <CoreClustersCard data={data.coreClusters} />
            <KeywordTrendVectorsChart data={data.keywordTrendVectors} />
          </div>

          {/* Row 2 */}
          <div className="kn-row-2">
            <CountryCollaborationChord data={data.countryChord} />
            <CollaborationInsightsCard data={data.collaborationInsights} />
          </div>

          {/* Row 3 */}
          <div className="kn-row-3">
            <ConceptualProximityCard data={data.conceptualProximity} />
            <DomainCrossLinksCard data={data.domainCrossLinks} />
            <TemporalClusterShiftCard data={data.temporalClusterShift} />
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordsNetworksPage;
