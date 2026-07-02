import { FiExternalLink } from 'react-icons/fi';

const ConceptualProximityCard = ({ data }) => {
  const nodeDensity = data?.nodeDensity ?? 0.82;
  const description = data?.description || 'Strong thematic correlation between LLMs and Ethical Alignment paradigms.';

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <h2 className="kn-card-title">Conceptual Proximity</h2>
        <FiExternalLink className="kn-card-subtitle" style={{ cursor: 'pointer' }} />
      </div>
      
      <div className="kn-svg-container" style={{ border: '1px solid var(--color-neutral-200)', borderRadius: '4px', margin: '16px 0', backgroundColor: 'var(--color-neutral-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="200" height="150" viewBox="0 0 200 150">
          <line x1="60" y1="50" x2="100" y2="85" stroke="var(--color-primary-orange)" strokeWidth="1.5" />
          <line x1="140" y1="50" x2="100" y2="85" stroke="var(--color-primary-orange)" strokeWidth="1.5" />
          <line x1="100" y1="120" x2="100" y2="85" stroke="var(--color-primary-orange)" strokeWidth="1.5" />
          
          <circle cx="60" cy="50" r="5" fill="var(--color-neutral-800)" />
          <circle cx="140" cy="50" r="5" fill="var(--color-neutral-800)" />
          <circle cx="100" cy="120" r="5" fill="var(--color-neutral-600)" />
          <circle cx="100" cy="85" r="8" fill="var(--color-primary-orange)" />
          <circle cx="100" cy="85" r="14" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>Node Density</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{nodeDensity}</div>
      </div>
      <p className="kn-stat-desc" style={{ fontSize: '0.75rem' }}>
        {description}
      </p>
    </div>
  );
};

export default ConceptualProximityCard;
