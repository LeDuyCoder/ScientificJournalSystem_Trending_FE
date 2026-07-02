import { FiShuffle } from 'react-icons/fi';

const DomainCrossLinksCard = ({ data }) => {
  const interDisciplinaryLinkage = data?.interDisciplinaryLinkage ?? 0;
  const transferRate = data?.transferRate || '0%';
  const description = data?.description || 'No inter-disciplinary linkage data available for this timeframe.';

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <h2 className="kn-card-title">Domain Cross-links</h2>
        <FiShuffle className="kn-card-subtitle" style={{ cursor: 'pointer' }} />
      </div>
      
      <div style={{ backgroundColor: 'var(--color-neutral-900)', color: 'var(--color-white)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '16px 0', padding: '32px 16px', minHeight: '150px' }}>
        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary-orange)' }}>{interDisciplinaryLinkage}%</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, marginTop: '8px', textTransform: 'uppercase' }}>INTER-DISCIPLINARY LINKAGE</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>Transfer Rate</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-chart-2)' }}>{transferRate}</div>
      </div>
      <p className="kn-stat-desc" style={{ fontSize: '0.75rem' }}>
        {description}
      </p>
    </div>
  );
};

export default DomainCrossLinksCard;
