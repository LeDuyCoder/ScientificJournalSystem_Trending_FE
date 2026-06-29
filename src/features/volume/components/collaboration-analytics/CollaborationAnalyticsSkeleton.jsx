import './CollaborationAnalytics.css';

const CollaborationAnalyticsSkeleton = () => {
  return (
    <div className="ca-grid">
      <div className="ca-row-top">
        <div className="ca-card">
          <div className="ca-skeleton ca-skeleton-title"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
        </div>
        <div className="ca-card">
          <div className="ca-skeleton ca-skeleton-title"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
          <div className="ca-skeleton ca-skeleton-item"></div>
        </div>
      </div>
      
      <div className="ca-row-middle">
        <div className="ca-card">
          <div className="ca-skeleton ca-skeleton-title"></div>
          <div className="ca-skeleton ca-skeleton-chart"></div>
        </div>
        <div className="ca-card ca-insight-card">
          <div className="ca-skeleton ca-skeleton-title" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
          <div className="ca-skeleton ca-skeleton-item" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
          <div className="ca-skeleton ca-skeleton-item" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
        </div>
      </div>

      <div className="ca-row-bottom">
        <div className="ca-card">
          <div className="ca-skeleton ca-skeleton-title"></div>
          <div className="ca-skeleton ca-skeleton-chart"></div>
        </div>
        <div className="ca-card">
          <div className="ca-skeleton ca-skeleton-title"></div>
          <div className="ca-skeleton ca-skeleton-chart"></div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationAnalyticsSkeleton;
