import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ height = '300px', width = '100%', borderRadius = '8px', message }) => {
  return (
    <div className="skeleton-container" style={{ height, width, borderRadius }}>
      <div className="skeleton-pulse"></div>
      {message && <p className="skeleton-message">{message}</p>}
    </div>
  );
};

export default LoadingSkeleton;
