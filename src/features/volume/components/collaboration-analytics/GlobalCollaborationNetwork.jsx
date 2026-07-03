import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import './CollaborationAnalytics.css';

const GlobalCollaborationNetwork = ({ data }) => {
  const fgRef = useRef();
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Quan sát kích thước container để responsive biểu đồ
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setContainerDimensions({ width, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Tự động zoom fit đồ thị khi load xong data, đồng thời cấu hình lực hút/đẩy
  useEffect(() => {
    if (fgRef.current && data && data.nodes.length > 0) {
      // Đợi 1 chút để ForceGraph khởi tạo xong engine mặc định, sau đó ta ghi đè
      const timer = setTimeout(() => {
        if (!fgRef.current) return;
        
        // Giảm lực đẩy xuống mức vừa phải để các cụm (islands) không bị văng quá xa nhau
        fgRef.current.d3Force('charge').strength(-150);
        
        // Giảm độ dài đường nối để các chấm trong cùng 1 cụm đứng gần nhau hơn một chút
        const linkForce = fgRef.current.d3Force('link');
        if (linkForce) {
          linkForce.distance(40);
          linkForce.strength(0.5); 
        }

        // Vẫn giữ bán kính va chạm vật lý để các node tuyệt đối không đè lên nhau
        fgRef.current.d3Force('collide', forceCollide(node => (node.val || 5) * 2 + 10));

        // Bắt buộc engine vật lý "nóng lên" (tính toán lại) với các thông số mới này
        fgRef.current.d3ReheatSimulation();
        // Zoom fit vừa vặn
        fgRef.current.zoomToFit(600, 50); 
      }, 300); // Tăng thời gian chờ lên 300ms để đảm bảo engine đã init hoàn toàn

      return () => clearTimeout(timer);
    }
  }, [data, containerDimensions.width]);

  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.links) || data.nodes.length === 0) {
    return (
      <div className="ca-card">
        <div className="ca-card-header">
          <h3 className="ca-card-title">Global Collaboration Network</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
          No data available for this project.
        </div>
      </div>
    );
  }

  return (
    <div className="ca-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="ca-card-header">
        <h3 className="ca-card-title">Global Collaboration Network</h3>
      </div>
      
      <div className="ca-network-container" ref={containerRef} style={{ flex: 1, position: 'relative', minHeight: '300px', backgroundColor: '#f4f5f7', borderRadius: '8px', overflow: 'hidden', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          {containerDimensions.width > 0 && containerDimensions.height > 0 && (
            <ForceGraph2D
              ref={fgRef}
              width={containerDimensions.width}
              height={containerDimensions.height}
              graphData={data}
              nodeLabel={node => {
                const metric = node.metricValue || Math.floor(Math.random() * 20) + 1;
                // Tạo một vài data giả lập theo yêu cầu để nhìn tooltip chuyên nghiệp hơn
                const hIndex = Math.floor(metric * 1.5 + Math.random() * 5);
                const impact = (metric * 0.8 + Math.random() * 2).toFixed(2);
                
                return `
                  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 12px; min-width: 250px; font-family: 'Inter', sans-serif;">
                    <div style="font-weight: 700; font-size: 14px; color: #1e293b; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                      ${node.label}
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                      <span style="color: #64748b;">Type:</span>
                      <span style="font-weight: 600; color: ${node.type === 'AUTHOR' ? '#ff6b00' : '#1b2432'}">${node.type === 'AUTHOR' ? 'Author' : 'Institution'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                      <span style="color: #64748b;">${node.type === 'AUTHOR' ? 'Articles' : 'Affiliated Authors'}:</span>
                      <span style="font-weight: 500; color: #334155;">${metric}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                      <span style="color: #64748b;">H-Index:</span>
                      <span style="font-weight: 500; color: #334155;">${hIndex}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                      <span style="color: #64748b;">Impact Score:</span>
                      <span style="font-weight: 500; color: #334155;">${impact}</span>
                    </div>
                  </div>
                `;
              }}
              nodeRelSize={2}
              linkColor={() => 'rgba(255, 107, 0, 0.2)'}
              linkWidth={link => Math.max(0.5, link.weight * 2)}
              enableNodeDrag={true}
              enableZoomPanInteraction={true}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.label;
                const size = node.val || 5;
                const color = node.type === 'author' ? '#ff6b00' : '#1b2432';

                // Vẽ hiệu ứng phát sáng (Glow/Shadow)
                ctx.beginPath();
                ctx.arc(node.x, node.y, size * 1.5, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.type === 'author' ? 'rgba(255, 107, 0, 0.15)' : 'rgba(27, 36, 50, 0.15)';
                ctx.fill();

                // Vẽ Node chính
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                ctx.fillStyle = color;
                ctx.fill();
              }}
            />
          )}
        </div>
        
        <div className="ca-network-legend" style={{ position: 'absolute', bottom: '10px', left: '10px', pointerEvents: 'none' }}>
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
