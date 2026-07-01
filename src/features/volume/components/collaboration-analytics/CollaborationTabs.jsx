import { Link, useLocation, useParams } from 'react-router-dom';
import '../keywords-networks/KeywordsNetworks.css';

const CollaborationTabs = () => {
  const location = useLocation();
  const { id } = useParams();

  const base = `/project/${id}/volumes`;

  return (
    <div className="kn-tabs">
      <Link 
        to={`${base}/journal-metrics`} 
        className={`kn-tab ${location.pathname === `${base}/journal-metrics` ? 'active' : ''}`}
      >
        JOURNAL METRICS
      </Link>
      <Link 
        to={`${base}/keywords-networks`} 
        className={`kn-tab ${location.pathname === `${base}/keywords-networks` ? 'active' : ''}`}
      >
        KEYWORDS &amp; NETWORKS
      </Link>
    </div>
  );
};

export default CollaborationTabs;
