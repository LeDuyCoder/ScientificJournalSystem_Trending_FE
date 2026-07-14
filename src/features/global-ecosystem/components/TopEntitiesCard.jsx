import React from 'react';

export default function TopEntitiesCard({ title = "Top Entities", items = [] }) {
  const maxValue = items.length > 0 ? Math.max(...items.map(item => item.value)) : 1;

  return (
    <div className="ranking-list-container dashboard-card">
      <div className="ranking-list-header">
        <h3 className="ranking-list-title">{title}</h3>
      </div>
      
      <div className="ranking-list-content">
        {items.map((item, index) => (
          <div key={index} className="ranking-item">
            <div className="ranking-item-info">
              <span className="ranking-item-name">{item.name}</span>
              <span className="ranking-item-value">{item.displayValue}</span>
            </div>
            <div className="ranking-item-bar-container">
              <div 
                className="ranking-item-bar" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
