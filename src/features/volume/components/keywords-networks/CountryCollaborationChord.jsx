import './KeywordsNetworks.css';

const CountryCollaborationChord = ({ data }) => {
  if (!data) {
    return <div className="kn-card"><div className="kn-empty">No chord data available</div></div>;
  }

  return (
    <div className="kn-card">
      <div className="kn-card-header" style={{ marginBottom: 0 }}>
        <div>
          <h2 className="kn-card-title">Country Collaboration Chord</h2>
          <div className="kn-card-subtitle">Cross-border co-authorship & knowledge exchange</div>
        </div>
      </div>
      <div className="kn-card-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <svg width="400" height="400" viewBox="-200 -200 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
          {/* Static rendering mimicking the chord diagram */}
          
          {/* Background/Base circle (optional) */}
          
          {/* Inner Chords */}
          {/* CHINA to JAPAN */}
          <path d="M 120 -80 Q -20 -10 -80 -120" fill="none" stroke="#FDBA74" strokeWidth="2" opacity="0.6" />
          <path d="M 120 -80 Q 0 0 -50 120" fill="none" stroke="#D1D5DB" strokeWidth="1" opacity="0.6" />
          
          {/* JAPAN to EU */}
          <path d="M -80 -120 Q -80 0 -60 120" fill="none" stroke="#D1D5DB" strokeWidth="1" opacity="0.6" />
          <path d="M -120 -80 Q 0 0 120 50" fill="none" stroke="#FDBA74" strokeWidth="1" opacity="0.6" />
          
          {/* EU to US */}
          <path d="M -50 120 Q 20 20 120 50" fill="none" stroke="#9CA3AF" strokeWidth="2" opacity="0.4" />
          <path d="M -60 120 Q 0 0 130 -30" fill="none" stroke="#D1D5DB" strokeWidth="1" opacity="0.6" />

          {/* US to CHINA */}
          <path d="M 120 50 Q 80 0 120 -80" fill="none" stroke="#D1D5DB" strokeWidth="1" opacity="0.6" />
          
          
          {/* Arcs */}
          {/* Top Right - CHINA (dark gray) */}
          <path d="M 20 -140 A 140 140 0 0 1 140 -20" fill="none" stroke="#4B5563" strokeWidth="8" strokeLinecap="round" />
          <text x="160" y="-80" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="start">CHINA</text>
          <line x1="140" y1="-80" x2="155" y2="-80" stroke="#9CA3AF" strokeWidth="1" />
          
          {/* Top Left - JAPAN (orange) */}
          <path d="M -20 -140 A 140 140 0 0 0 -140 -20" fill="none" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" />
          <text x="-160" y="-80" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="end">JAPAN</text>
          <line x1="-140" y1="-80" x2="-155" y2="-80" stroke="#9CA3AF" strokeWidth="1" />
          
          {/* Bottom Left - EUROPEAN UNION (dark slate) */}
          <path d="M -140 20 A 140 140 0 0 0 -20 140" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
          <text x="-80" y="170" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="middle">EUROPEAN UNION</text>
          <line x1="-80" y1="140" x2="-80" y2="155" stroke="#9CA3AF" strokeWidth="1" />
          
          {/* Bottom Right - US (orange) */}
          <path d="M 140 20 A 140 140 0 0 1 20 140" fill="none" stroke="#F97316" strokeWidth="8" strokeLinecap="round" />
          <text x="80" y="170" fontSize="10" fontWeight="bold" fill="#374151" textAnchor="middle">US</text>
          <line x1="80" y1="140" x2="80" y2="155" stroke="#9CA3AF" strokeWidth="1" />

        </svg>
      </div>
    </div>
  );
};

export default CountryCollaborationChord;
