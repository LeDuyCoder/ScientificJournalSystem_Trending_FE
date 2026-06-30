import React, { useState, useEffect } from 'react';
import Card from '../../../shared/components/common/Card';

const TopJournalRankingCard = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  const maxImpactFactor = Math.max(...data.map(j => j.impactFactor));

  const actionLink = (
    <button 
      className="tjr-action-link"
      onClick={() => console.log('View Full Table clicked')}
      aria-label="View Full Table"
    >
      VIEW FULL TABLE
    </button>
  );

  return (
    <Card 
      title="Top Journal Ranking" 
      subtitle="Performance by Weighted Impact Factor" 
      actions={actionLink}
      className="tjr-card"
    >
      <div className="tjr-list" role="list" aria-label="List of top journals by impact factor">
        {data.map((journal, index) => {
          const targetWidth = (journal.impactFactor / maxImpactFactor) * 100;
          const currentWidth = isMounted ? targetWidth : 0;
          
          return (
            <div className="tjr-row" key={index} role="listitem">
              <div className="tjr-row-header">
                <span className="tjr-journal-name">{journal.name}</span>
                <span className="tjr-impact-factor">{journal.impactFactor.toFixed(1)}</span>
              </div>
              <div className="tjr-progress-track" aria-hidden="true">
                <div 
                  className={`tjr-progress-bar tjr-color-${journal.color}`}
                  style={{ width: `${currentWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TopJournalRankingCard;
