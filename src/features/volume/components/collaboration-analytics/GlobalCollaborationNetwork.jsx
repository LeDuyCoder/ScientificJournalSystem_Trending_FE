import React from 'react';
import './CollaborationAnalytics.css';

const GlobalCollaborationNetwork = ({ data }) => {
  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h3 className="ca-card-title">Global Collaboration Network</h3>
      </div>
      
      <div className="ca-network-container">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {data.edges.map((edge, i) => {
              const sourceNode = data.nodes.find(n => n.id === edge.source);
              const targetNode = data.nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              return (
                <line
                  key={`edge-${i}`}
                  x1={`${sourceNode.x}%`}
                  y1={`${sourceNode.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke="rgba(255, 107, 0, 0.2)"
                  strokeWidth="1"
                />
              );
            })}
            
            {data.nodes.map(node => (
              <circle
                key={`node-${node.id}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.radius + 2}
                fill={node.type === 'author' ? '#ff6b00' : '#1b2432'}
              />
            ))}
          </svg>
        </div>
        
        <div className="ca-network-legend">
          <div className="ca-legend-item">
            <div className="ca-legend-dot" style={{ backgroundColor: '#ff6b00' }}></div>
            <span>Active Author</span>
          </div>
          <div className="ca-legend-item">
            <div className="ca-legend-dot" style={{ backgroundColor: '#1b2432' }}></div>
            <span>Institution</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCollaborationNetwork;
