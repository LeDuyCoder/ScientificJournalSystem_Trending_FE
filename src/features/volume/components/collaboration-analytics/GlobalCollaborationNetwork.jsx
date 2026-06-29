import { useMemo } from 'react';
import './CollaborationAnalytics.css';

const GlobalCollaborationNetwork = ({ data }) => {
  const { nodes, links } = data || {};

  const { nodePositions, svgWidth, svgHeight } = useMemo(() => {
    if (!nodes || !nodes.length) return { nodePositions: {}, svgWidth: 500, svgHeight: 300 };

    const width = 500;
    const height = 300;
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) / 2 - 40;

    const positions = {};
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2; // start from top
      positions[node.id] = {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        ...node
      };
    });

    return { nodePositions: positions, svgWidth: width, svgHeight: height };
  }, [nodes]);

  if (!data || !nodes || !links) return null;

  return (
    <div className="ca-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="ca-card-title" style={{ margin: 0 }}>Global Collaboration Network</h3>
      </div>
      <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '300px' }}>
          {/* Draw Links */}
          {links.map((link, idx) => {
            const sourcePos = nodePositions[link.source];
            const targetPos = nodePositions[link.target];
            if (!sourcePos || !targetPos) return null;
            return (
              <line
                key={`link-${idx}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke="#E5E7EB"
                strokeWidth={Math.max(1, link.value / 2)}
                strokeOpacity="0.8"
              />
            );
          })}
          
          {/* Draw Nodes */}
          {Object.values(nodePositions).map(node => {
            const radius = node.radius || node.size || 15;
            let fill = "#F97316"; // default orange
            if (node.group === 2) fill = "#3B82F6"; // blue
            if (node.group === 3) fill = "#10B981"; // green
            
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill={fill}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
                />
                <text
                  x={node.x}
                  y={node.y + radius + 15}
                  textAnchor="middle"
                  fontSize="12px"
                  fontWeight="600"
                  fill="#4B5563"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F97316' }}></div>
          <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', fontWeight: 600 }}>Active Author</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#111827' }}></div>
          <span style={{ fontSize: '12px', color: 'var(--color-neutral-600)', fontWeight: 600 }}>Institution</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalCollaborationNetwork;
