const CoreClustersCard = ({ data }) => {
  if (!data) {
    return <div className="kn-card"><div className="kn-empty">No core clusters data</div></div>;
  }

  return (
    <div className="kn-card">
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Core Clusters
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#D97706' }}>
            {data.metric}
          </div>
          <svg width="40" height="24" viewBox="0 0 40 24">
            <path d="M 0 16 Q 10 16 20 8 T 35 4" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            <path d="M 30 4 L 35 4 L 35 9" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-neutral-800)', marginBottom: '8px' }}>
          {data.label}
        </div>
        
        <div style={{ width: '100%', height: '4px', background: '#D97706', borderRadius: '2px', marginBottom: '24px' }} />
        
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.5' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default CoreClustersCard;
