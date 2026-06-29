import { FiExternalLink } from 'react-icons/fi';
import './KeywordsNetworks.css';

const ConceptualProximityCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="kn-card">
      <div className="kn-card-header" style={{ marginBottom: '16px' }}>
        <h2 className="kn-card-title">Conceptual Proximity</h2>
        <FiExternalLink color="var(--color-neutral-400)" />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          background: 'var(--color-neutral-50)', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '180px',
          marginBottom: '16px',
          border: '1px solid var(--color-neutral-100)'
        }}>
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Lines */}
            <line x1="100" y1="80" x2="60" y2="40" stroke="#EA580C" strokeWidth="2" />
            <line x1="100" y1="80" x2="140" y2="40" stroke="#EA580C" strokeWidth="2" />
            <line x1="100" y1="80" x2="100" y2="130" stroke="#EA580C" strokeWidth="2" />
            
            {/* Center Node (Orange) */}
            <circle cx="100" cy="80" r="12" fill="#EA580C" stroke="white" strokeWidth="3" />
            
            {/* Outer Nodes (Dark Slate) */}
            <circle cx="60" cy="40" r="6" fill="#374151" />
            <circle cx="140" cy="40" r="6" fill="#374151" />
            <circle cx="100" cy="130" r="8" fill="#6B7280" />
          </svg>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', fontWeight: 'bold' }}>Node Density</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.nodeDensity}</div>
        </div>
        
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.5' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default ConceptualProximityCard;
