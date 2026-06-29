import React from 'react';
import './CollaborationAnalytics.css';

const CollaborationAnalyticsSkeleton = () => {
  return (
    <div className="ca-page">
      <div className="kn-loading">
        <h2>Loading Analytics...</h2>
        <p>Crunching journal metrics...</p>
      </div>
    </div>
  );
};

export default CollaborationAnalyticsSkeleton;
