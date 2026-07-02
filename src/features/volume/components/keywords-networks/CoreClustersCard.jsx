import { FiTrendingUp } from 'react-icons/fi';

const CoreClustersCard = ({ data }) => {
  const topItem = Array.isArray(data) && data[0];
  const label = topItem?.keyword || 'No active clusters';
  const rawVolume = topItem?.volume ?? 0;
  const volume = rawVolume >= 1000 ? `${(rawVolume / 1000).toFixed(1)}k` : String(rawVolume);
  
  const growthNum = topItem?.growth ?? 0;
  const growth = growthNum >= 0 ? `+${growthNum}%` : `${growthNum}%`;

  const percent = Math.min(100, Math.max(0, Math.round((rawVolume / 5000) * 100)));

  return (
    <div className="kn-card" style={{ justifyContent: 'space-between' }}>
      <div>
        <h3 className="kn-card-subtitle" style={{ color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 700, marginBottom: '24px' }}>CORE CLUSTERS</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="kn-stat-huge" style={{ color: 'var(--color-primary-orange)' }}>
              {volume}
            </div>
            <div className="kn-stat-label" style={{ color: 'var(--color-neutral-600)' }}>{label}</div>
          </div>
          {rawVolume > 0 && <FiTrendingUp style={{ color: 'var(--color-primary-orange)', fontSize: '24px' }} />}
        </div>
        
        <div style={{ position: 'relative', margin: '24px 0 16px 0' }}>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-neutral-100)', borderRadius: '2px' }} />
          {rawVolume > 0 && <div style={{ position: 'absolute', top: 0, left: 0, width: `${percent}%`, height: '4px', backgroundColor: 'var(--color-primary-orange)', borderRadius: '2px' }} />}
        </div>
      </div>
      
      <p className="kn-stat-desc" style={{ color: 'var(--color-neutral-500)', fontSize: '0.875rem' }}>
        {topItem ? (
          <>Central nodes show high density in deep learning paradigms with a <strong style={{ color: 'var(--color-primary-orange)' }}>{growth}</strong> growth vector.</>
        ) : (
          <>No active topic clusters detected for this timeframe.</>
        )}
      </p>
    </div>
  );
};

export default CoreClustersCard;
