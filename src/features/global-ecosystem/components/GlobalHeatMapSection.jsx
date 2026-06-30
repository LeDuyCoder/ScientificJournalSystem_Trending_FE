import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { FiSearch, FiFilter } from 'react-icons/fi';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GlobalHeatMapSection({ data = [] }) {
  const heatMapData = data.reduce((acc, item) => {
    // Comprehensive ISO 3166-1 alpha-2 → react-simple-maps country name mapping
    const nameMap = {
      'US': 'United States of America',
      'GB': 'United Kingdom',
      'UK': 'United Kingdom',
      'VN': 'Vietnam',
      'CN': 'China',
      'JP': 'Japan',
      'KR': 'South Korea',
      'DE': 'Germany',
      'FR': 'France',
      'IT': 'Italy',
      'ES': 'Spain',
      'PT': 'Portugal',
      'NL': 'Netherlands',
      'BE': 'Belgium',
      'CH': 'Switzerland',
      'AT': 'Austria',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland',
      'PL': 'Poland',
      'CZ': 'Czech Republic',
      'RO': 'Romania',
      'HU': 'Hungary',
      'GR': 'Greece',
      'IE': 'Ireland',
      'RU': 'Russia',
      'UA': 'Ukraine',
      'TR': 'Turkey',
      'IN': 'India',
      'PK': 'Pakistan',
      'BD': 'Bangladesh',
      'TH': 'Thailand',
      'MY': 'Malaysia',
      'SG': 'Singapore',
      'ID': 'Indonesia',
      'PH': 'Philippines',
      'TW': 'Taiwan',
      'AU': 'Australia',
      'NZ': 'New Zealand',
      'CA': 'Canada',
      'MX': 'Mexico',
      'BR': 'Brazil',
      'AR': 'Argentina',
      'CL': 'Chile',
      'CO': 'Colombia',
      'PE': 'Peru',
      'ZA': 'South Africa',
      'EG': 'Egypt',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'SA': 'Saudi Arabia',
      'AE': 'United Arab Emirates',
      'IL': 'Israel',
      'IR': 'Iran',
      'IQ': 'Iraq',
    };

    const mappedName = nameMap[item.country] || item.country;
    acc[mappedName] = item.intensity;
    return acc;
  }, {});

  const getFillColor = (geoName) => {
    const intensity = heatMapData[geoName];
    if (!intensity) return '#6B7280';
    
    if (intensity > 80) return '#EA580C';
    if (intensity > 60) return '#F97316';
    if (intensity > 40) return '#FB923C';
    return '#FDBA74';
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
