import React from 'react';
import './CollaborationAnalytics.css';

const AuthorImpactMatrix = ({ data }) => {
  if (!Array.isArray(data)) {
    return (
      <div className="ca-card">
        <div className="ca-card-header">
          <h3 className="ca-card-title">Author Productivity vs Impact Matrix</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
          No data available for this project.
        </div>
      </div>
    );
  }

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
            // Tạo một độ nhiễu siêu nhỏ (jitter) từ -1% đến 1% dựa trên id để các điểm có cùng x, y không bị đè cứng lên nhau
            const jitterX = (Math.sin(point.id * 12.9898) * 43758.5453) % 1; 
            const jitterY = (Math.cos(point.id * 78.233) * 43758.5453) % 1;
            
            // Giới hạn x, y không bị văng ra khỏi khung
            const finalX = Math.max(1, Math.min(99, point.x + jitterX * 1.5));
            const finalY = Math.max(1, Math.min(99, point.y + jitterY * 1.5));

            return (
              <circle
                key={point.id}
                cx={`${finalX}%`}
                cy={`${100 - finalY}%`}
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
