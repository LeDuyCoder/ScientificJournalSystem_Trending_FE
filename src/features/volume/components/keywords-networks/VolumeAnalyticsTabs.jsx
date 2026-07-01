import { Link, useLocation, useParams } from 'react-router-dom';

const VolumeAnalyticsTabs = () => {
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
        KEYWORDS & NETWORKS
      </Link>
    </div>
  );
};

export default VolumeAnalyticsTabs;
