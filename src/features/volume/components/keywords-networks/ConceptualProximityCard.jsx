import { useTranslation } from 'react-i18next';
import { FiExternalLink } from 'react-icons/fi';

const ConceptualProximityCard = ({ data }) => {
  const { t } = useTranslation();
  const nodes = data?.nodes || [];
  const edges = data?.edges || [];

  const numNodes = nodes.length;
  const numEdges = edges.length;
  const calculatedDensity = numNodes > 1 
    ? Math.round((2 * numEdges) / (numNodes * (numNodes - 1)) * 100) / 100 
    : 0;

  const nodeDensity = data?.nodeDensity ?? (numNodes > 0 ? calculatedDensity : 0);

  const topNodesText = nodes.slice(0, 3).map(n => n.label);
  const description = data?.description || (
    topNodesText.length > 0 
      ? t('volume.thematicCorrelation', { topics: topNodesText.join(', '), defaultValue: `Strong thematic correlation between ${topNodesText.join(', ')} paradigms.` })
      : t('volume.noParadigmsFound', 'No network topology paradigms found for this timeframe.')
  );

  // Layout parameters for visualization
  const width = 200;
  const height = 150;
  
  // Take top 8 nodes for preview layout
  const nodesToRender = nodes.slice(0, 8);
  const nodeMap = new Map();

  nodesToRender.forEach((node, index) => {
    let x, y;
    if (index === 0) {
      // Place main node in the center
      x = width / 2;
      y = height / 2;
    } else {
      // Place others in a circle
      const angle = ((index - 1) / (nodesToRender.length - 1)) * 2 * Math.PI - Math.PI / 2;
      const rx = 60;
      const ry = 40;
      x = width / 2 + rx * Math.cos(angle);
      y = height / 2 + ry * Math.sin(angle);
    }
    nodeMap.set(node.id, { x, y, node });
  });

  const lines = [];
  edges.forEach((edge, idx) => {
    const sourceNode = nodeMap.get(edge.from);
    const targetNode = nodeMap.get(edge.to);
    if (sourceNode && targetNode) {
      lines.push(
        <line 
          key={`edge-${idx}`}
          x1={sourceNode.x} 
          y1={sourceNode.y} 
          x2={targetNode.x} 
          y2={targetNode.y} 
          stroke="var(--color-primary-orange)" 
          strokeWidth={1} 
          strokeOpacity={0.4}
        />
      );
    }
  });

  const circles = Array.from(nodeMap.values()).map(({ x, y, node }, index) => {
    // Map backend node size (range 10 to 40) to SVG radius (3 to 9)
    const radius = Math.max(3.5, Math.min(9, (node.size || 15) / 4.5));
    const fill = index === 0 ? "var(--color-primary-orange)" : "var(--color-neutral-800)";
    return (
      <g key={node.id}>
        <circle 
          cx={x} 
          cy={y} 
          r={radius} 
          fill={fill} 
        />
        {index === 0 && (
          <circle 
            cx={x} 
            cy={y} 
            r={radius + 4} 
            fill="none" 
            stroke="var(--color-primary-orange)" 
            strokeWidth="1" 
            strokeOpacity="0.4" 
          />
        )}
      </g>
    );
  });

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <h2 className="kn-card-title">{t('volume.conceptualProximity', 'Conceptual Proximity')}</h2>
        <FiExternalLink className="kn-card-subtitle" style={{ cursor: 'pointer' }} />
      </div>
      
      <div className="kn-svg-container" style={{ border: '1px solid var(--color-neutral-200)', borderRadius: '4px', margin: '16px 0', backgroundColor: 'var(--color-neutral-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="200" height="150" viewBox="0 0 200 150">
          {nodesToRender.length > 0 ? (
            <>
              {lines}
              {circles}
            </>
          ) : (
            <>
              {/* Clean, dynamic empty-state ring/text */}
              <circle cx="100" cy="75" r="40" fill="none" stroke="var(--color-neutral-300)" strokeWidth="2" strokeDasharray="4, 4" />
              <text x="100" y="79" textAnchor="middle" fill="var(--color-neutral-400)" fontSize="10" fontWeight="600">
                {t('volume.noTopologyData', 'No Topology Data')}
              </text>
            </>
          )}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>{t('volume.nodeDensity', 'Node Density')}</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{nodeDensity}</div>
      </div>
      <p className="kn-stat-desc" style={{ fontSize: '0.75rem' }}>
        {description}
      </p>
    </div>
  );
};

export default ConceptualProximityCard;
