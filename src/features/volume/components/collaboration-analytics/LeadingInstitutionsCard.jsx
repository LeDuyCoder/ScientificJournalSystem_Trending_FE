import React from 'react';
import './CollaborationAnalytics.css';

const LeadingInstitutionsCard = ({ data }) => {
  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h3 className="ca-card-title">Leading Institutions</h3>
        <span className="ca-card-action">VIEW ALL</span>
      </div>
      <div>
        {data.map((item, index) => (
          <div key={index} className="ca-list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="ca-list-item-left">
                <span className="ca-list-rank">{item.rank}</span>
                <span className="ca-list-name">{item.name}</span>
              </div>
              <div>
                <span className="ca-list-score" style={{ color: item.color }}>{item.score}</span>
                <span className="ca-list-label" style={{ marginLeft: '4px', color: item.color }}>{item.label}</span>
              </div>
            </div>
            <div className="ca-list-bar-container">
              <div className="ca-list-bar" style={{ width: `${item.score}%`, backgroundColor: item.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadingInstitutionsCard;
