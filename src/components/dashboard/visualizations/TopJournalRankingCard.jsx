import { useState, useEffect } from 'react';
import Card from '../../common/Card';
import './TopJournalRankingCard.css';

// Mock data as specified
const topJournals = [
  {
    name: "Nature Bibliometrics",
    impactFactor: 42.1,
    color: "orange"
  },
  {
    name: "Journal of Data Science",
    impactFactor: 38.4,
    color: "dark"
  },
  {
    name: "Review of Quantitative Analysis",
    impactFactor: 31.2,
    color: "gray"
  },
  {
    name: "Global Informatics",
    impactFactor: 24.7,
    color: "lightGray"
  }
];

// Renders the list of journals with progress bars indicating weighted impact factor
const TopJournalRankingCard = () => {
  // Use state to trigger animation after mount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Slight delay to ensure smooth animation on first render
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const maxImpactFactor = Math.max(...topJournals.map(j => j.impactFactor));

  // Action link for the card header
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
        {topJournals.map((journal, index) => {
          // Progress bar calculation
          const targetWidth = (journal.impactFactor / maxImpactFactor) * 100;
          const currentWidth = isMounted ? targetWidth : 0;
          
          return (
            <div className="tjr-row" key={index} role="listitem">
              <div className="tjr-row-header">
                <span className="tjr-journal-name">{journal.name}</span>
                <span className="tjr-impact-factor">{journal.impactFactor.toFixed(1)}</span>
              </div>
              
              {/* Progress bar rendering */}
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
