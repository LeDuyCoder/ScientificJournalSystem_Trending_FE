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

  const defaultLinks = [
    { source: 'US', target: 'China', papers: '4.8k', pct: '42%', growth: '+12%', color: 'var(--color-neutral-700)' },
    { source: 'EU', target: 'US', papers: '3.2k', pct: '28%', growth: '+8%', color: 'var(--color-neutral-800)' },
    { source: 'Japan', target: 'EU', papers: '1.5k', pct: '13%', growth: '+18%', color: 'var(--color-primary-orange)' },
    { source: 'China', target: 'Japan', papers: '2.1k', pct: '17%', growth: '+5%', color: 'var(--color-neutral-500)' },
  ];

  let links = defaultLinks;

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
          <svg style={{ width: '100%', maxWidth: '330px', height: 'auto', display: 'block' }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(200, 200)">
              {/* Outer Arcs */}
              <path d="M -70,-133 A 150,150 0 0,1 125,-82" fill="none" stroke="var(--color-neutral-700)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 135,-65 A 150,150 0 0,1 145,35" fill="none" stroke="var(--color-neutral-50)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 135,65 A 150,150 0 0,1 -10,149" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />
              <path d="M -30,147 A 150,150 0 0,1 -100,111" fill="none" stroke="var(--color-neutral-800)" strokeWidth="8" strokeLinecap="round" />
              <path d="M -115,95 A 150,150 0 0,1 -149,-10" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />
              <path d="M -145,-30 A 150,150 0 0,1 -90,-119" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />

              {/* Chords (Connections) */}
              <path d="M -60,-125 Q 0,0 -135,-20" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1.5" opacity="0.6" />
              <path d="M 120,-75 Q 0,0 -20,140" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1.5" opacity="0.5" />
              <path d="M 140,-50 Q 0,0 -120,-10" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1.5" opacity="0.4" />
              <path d="M 140,20 Q 0,0 -80,110" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1.5" opacity="0.5" />
              <path d="M 125,75 Q 0,0 -80,-115" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1.6" opacity="0.6" />
              <path d="M 80,125 Q 0,0 -115,90" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1.5" opacity="0.4" />
              <path d="M 10,145 Q 0,0 -50,-135" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1.5" opacity="0.5" />
              <path d="M -135,45 Q 0,0 -10,-140" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1.6" opacity="0.6" />
              
              {/* Labels */}
              <g transform="translate(0, -170)">
                <rect x="-10" y="-8" width="6" height="6" fill="var(--color-neutral-700)" rx="1" />
                <text x="4" y="0" textAnchor="start" fontSize="9" fill="var(--color-neutral-800)" fontWeight="700">UNITED STATES</text>
              </g>
              <g transform="translate(170, 0)">
                <rect x="-10" y="-8" width="8" height="4" fill="var(--color-neutral-50)" rx="1" />
                <text x="4" y="0" textAnchor="start" fontSize="9" fill="var(--color-neutral-800)" fontWeight="700">CHINA</text>
              </g>
              <g transform="translate(-30, 180)">
                <rect x="-10" y="-12" width="4" height="8" fill="var(--color-neutral-800)" rx="1" />
                <text x="0" y="0" textAnchor="start" fontSize="9" fill="var(--color-neutral-800)" fontWeight="700">EUROPEAN UNION</text>
              </g>
              <g transform="translate(-170, 40)">
                <rect x="-10" y="-4" width="8" height="2" fill="var(--color-primary-orange)" rx="1" />
                <text x="-16" y="0" textAnchor="end" fontSize="9" fill="var(--color-neutral-800)" fontWeight="700">JAPAN</text>
              </g>
            </g>
          </svg>
        </div>

        {/* Right side: Detailed Stats */}
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '14px', alignSelf: 'stretch', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Primary Collaboration Links
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {links.map((link, idx) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCollaborationChord;
