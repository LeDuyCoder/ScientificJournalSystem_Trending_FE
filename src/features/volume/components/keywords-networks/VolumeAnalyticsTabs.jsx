import { Link, useLocation } from 'react-router-dom';

const VolumeAnalyticsTabs = () => {
  const location = useLocation();
  
  return (
    <div className="kn-tabs">
      <Link 
        to="/volumes/journal-metrics" 
        className={`kn-tab ${location.pathname === '/volumes/journal-metrics' ? 'active' : ''}`}
      >
        JOURNAL METRICS
      </Link>
      <Link 
        to="/volumes/keywords-networks" 
        className={`kn-tab ${location.pathname === '/volumes/keywords-networks' ? 'active' : ''}`}
      >
        KEYWORDS & NETWORKS
      </Link>
    </div>
  );
};

export default VolumeAnalyticsTabs;
