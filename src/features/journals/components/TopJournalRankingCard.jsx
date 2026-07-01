import React, { useState, useEffect } from 'react';
import Card from '../../../shared/components/common/Card';

const TopJournalRankingCard = ({ data, loading, error }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)' }}>
          <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 10px' }}></div>
          Loading ranking data...
        </div>
      ) : error ? (
        (error.toLowerCase().includes('not found') || error.toLowerCase().includes('404')) ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)' }}>
            No ranking data available for this project.
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#dc2626' }}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '10px', padding: '5px 10px', background: 'var(--color-primary-orange)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Retry</button>
          </div>
        )
      ) : !data || data.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-neutral-500)' }}>
          No journal data available for the selected filters.
        </div>
      ) : (
        <div className="tjr-list" role="list" aria-label="List of top journals by impact factor">
          {data.map((journal, index) => {
            const maxImpactFactor = Math.max(...data.map(j => j.impactFactor || 0));
            const impactFactor = journal.impactFactor || 0;
            const targetWidth = maxImpactFactor > 0 ? (impactFactor / maxImpactFactor) * 100 : 0;
            const currentWidth = isMounted ? targetWidth : 0;
            
            // Assign a color based on index or existing color field
            const colors = ["orange", "dark", "gray", "lightGray"];
            const color = journal.color || colors[index % colors.length];
            
            return (
              <div className="tjr-row" key={journal.id || index} role="listitem">
                <div className="tjr-row-header">
                  <span className="tjr-journal-name">{journal.name}</span>
                  <span className="tjr-impact-factor">{impactFactor.toFixed(1)}</span>
                </div>
                <div className="tjr-progress-track" aria-hidden="true">
                  <div 
                    className={`tjr-progress-bar tjr-color-${color}`}
                    style={{ width: `${currentWidth}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default TopJournalRankingCard;
