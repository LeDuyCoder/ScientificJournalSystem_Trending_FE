import { Link, useLocation } from 'react-router-dom';
import './CollaborationAnalytics.css';

const CollaborationTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="ca-tabs">
      <Link 
        to="/volumes/journal-metrics" 
        className={`ca-tab ${currentPath === '/volumes/journal-metrics' ? 'active' : ''}`}
      >
        JOURNAL METRICS
      </Link>
      <Link 
        to="/volumes/keywords-networks" 
        className={`ca-tab ${currentPath === '/volumes/keywords-networks' ? 'active' : ''}`}
      >
        KEYWORDS & NETWORKS
      </Link>
    </div>
  );
};

export default CollaborationTabs;
