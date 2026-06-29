import './CollaborationAnalytics.css';

const KeyInsightsCard = ({ insights }) => {
  if (!insights) return null;

  return (
    <div className="ca-card ca-insight-card" style={{ background: '#111827', color: 'white', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 className="ca-card-title" style={{ color: 'white' }}>Key Insights</h3>
        <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '8px' }}>{insights.description}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EA580C' }}>{insights.jointVenturesGrowth}</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', opacity: 0.7 }}>JOINT VENTURES GROWTH</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EA580C' }}>{insights.interdisciplinaryCrossOver}</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', opacity: 0.7 }}>INTERDISCIPLINARY CROSSOVER</div>
        </div>
        <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EA580C' }}>{insights.publicationSuccessRate}</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', opacity: 0.7 }}>PUBLICATION SUCCESS RATE</div>
        </div>
      </div>
    </div>
  );
};

export default KeyInsightsCard;
