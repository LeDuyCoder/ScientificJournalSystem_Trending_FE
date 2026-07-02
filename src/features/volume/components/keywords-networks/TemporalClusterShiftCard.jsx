import { FiClock } from 'react-icons/fi';

const TemporalClusterShiftCard = ({ data }) => {
  const heatmap = data?.heatmap || [];
  const driftEntropy = data?.driftEntropy || 'LOW';
  const description = data?.description || 'Clusters are stabilizing around Green Hydrogen and Carbon Capture techs.';

  // If no heatmap data, render a fallback preview grid
  const renderHeatmap = heatmap.length > 0 ? heatmap : Array.from({ length: 56 }, (_, i) => ({
    id: i,
    intensity: Math.round((0.1 + Math.random() * 0.9) * 100) / 100
  }));

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <h2 className="kn-card-title">Temporal Cluster Shift</h2>
        <FiClock className="kn-card-subtitle" />
      </div>

      <div style={{ position: 'relative', margin: '16px 0', padding: '24px', backgroundColor: 'var(--color-neutral-50)', borderRadius: '4px' }}>
        <div className="kn-grid-heatmap">
          {renderHeatmap.map((cell) => {
            const opacity = 0.1 + cell.intensity * 0.9;
            const color = `rgba(249, 115, 22, ${opacity})`; // primary-orange with opacity
            return (
              <div 
                key={cell.id} 
                className="kn-grid-cell"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
        <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'var(--color-white)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.625rem', fontWeight: 700, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', color: 'var(--color-primary-orange)' }}>
          T + 24m Projection
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>Drift Entropy</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-neutral-900)' }}>{driftEntropy}</div>
      </div>
      <p className="kn-stat-desc" style={{ fontSize: '0.75rem' }}>
        {description}
      </p>
    </div>
  );
};

export default TemporalClusterShiftCard;
