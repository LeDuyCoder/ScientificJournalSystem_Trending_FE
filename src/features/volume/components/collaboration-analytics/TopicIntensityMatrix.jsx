
import './CollaborationAnalytics.css';

const TopicIntensityMatrix = ({ data }) => {
  if (!data) return null;

  const { rows, columns, values } = data;

  const getColor = (value) => {
    switch (value) {
      case 5: return '#EA580C'; // Highest intensity
      case 4: return '#F97316';
      case 3: return '#FB923C';
      case 2: return '#FDBA74';
      case 1: return '#FED7AA';
      case 0: return '#F3F4F6';
      default: return '#F3F4F6';
    }
  };

  return (
    <div className="ca-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="ca-card-title" style={{ margin: 0 }}>Topic Intensity Matrix</h3>
        <div style={{ display: 'flex', background: 'var(--color-neutral-100)', padding: '2px', borderRadius: '4px' }}>
          <button style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 'bold', border: 'none', background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>AUTHORS</button>
          <button style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 'bold', border: 'none', background: 'transparent', color: 'var(--color-neutral-500)' }}>INSTITUTIONS</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', marginLeft: '80px', gap: '4px' }}>
          {columns.map(col => (
            <div key={col} style={{ flex: 1, textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: 'var(--color-neutral-500)', height: '40px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{col}</div>
          ))}
        </div>
        
        {rows.map((row, i) => (
          <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '76px', fontSize: '11px', fontWeight: 'bold', textAlign: 'right', color: 'var(--color-neutral-600)' }}>{row}</div>
            {values[i].map((val, j) => (
              <div key={j} style={{ flex: 1, height: '48px', backgroundColor: getColor(val), borderRadius: '2px' }} title={`${columns[j]}: ${val}`}></div>
            ))}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-neutral-400)' }}>LOW ACTIVITY</span>
        <div style={{ display: 'flex', gap: '2px', flex: 1, margin: '0 16px' }}>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#F3F4F6' }}></div>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#FED7AA' }}></div>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#FDBA74' }}></div>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#FB923C' }}></div>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#F97316' }}></div>
          <div style={{ height: '8px', flex: 1, backgroundColor: '#EA580C' }}></div>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>HIGH IMPACT</span>
      </div>
    </div>
  );
};

export default TopicIntensityMatrix;
