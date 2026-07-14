import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../keywords-networks/KeywordsNetworks.css';

const CollaborationTabs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id, lang } = useParams();
  const currentLang = lang || 'en';

  const base = `/${currentLang}/project/${id}/volumes`;
  const plainBase = `/project/${id}/volumes`;

  const isTabActive = (tabPath) => {
    return location.pathname === `${plainBase}${tabPath}` || 
           location.pathname === `${base}${tabPath}`;
  };

  return (
    <div className="kn-tabs">
      <Link 
        to={`${base}/journal-metrics`} 
        className={`kn-tab ${isTabActive('/journal-metrics') ? 'active' : ''}`}
      >
        {t('volume.tabs.journalMetrics', 'JOURNAL METRICS')}
      </Link>
      <Link 
        to={`${base}/keywords-networks`} 
        className={`kn-tab ${isTabActive('/keywords-networks') ? 'active' : ''}`}
      >
        {t('volume.tabs.keywordsNetworks', 'KEYWORDS & NETWORKS')}
      </Link>
    </div>
  );
};

export default CollaborationTabs;
