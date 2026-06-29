import './CollaborationAnalytics.css';

const CollaborationHeader = () => {
  return (
    <div className="ca-header-container">
      <div>
        <h1 className="ca-title">Collaboration Analytics</h1>
        <p className="ca-subtitle">Analyze author influence and global institutional networks</p>
      </div>
      <div className="ca-header-actions">
        <button className="ca-btn-export">Export Data</button>
        <button className="ca-btn-new">New Analysis</button>
      </div>
    </div>
  );
};

export default CollaborationHeader;
