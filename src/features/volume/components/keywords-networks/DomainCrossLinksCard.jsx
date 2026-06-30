import { FiActivity } from 'react-icons/fi';

const DomainCrossLinksCard = () => {
  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <h2 className="kn-card-title">Domain Cross-links</h2>
        <FiActivity className="kn-card-subtitle" />
      </div>

      <div style={{ backgroundColor: 'var(--color-neutral-900)', color: 'var(--color-white)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '16px 0', padding: '32px 16px', minHeight: '150px' }}>
        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary-orange)' }}>74%</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, marginTop: '8px', textTransform: 'uppercase' }}>INTER-DISCIPLINARY LINKAGE</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>Transfer Rate</div>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-orange)' }}>+12%</div>
      </div>
      <p className="kn-stat-desc" style={{ fontSize: '0.75rem' }}>
        Physics methodologies rapidly colonizing Financial Engineering domains.
      </p>
    </div>
  );
};

export default DomainCrossLinksCard;
