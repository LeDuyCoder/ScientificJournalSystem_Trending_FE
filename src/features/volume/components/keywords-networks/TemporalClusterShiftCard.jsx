import { FiClock } from 'react-icons/fi';
import './KeywordsNetworks.css';

const TemporalClusterShiftCard = ({ data }) => {
  if (!data) return null;

  // Map intensity 0-3 to colors
  const getColor = (value) => {
    switch(value) {
      case 3: return '#B45309'; // Dark orange/brown
      case 2: return '#D97706'; // Orange
      case 1: return '#FCD34D'; // Light yellow/orange
      case 0: return '#F3F4F6'; // Light gray
      default: return '#F3F4F6';
    }
  };

  return (
    <div className="kn-card">
      <div className="kn-card-header" style={{ marginBottom: '16px' }}>
        <h2 className="kn-card-title">Temporal Cluster Shift</h2>
        <FiClock color="var(--color-neutral-400)" />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          background: 'var(--color-neutral-50)', 
          borderRadius: '8px', 
          position: 'relative',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '180px',
          marginBottom: '16px',
          padding: '16px'
        }}>
          {/* Heatmap Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '4px',
            width: '100%',
            height: '100%'
          }}>
            {/* Generate some dummy cells based on the matrix and fill the rest */}
            {Array.from({ length: 40 }).map((_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              // Mix the given data into a wider grid
              const val = row < 4 && col < 6 
                ? data.matrix[row][col] 
                : (row * col * 17) % 4;
              
              return (
                <div 
                  key={i} 
                  style={{ 
                    backgroundColor: getColor(val),
                    borderRadius: '2px',
                    width: '100%',
                    paddingBottom: '100%', // Make them square
                    opacity: val === 0 ? 0.5 : 0.8
                  }} 
                />
              );
            })}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#B45309',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {data.projection}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', fontWeight: 'bold' }}>Drift Entropy</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.driftEntropy}</div>
        </div>
        
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.5' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default TemporalClusterShiftCard;
