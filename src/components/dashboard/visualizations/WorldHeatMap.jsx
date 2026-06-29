import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './WorldHeatMap.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldHeatMap({ data = [] }) {
  // Convert array to a lookup map for faster access
  const heatMapData = data.reduce((acc, item) => {
    // Map full names to ISO alpha-3 or commonly used names if needed
    // The data provides country names like 'US', 'China', 'Germany'.
    // world-atlas TopoJSON uses standard names. 
    // We might need to handle name mapping carefully. 
    // 'US' -> 'United States of America'
    // 'UK' -> 'United Kingdom'
    const nameMap = {
      'US': 'United States of America',
      'UK': 'United Kingdom',
    };
    
    const mappedName = nameMap[item.country] || item.country;
    acc[mappedName] = item.intensity;
    return acc;
  }, {});

  // Function to determine fill color based on intensity
  const getFillColor = (geoName) => {
    const intensity = heatMapData[geoName];
    if (!intensity) return '#6B7280'; // Inactive country (light gray / neutral-500)
    
    // Calculate orange shade based on intensity (0-100)
    if (intensity > 80) return '#EA580C'; // Peak
    if (intensity > 60) return '#F97316'; // High
    if (intensity > 40) return '#FB923C'; // Medium
    return '#FDBA74'; // Low
  };

  return (
    <div className="world-heatmap-container dashboard-card">
      <div className="world-heatmap-header">
        <div>
          <h2 className="world-heatmap-title">Geographical Heat Map</h2>
          <p className="world-heatmap-subtitle">Global research output intensity by jurisdiction</p>
        </div>
        <div className="world-heatmap-actions">
          <button className="icon-button" aria-label="Search">
            <FiSearch />
          </button>
          <button className="icon-button" aria-label="Filter">
            <FiFilter />
          </button>
        </div>
      </div>
      
      <div className="world-heatmap-content">
        <div className="map-wrapper">
          <ComposableMap 
            projection="geoEqualEarth"
            className="react-simple-map"
            width={800}
            height={450}
            projectionConfig={{
              scale: 160,
              center: [0, 0]
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName = geo.properties.name;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFillColor(geoName)}
                      stroke="#4B5563"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#F97316', outline: 'none', cursor: 'pointer' },
                        pressed: { fill: '#EA580C', outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          
          <div className="activity-density-legend">
            <span className="legend-title">ACTIVITY DENSITY</span>
            <div className="legend-gradient">
              <div className="gradient-step" style={{ background: '#FDBA74' }}></div>
              <div className="gradient-step" style={{ background: '#FB923C' }}></div>
              <div className="gradient-step" style={{ background: '#F97316' }}></div>
              <div className="gradient-step" style={{ background: '#EA580C' }}></div>
            </div>
            <div className="legend-labels">
              <span>LOW</span>
              <span>PEAK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
