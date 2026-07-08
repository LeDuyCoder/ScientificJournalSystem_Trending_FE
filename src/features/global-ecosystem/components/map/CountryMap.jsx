import React, { useCallback } from 'react';
import { GeoJSON } from 'react-leaflet';
import { renderMapTooltip } from './MapTooltip';

const INTENSITY_COLORS = {
  PEAK: '#EA580C',
  HIGH: '#F97316',
  MEDIUM: '#FB923C',
  LOW: '#FFE6C7',
};

const getIntensityColor = (intensity) => {
  if (typeof intensity === 'number') {
    if (intensity > 80) return '#EA580C';
    if (intensity > 60) return '#F97316';
    if (intensity > 40) return '#FB923C';
    return '#FFE6C7';
  }
  return INTENSITY_COLORS[String(intensity)?.toUpperCase()] || '#6B7280';
};

export default function CountryMap({
  provinceData,
  selectedCountry,
  getRegionMatch,
}) {
  const getStyle = useCallback(
    (feature) => {
      const match = getRegionMatch(feature);
      const color = match ? getIntensityColor(match.intensityLabel || match.intensity) : '#6B7280';
      return {
        fillColor: color,
        fillOpacity: 0.95,
        color: '#FFFFFF',
        weight: 0.8,
        opacity: 0.9,
      };
    },
    [getRegionMatch]
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      const props = feature.properties || {};
      const regionName = props.shapeName || props.name || props.NAME_1 || props.NAME_2 || 'Unknown';
      const match = getRegionMatch(feature);

      layer.on({
        mouseover: (e) => {
          e.target.setStyle({
            fillColor: match ? getIntensityColor(match.intensityLabel || match.intensity) : '#9CA3AF',
            color: '#FFFFFF',
            weight: 1.2,
          });
        },
        mouseout: (e) => {
          e.target.setStyle(getStyle(feature));
        },
      });

      const valueText = match ? `${match.count?.toLocaleString() || 0} publications` : 'No data';
      const rankText = match ? (match.intensityLabel || match.intensity || 'No data') : 'No data';
      const badgeColor = match ? getIntensityColor(match.intensityLabel || match.intensity) : '#64748b';

      const html = renderMapTooltip({
        title: regionName,
        subtitle: `Country: ${selectedCountry?.name || ''}`,
        value: valueText,
        intensity: rankText,
        badgeColor,
      });

      layer.bindTooltip(html, { sticky: true, className: 'map-tooltip-container' });
    },
    [getRegionMatch, selectedCountry, getStyle]
  );

  return (
    <GeoJSON
      key={`provinces-${selectedCountry?.code}-${provinceData.features.length}`}
      data={provinceData}
      style={getStyle}
      onEachFeature={onEachFeature}
    />
  );
}
