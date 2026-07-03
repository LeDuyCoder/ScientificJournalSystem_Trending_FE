import React from 'react';
import './CollaborationAnalytics.css';

const TopInfluentialAuthorsCard = ({ data }) => {
  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h3 className="ca-card-title">Top Influential Authors</h3>
        <span className="ca-card-action">VIEW ALL</span>
      </div>
      <div>
        {data?.slice(0, 4).map((item, index) => {
          const rankStr = (index + 1).toString().padStart(2, '0');
          const score = item.score !== undefined ? Number(item.score).toFixed(1) : 0;
          return (
            <div key={index} className="ca-list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="ca-list-item-left">
                  <span className="ca-list-rank">{rankStr}</span>
                  <span className="ca-list-name">{item.name}</span>
                </div>
                <div>
                  <span className="ca-list-score">{score}</span>
                  <span className="ca-list-label" style={{ marginLeft: '4px', color: '#ff6b00' }}>Impact Score</span>
                </div>
              </div>
              <div className="ca-list-bar-container">
                <div className="ca-list-bar" style={{ width: `${Math.min(100, Math.max(0, score))}%`, backgroundColor: '#ff6b00' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopInfluentialAuthorsCard;
