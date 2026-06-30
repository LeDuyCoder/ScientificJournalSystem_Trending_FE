import { FiShare2, FiMapPin, FiDownload } from 'react-icons/fi';

const CollaborationInsightsCard = () => {
  return (
    <div className="kn-card" style={{ backgroundColor: 'var(--color-primary-orange)', color: 'var(--color-white)', border: 'none', justifyContent: 'space-between' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary-orange)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', marginBottom: '16px' }}>
          <FiShare2 />
        </div>
        <h2 className="kn-card-title" style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-white)' }}>Collaboration<br />Insights</h2>
        <p style={{ fontSize: '0.875rem', lineHeight: '1.6', opacity: 0.9 }}>
          Global research output has shifted significantly towards multi-national clusters, with Japan and the EU showing the highest reciprocal citation growth of <strong style={{ textDecoration: 'underline' }}>18% YoY</strong>.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <div className="kn-insight-box" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '12px 16px', margin: 0, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="kn-insight-icon" style={{ color: 'var(--color-primary-orange)', width: '20px', height: '20px' }}>
            <FiShare2 size={10} />
          </div>
          <div>
            <div style={{ fontSize: '0.625rem', fontWeight: 700, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMERGING LINK</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>BRICS + Quantum AI</div>
          </div>
        </div>
        
        <div className="kn-insight-box" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '8px', padding: '12px 16px', margin: 0, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="kn-insight-icon" style={{ color: 'var(--color-primary-orange)', width: '20px', height: '20px' }}>
            <FiMapPin size={10} />
          </div>
          <div>
            <div style={{ fontSize: '0.625rem', fontWeight: 700, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CRITICAL NODE</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Ethics in Biotech</div>
          </div>
        </div>
      </div>

      <button className="kn-btn-primary" style={{ backgroundColor: '#1F2937', color: 'white', borderRadius: '6px', padding: '14px', fontSize: '0.875rem' }}>
        Export Raw Matrix <FiDownload style={{ opacity: 0.7 }} />
      </button>
    </div>
  );
};

export default CollaborationInsightsCard;
