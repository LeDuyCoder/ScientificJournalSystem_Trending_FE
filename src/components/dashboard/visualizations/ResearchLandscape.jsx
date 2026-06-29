import './ResearchLandscape.css';
import { FiShare2 } from 'react-icons/fi';

export default function ResearchLandscape({ data }) {
  // Defensive check for data
  const validData = Array.isArray(data) ? data : [];
  
  // Assign classes sequentially or based on name for specific styling
  const getClassForIndex = (index) => {
    const classes = ['biotech', 'ai', 'materials'];
    return classes[index % classes.length];
  };

  return (
    <div className="research-landscape-container dashboard-card">
      <div className="research-landscape-header">
        <div className="header-title-with-icon">
          <FiShare2 className="header-icon" />
          <h3 className="research-landscape-title">Research Landscape</h3>
        </div>
      </div>
      
      <div className="research-landscape-grid">
        {validData.length > 0 && (
          <div className={`landscape-card ${getClassForIndex(0)}`}>
            <div className="landscape-card-content">
              <span className="landscape-label">{validData[0].name}</span>
              <span className="landscape-value">{validData[0].value}<small>%</small></span>
            </div>
          </div>
        )}
        <div className="landscape-column">
          {validData.slice(1, 3).map((item, index) => (
            <div key={item.name} className={`landscape-card ${getClassForIndex(index + 1)}`}>
              <div className="landscape-card-content">
                <span className="landscape-label">{item.name}</span>
                <span className="landscape-value">{item.value}<small>%</small></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
