import React, { useState } from 'react';
import './CollaborationAnalytics.css';

const TopicIntensityMatrix = ({ data, type, onTypeChange }) => {
  const getIntensityColor = (value) => {
    // scale from #f1f5f9 to #ff6b00
    if (!value || value === 0) return '#f1f5f9';
    // Đảm bảo opacity tối thiểu để có thể nhìn thấy màu cam
    const opacity = Math.max(0.15, value);
    return `rgba(255, 107, 0, ${opacity})`;
  };

  if (!data || !Array.isArray(data.columns) || !Array.isArray(data.rows) || !Array.isArray(data.data)) {
    return (
      <div className="ca-card">
        <div className="ca-card-header">
          <h3 className="ca-card-title">Topic Intensity Matrix</h3>
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
        <h3 className="ca-card-title">Topic Intensity Matrix</h3>
        <div className="kn-toggle-group">
          <button 
            className={`kn-toggle-btn ${type === 'author' ? 'active' : ''}`}
            onClick={() => onTypeChange('author')}
          >
            AUTHORS
          </button>
          <button 
            className={`kn-toggle-btn ${type === 'institution' ? 'active' : ''}`}
            onClick={() => onTypeChange('institution')}
          >
            INSTITUTIONS
          </button>
        </div>
      </div>
      
      <div className="ca-intensity-grid" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
        <div 
          className="ca-intensity-header" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `180px repeat(${data.columns.length}, 1fr)`, 
            gap: '4px', 
            marginBottom: '8px' 
          }}
        >
          <div></div>
          {data.columns?.map((col, idx) => (
            <div key={idx} className="ca-intensity-col">{col}</div>
          ))}
        </div>
        
        {data.rows.map((row, rowIdx) => (
          <div 
            key={rowIdx} 
            className="ca-intensity-row"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `180px repeat(${data.columns.length}, 1fr)`, 
              gap: '4px', 
              alignItems: 'center',
              marginBottom: '6px'
            }}
          >
            <div className="ca-intensity-row-label" title={row} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {row}
            </div>
            {data.data[rowIdx].map((value, colIdx) => (
              <div 
                key={colIdx} 
                className="ca-intensity-cell" 
                style={{ backgroundColor: getIntensityColor(value) }}
                title={`${data.columns[colIdx]}: ${value * 100}%`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="ca-intensity-legend">
        <span>LOW ACTIVITY</span>
        <div className="ca-intensity-gradient"></div>
        <span>HIGH IMPACT</span>
      </div>
    </div>
  );
};

export default TopicIntensityMatrix;
