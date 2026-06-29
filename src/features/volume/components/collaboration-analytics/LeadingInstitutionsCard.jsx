import './CollaborationAnalytics.css';

const LeadingInstitutionsCard = ({ institutions }) => {
  if (!institutions) return null;

  return (
    <div className="ca-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="ca-card-title" style={{ margin: 0 }}>Leading Institutions</h3>
        <a href="#" style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-primary-600)', textDecoration: 'none' }}>VIEW ALL</a>
      </div>
      <ul className="ca-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {institutions.map((inst, index) => (
          <li key={index} className="ca-list-item" style={{ display: 'flex', alignItems: 'center', padding: '0', border: 'none' }}>
            <div style={{ width: '24px', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-neutral-400)' }}>{inst.rank}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-neutral-800)' }}>{inst.name}</span>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-neutral-800)' }}>{inst.citations} <span style={{ fontWeight: 'normal', color: 'var(--color-neutral-500)' }}>Citations</span></span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-neutral-100)', borderRadius: '2px' }}>
                <div style={{ width: `${inst.citations}%`, height: '100%', backgroundColor: 'var(--color-neutral-700)', borderRadius: '2px' }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadingInstitutionsCard;
