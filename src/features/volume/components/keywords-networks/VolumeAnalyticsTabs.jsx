import './KeywordsNetworks.css';

const VolumeAnalyticsTabs = () => {
  const tabs = ['JOURNAL METRICS', 'KEYWORDS & NETWORKS'];
  
  return (
    <div className="kn-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`kn-tab ${tab === 'KEYWORDS & NETWORKS' ? 'active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default VolumeAnalyticsTabs;
