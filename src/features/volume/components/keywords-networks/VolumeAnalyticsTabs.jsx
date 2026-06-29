import { Link, useLocation } from 'react-router-dom';
import './KeywordsNetworks.css';

const VolumeAnalyticsTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="kn-tabs">
      <Link 
        to="/volumes/journal-metrics" 
        className={`kn-tab ${currentPath === '/volumes/journal-metrics' ? 'active' : ''}`}
        style={{ textDecoration: 'none' }}
      >
        JOURNAL METRICS
      </Link>
      <Link 
        to="/volumes/keywords-networks" 
        className={`kn-tab ${currentPath === '/volumes/keywords-networks' ? 'active' : ''}`}
        style={{ textDecoration: 'none' }}
      >
        KEYWORDS & NETWORKS
      </Link>
    </div>
  );
};

export default VolumeAnalyticsTabs;
