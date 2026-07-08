export const renderMapTooltip = ({
  title,
  subtitle,
  value,
  intensity,
  badgeColor = '#64748b',
}) => `
  <div class="leaflet-custom-tooltip">
    <div class="tooltip-title">${title || 'Unknown'}</div>
    ${subtitle ? `<div class="tooltip-subtitle">${subtitle}</div>` : ''}
    <div class="tooltip-divider"></div>
    <div class="tooltip-row">
      <span class="tooltip-label">Publications:</span>
      <span class="tooltip-value">${value || 'No data'}</span>
    </div>
    <div class="tooltip-row">
      <span class="tooltip-label">Intensity:</span>
      <span class="tooltip-badge" style="background: ${badgeColor}">${intensity || 'No data'}</span>
    </div>
  </div>
`;
