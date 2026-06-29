import { FiActivity } from 'react-icons/fi';
import './KeywordsNetworks.css';

const DomainCrossLinksCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="kn-card">
      <div className="kn-card-header" style={{ marginBottom: '16px' }}>
        <h2 className="kn-card-title">Domain Cross-links</h2>
        <FiActivity color="var(--color-neutral-400)" />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          background: '#111827', 
          borderRadius: '8px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '180px',
          marginBottom: '16px',
        }}>
          <div style={{ color: '#EA580C', fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
            {data.linkageRate}
          </div>
          <div style={{ color: 'var(--color-neutral-400)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            INTER-DISCIPLINARY LINKAGE
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)', fontWeight: 'bold' }}>Transfer Rate</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#EA580C' }}>{data.transferRate}</div>
        </div>
        
        <div style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.5' }}>
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default DomainCrossLinksCard;
