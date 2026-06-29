import { FiShare2, FiActivity, FiDownload } from 'react-icons/fi';
import './KeywordsNetworks.css';

const CollaborationInsightsCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="kn-card bg-orange">
      <div style={{ marginBottom: '16px' }}>
        <FiShare2 size={24} color="white" />
      </div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: 'white' }}>
        Collaboration<br />Insights
      </h2>
      
      <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '24px', opacity: 0.9 }}>
        Global research output has shifted significantly towards multi-national clusters, with Japan and the EU showing the highest reciprocal citation growth of <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>5.8x YoY</span>.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'white', borderRadius: '50%', padding: '4px' }}>
            <FiShare2 size={12} color="#EA580C" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.9 }}>EMERGING LINK</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Ethics + Quantum AI</div>
          </div>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'white', borderRadius: '50%', padding: '4px' }}>
            <FiActivity size={12} color="#EA580C" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.9 }}>CRITICAL NODE</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Ethics in Biotech</div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <button style={{ 
          width: '100%', 
          background: '#111827', 
          color: 'white', 
          border: 'none', 
          padding: '12px', 
          borderRadius: '8px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          Export Raw Matrix <FiDownload size={16} />
        </button>
      </div>
    </div>
  );
};

export default CollaborationInsightsCard;
