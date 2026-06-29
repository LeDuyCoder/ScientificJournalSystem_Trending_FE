import VolumeAnalyticsTabs from '../components/keywords-networks/VolumeAnalyticsTabs';
import '../components/keywords-networks/KeywordsNetworks.css';

const CollaborationAnalyticsPage = () => {
  return (
    <div className="kn-page">
      <VolumeAnalyticsTabs />
      <div className="kn-card">
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-neutral-500)' }}>
          <h2>Journal Metrics</h2>
          <p>This page is under construction.</p>
        </div>
      </div>
    </div>
  );
};

export default CollaborationAnalyticsPage;
