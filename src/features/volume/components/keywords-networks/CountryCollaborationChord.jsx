const CountryCollaborationChord = () => {
  return (
    <div className="kn-card">
      <div className="kn-card-header">
        <div>
          <h2 className="kn-card-title">Country Collaboration Chord</h2>
          <p className="kn-card-subtitle">Cross-border co-authorship & knowledge exchange</p>
        </div>
      </div>
      <div className="kn-svg-container" style={{ minHeight: '350px' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(200, 200)">
            {/* Outer Arcs */}
            <path d="M -70,-133 A 150,150 0 0,1 125,-82" fill="none" stroke="var(--color-neutral-700)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 135,-65 A 150,150 0 0,1 145,35" fill="none" stroke="var(--color-neutral-500)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 135,65 A 150,150 0 0,1 -10,149" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />
            <path d="M -30,147 A 150,150 0 0,1 -100,111" fill="none" stroke="var(--color-neutral-800)" strokeWidth="8" strokeLinecap="round" />
            <path d="M -115,95 A 150,150 0 0,1 -149,-10" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />
            <path d="M -145,-30 A 150,150 0 0,1 -90,-119" fill="none" stroke="var(--color-primary-orange)" strokeWidth="8" strokeLinecap="round" />

            {/* Chords (Connections) */}
            <path d="M -60,-125 Q 0,0 -135,-20" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1" opacity="0.6" />
            <path d="M 120,-75 Q 0,0 -20,140" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1" opacity="0.5" />
            <path d="M 140,-50 Q 0,0 -120,-10" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1" opacity="0.4" />
            <path d="M 140,20 Q 0,0 -80,110" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1" opacity="0.5" />
            <path d="M 125,75 Q 0,0 -80,-115" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1" opacity="0.6" />
            <path d="M 80,125 Q 0,0 -115,90" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1" opacity="0.4" />
            <path d="M 10,145 Q 0,0 -50,-135" fill="none" stroke="var(--color-primary-orange)" strokeWidth="1" opacity="0.5" />
            <path d="M -135,45 Q 0,0 -10,-140" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1" opacity="0.6" />
            
            {/* Labels */}
            <g transform="translate(0, -170)">
              <rect x="-10" y="-8" width="6" height="6" fill="var(--color-neutral-700)" rx="1" />
              <text x="4" y="0" textAnchor="start" fontSize="9" fill="var(--color-neutral-800)" fontWeight="700">UNITED STATES</text>
            </g>
            <g transform="translate(170, 0)">
              <rect x="-10" y="-8" width="8" height="4" fill="var(--color-neutral-500)" rx="1" />
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
    </div>
  );
};

export default CountryCollaborationChord;
