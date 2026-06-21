import "./DeliveryAgent.css";

export default function DeliveryAgent() {
  return (
    <div className="agent-overlay">
      <div className="agent-rig">

        <div className="speech-bubble">Hello Shopper!👋</div>

        <div className="scooter-char">
          <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Dust trail */}
            <ellipse className="dust" cx="15" cy="108" rx="14" ry="4" fill="#c9b896" />
            <ellipse className="dust" cx="5" cy="112" rx="9" ry="3" fill="#c9b896" style={{ animationDelay: "0.2s" }} />

            {/* Scooter body */}
            <path d="M30 100 Q35 80 60 80 L95 80 Q115 80 120 100" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M95 80 L100 55 L112 55" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="55" y="72" width="30" height="10" rx="4" fill="#ff4747" />

            {/* Wheels */}
            <g className="wheel" style={{ transformOrigin: "35px 105px" }}>
              <circle cx="35" cy="105" r="16" fill="#2a2a2a" />
              <circle cx="35" cy="105" r="7" fill="#888" />
              <line x1="35" y1="92" x2="35" y2="118" stroke="#555" strokeWidth="2" />
              <line x1="22" y1="105" x2="48" y2="105" stroke="#555" strokeWidth="2" />
            </g>
            <g className="wheel" style={{ transformOrigin: "115px 105px" }}>
              <circle cx="115" cy="105" r="16" fill="#2a2a2a" />
              <circle cx="115" cy="105" r="7" fill="#888" />
              <line x1="115" y1="92" x2="115" y2="118" stroke="#555" strokeWidth="2" />
              <line x1="102" y1="105" x2="128" y2="105" stroke="#555" strokeWidth="2" />
            </g>

            {/* Delivery box on back */}
            <rect x="20" y="58" width="26" height="24" rx="3" fill="#ffce3d" stroke="#c3520a" strokeWidth="2" />
            <line x1="33" y1="58" x2="33" y2="82" stroke="#c3520a" strokeWidth="2" />

            {/* Character body */}
            <path d="M68 78 Q70 55 80 50 L90 50 Q95 60 92 78 Z" fill="#3a7bd5" />

            {/* Head */}
            <circle cx="82" cy="38" r="14" fill="#f4c19b" />

            {/* Helmet */}
            <path d="M68 36 Q68 22 82 22 Q96 22 96 36 L96 38 Q82 32 68 38 Z" fill="#ff4747" />
            <rect x="78" y="34" width="10" height="6" rx="3" fill="#1a1a1a" opacity="0.3" />

            {/* Face */}
            <circle cx="78" cy="40" r="1.6" fill="#1a1a1a" />
            <circle cx="87" cy="40" r="1.6" fill="#1a1a1a" />
            <path d="M78 46 Q82 49 87 46" stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />

            {/* Waving arm */}
            <g className="wave-arm">
              <path d="M78 58 Q90 50 96 36" stroke="#3a7bd5" strokeWidth="7" fill="none" strokeLinecap="round" />
              <circle cx="97" cy="34" r="6" fill="#f4c19b" />
            </g>

            {/* Static arm on handle */}
            <path d="M88 62 Q98 65 103 58" stroke="#3a7bd5" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="104" cy="57" r="6" fill="#f4c19b" />

          </svg>
        </div>

      </div>
    </div>
  );
}