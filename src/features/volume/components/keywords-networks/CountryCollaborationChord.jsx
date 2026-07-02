import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const CountryCollaborationChord = ({ data }) => {
  const COLORS = [
    'var(--color-neutral-700)',
    'var(--color-neutral-800)',
    'var(--color-primary-orange)',
    'var(--color-neutral-500)',
    'var(--color-neutral-600)'
  ];

  let links = [];

  if (Array.isArray(data) && data.length > 0) {
    const total = data.reduce((sum, item) => sum + (item.coAuthorshipValue || 0), 0);
    links = data.map((item, idx) => {
      const formatName = (c) => {
        const lower = c.toLowerCase();
        if (lower === 'united states') return 'US';
        if (lower === 'european union') return 'EU';
        return c.charAt(0).toUpperCase() + lower.slice(1);
      };

      const rawPapers = item.coAuthorshipValue || 0;
      const papers = rawPapers >= 1000 ? `${(rawPapers / 1000).toFixed(1)}k` : String(rawPapers);
      const pct = total > 0 ? `${Math.round((rawPapers / total) * 100)}%` : '0%';

      return {
        source: formatName(item.source),
        target: formatName(item.target),
        papers,
        pct,
        growth: item.growth || '+0%',
        color: COLORS[idx % COLORS.length]
      };
    }).slice(0, 5);
  }

  const uniqueCountries = Array.from(new Set(links.flatMap(l => [l.source, l.target])));
  const countryColorMap = new Map();
  uniqueCountries.forEach((c, idx) => {
    countryColorMap.set(c, COLORS[idx % COLORS.length]);
  });

  const R = 120;
  const countryAngles = new Map();
  uniqueCountries.forEach((c, idx) => {
    const angle = (idx / uniqueCountries.length) * 2 * Math.PI - Math.PI / 2;
    countryAngles.set(c, angle);
  });

  const arcSize = uniqueCountries.length > 0 ? (Math.PI / uniqueCountries.length) * 0.45 : 0.2;

  const arcs = uniqueCountries.map((c) => {
    const angle = countryAngles.get(c);
    const startAngle = angle - arcSize;
    const endAngle = angle + arcSize;
    const x1 = R * Math.cos(startAngle);
    const y1 = R * Math.sin(startAngle);
    const x2 = R * Math.cos(endAngle);
    const y2 = R * Math.sin(endAngle);
    
    const color = countryColorMap.get(c);
    
    // Label placement
    const lx = (R + 25) * Math.cos(angle);
    const ly = (R + 25) * Math.sin(angle);
    
    let textAnchor = 'middle';
    const cosVal = Math.cos(angle);
    if (cosVal > 0.3) textAnchor = 'start';
    else if (cosVal < -0.3) textAnchor = 'end';
    
    return (
      <g key={c}>
        <path 
          d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`} 
          fill="none" 
          stroke={color} 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <text 
          x={lx} 
          y={ly + 3} 
          textAnchor={textAnchor} 
          fontSize="9" 
          fill="var(--color-neutral-800)" 
          fontWeight="700"
        >
          {c.toUpperCase()}
        </text>
      </g>
    );
  });

  const chords = links.map((link, idx) => {
    const angle1 = countryAngles.get(link.source);
    const angle2 = countryAngles.get(link.target);
    if (angle1 === undefined || angle2 === undefined) return null;
    
    const x1 = (R - 6) * Math.cos(angle1);
    const y1 = (R - 6) * Math.sin(angle1);
    const x2 = (R - 6) * Math.cos(angle2);
    const y2 = (R - 6) * Math.sin(angle2);
    
    return (
      <path 
        key={idx} 
        d={`M ${x1} ${y1} Q 0 0 ${x2} ${y2}`} 
        fill="none" 
        stroke={link.color} 
        strokeWidth="2.5" 
        opacity="0.55" 
      />
    );
  });

  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <div>
          <h2 className="kn-card-title">Country Collaboration Chord</h2>
          <p className="kn-card-subtitle">Cross-border co-authorship & knowledge exchange</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px', flexWrap: 'wrap', marginTop: '16px' }}>
        {/* Left side: Chord Diagram */}
        <div style={{ flex: '1 1 330px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {links.length > 0 ? (
            <svg style={{ width: '100%', maxWidth: '330px', height: 'auto', display: 'block' }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(200, 200)">
                {/* Outer Arcs */}
                {arcs}

                {/* Chords (Connections) */}
                {chords}
              </g>
            </svg>
          ) : (
            <svg style={{ width: '100%', maxWidth: '330px', height: 'auto', display: 'block' }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(200, 200)">
                <circle cx="0" cy="0" r="120" fill="none" stroke="var(--color-neutral-300)" strokeWidth="3" strokeDasharray="6, 6" />
                <text x="0" y="5" textAnchor="middle" fill="var(--color-neutral-400)" fontSize="11" fontWeight="700">
                  No Collaboration Data
                </text>
              </g>
            </svg>
          )}
        </div>

        {/* Right side: Detailed Stats */}
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '14px', alignSelf: 'stretch', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Primary Collaboration Links
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {links.length > 0 ? (
              links.map((link, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '10px 14px', 
                    borderRadius: '6px', 
                    backgroundColor: 'var(--color-neutral-50)', 
                    border: '1px solid var(--color-neutral-200)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '4px', height: '16px', backgroundColor: link.color, borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-neutral-800)' }}>
                      {link.source} ↔ {link.target}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-neutral-900)' }}>{link.papers}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-neutral-500)' }}>{link.pct} of total</div>
                    </div>
                    <span 
                      style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: 'var(--color-chart-2)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <FiTrendingUp size={10} /> {link.growth}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--color-neutral-400)', fontSize: '0.8125rem', padding: '24px 12px', textAlign: 'center', border: '1px dashed var(--color-neutral-200)', borderRadius: '6px' }}>
                No country collaboration links found for this timeframe.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCollaborationChord;
