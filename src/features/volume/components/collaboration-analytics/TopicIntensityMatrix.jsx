import React, { useState } from 'react';
import './CollaborationAnalytics.css';

const TopicIntensityMatrix = ({ authorData, institutionData }) => {
  const [activeTab, setActiveTab] = useState('AUTHORS');
  const data = activeTab === 'AUTHORS' ? authorData : institutionData;

  const getIntensityColor = (value) => {
    // scale from #ffe5d0 to #ff6b00
    // roughly we can use an rgba of #ff6b00 with varying opacity, or we can just use HSL interpolation
    // But since the mock has 0 to 1 value:
    return `rgba(255, 107, 0, ${value})`;
  };

  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h3 className="ca-card-title">Topic Intensity Matrix</h3>
        <div className="kn-toggle-group">
          <button 
            className={`kn-toggle-btn ${activeTab === 'AUTHORS' ? 'active' : ''}`}
            onClick={() => setActiveTab('AUTHORS')}
          >
            AUTHORS
          </button>
          <button 
            className={`kn-toggle-btn ${activeTab === 'INSTITUTIONS' ? 'active' : ''}`}
            onClick={() => setActiveTab('INSTITUTIONS')}
          >
            INSTITUTIONS
          </button>
        </div>
      </div>
      
      <div className="ca-intensity-grid">
        <div className="ca-intensity-header">
          <div></div>
          {data.columns.map((col, idx) => (
            <div key={idx} className="ca-intensity-col">{col}</div>
          ))}
        </div>
        
        {data.rows.map((row, rowIdx) => (
          <div key={rowIdx} className="ca-intensity-row">
            <div className="ca-intensity-row-label">{row}</div>
            {data.data[rowIdx].map((value, colIdx) => (
              <div 
                key={colIdx} 
                className="ca-intensity-cell" 
                style={{ backgroundColor: getIntensityColor(value) }}
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
