import React from 'react';
import './CollaborationAnalytics.css';

const AuthorImpactMatrix = ({ data }) => {
  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h3 className="ca-card-title">Author Productivity vs Impact Matrix</h3>
      </div>
      
      <div className="ca-matrix-container">
        {/* Grid lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: '1px', background: 'var(--color-neutral-200)' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--color-neutral-200)' }}></div>
          <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, height: '1px', background: 'var(--color-neutral-200)' }}></div>
          <div style={{ position: 'absolute', left: '25%', top: 0, bottom: 0, width: '1px', background: 'var(--color-neutral-200)' }}></div>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'var(--color-neutral-200)' }}></div>
          <div style={{ position: 'absolute', left: '75%', top: 0, bottom: 0, width: '1px', background: 'var(--color-neutral-200)' }}></div>
        </div>
        
        {/* Plot points */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {data.map(point => {
            const isAuthor = point.type === 'author';
            return (
              <circle
                key={point.id}
                cx={`${point.x}%`}
                cy={`${100 - point.y}%`}
                r={point.r * 1.5}
                fill={isAuthor ? 'none' : 'var(--color-neutral-300)'}
                stroke={isAuthor ? '#ff6b00' : '#1b2432'}
                strokeWidth="2"
              />
            );
          })}
        </svg>

        <div className="ca-matrix-axis-x">ARTICLE OUTPUT (YEARLY)</div>
        <div className="ca-matrix-axis-y">IMPACT FACTOR (H-INDEX)</div>
      </div>
    </div>
  );
};

export default AuthorImpactMatrix;
