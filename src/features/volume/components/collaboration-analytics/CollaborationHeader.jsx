import React from 'react';
import './CollaborationAnalytics.css';

const CollaborationHeader = () => {
  return (
    <div className="ca-header">
      <div className="ca-title-group">
        <h1>Collaboration Analytics</h1>
        <p>Exploring the intricate networks and impact footprints of global academic authors and research institutions through bibliometric synthesis.</p>
      </div>
      <div className="ca-header-actions">
        <button className="ca-btn-dark">EXPORT DATA</button>
        <button className="ca-btn-orange">NEW ANALYSIS</button>
      </div>
    </div>
  );
};

export default CollaborationHeader;
