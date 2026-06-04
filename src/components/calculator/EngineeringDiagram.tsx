'use client';

import { memo } from 'react';
import Icon from '@/components/ui/Icon';

interface EngineeringDiagramProps {
  calcId: string;
  /** Calculated results to scale diagram elements */
  results?: Record<string, number | string>;
}

/**
 * Result-reactive SVG engineering diagrams.
 * Renders per-calculator interactive SVG visualizations
 * that scale with calculated results.
 */
const EngineeringDiagram = memo(function EngineeringDiagram({ calcId, results }: EngineeringDiagramProps) {
  const diagram = DIAGRAMS[calcId];
  if (!diagram) return null;

  return (
    <div className="standalone-section engineering-diagram-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-drafting-compass" />
        </div>
        <div>
          <h2>Interactive Diagram</h2>
          <p>{diagram.label}</p>
        </div>
      </div>

      <div className="standalone-section-body">
        <div style={{
          background: 'var(--bg2)',
          borderRadius: '14px',
          border: '1px solid var(--brd)',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '220px',
          overflow: 'hidden',
        }}>
          {diagram.render(results)}
        </div>
      </div>
    </div>
  );
});

export default EngineeringDiagram;

/* ── Diagram Definitions ───────────────────────────── */

interface DiagramDef {
  label: string;
  render: (results?: Record<string, number | string>) => React.ReactNode;
}

const DIAGRAMS: Record<string, DiagramDef> = {
  beamload: {
    label: 'Simply supported beam with loading',
    render: () => (
      <svg viewBox="0 0 500 220" width="100%" style={{ maxWidth: '500px' }}>
        {/* Supports */}
        <polygon points="60,140 50,165 70,165" fill="var(--p)" opacity="0.8" />
        <polygon points="440,140 430,165 450,165" fill="var(--p)" opacity="0.8" />
        {/* Ground hatching */}
        <line x1="35" y1="168" x2="85" y2="168" stroke="var(--txt2)" strokeWidth="1" />
        {[0,1,2,3,4].map(i => <line key={`h1-${i}`} x1={40+i*10} y1={168} x2={35+i*10} y2={175} stroke="var(--txt2)" strokeWidth="0.8" />)}
        <line x1="415" y1="168" x2="465" y2="168" stroke="var(--txt2)" strokeWidth="1" />
        {[0,1,2,3,4].map(i => <line key={`h2-${i}`} x1={420+i*10} y1={168} x2={415+i*10} y2={175} stroke="var(--txt2)" strokeWidth="0.8" />)}

        {/* Beam */}
        <rect x="55" y="130" width="390" height="10" rx="3" fill="var(--txt)" opacity="0.85" />

        {/* UDL arrows */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`udl-${i}`}>
            <line x1={80 + i * 30} y1="65" x2={80 + i * 30} y2="125" stroke="var(--p)" strokeWidth="1.5" />
            <polygon points={`${80+i*30-4},125 ${80+i*30+4},125 ${80+i*30},133`} fill="var(--p)" />
          </g>
        ))}
        {/* UDL line */}
        <line x1="80" y1="65" x2="410" y2="65" stroke="var(--p)" strokeWidth="2" />

        {/* Labels */}
        <text x="245" y="55" textAnchor="middle" fill="var(--p)" fontSize="13" fontWeight="700">w (UDL)</text>

        {/* Reaction arrows */}
        <line x1="60" y1="195" x2="60" y2="150" stroke="var(--emerald)" strokeWidth="2" />
        <polygon points="56,150 64,150 60,142" fill="var(--emerald)" />
        <text x="60" y="208" textAnchor="middle" fill="var(--emerald)" fontSize="11" fontWeight="600">R₁</text>

        <line x1="440" y1="195" x2="440" y2="150" stroke="var(--emerald)" strokeWidth="2" />
        <polygon points="436,150 444,150 440,142" fill="var(--emerald)" />
        <text x="440" y="208" textAnchor="middle" fill="var(--emerald)" fontSize="11" fontWeight="600">R₂</text>

        {/* Span dimension */}
        <line x1="60" y1="185" x2="440" y2="185" stroke="var(--txt2)" strokeWidth="0.8" strokeDasharray="4,3" />
        <text x="250" y="198" textAnchor="middle" fill="var(--txt2)" fontSize="11" fontWeight="500">L (span)</text>

        {/* Deflection curve */}
        <path d="M60,140 Q250,160 440,140" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7">
          <animate attributeName="d" values="M60,140 Q250,155 440,140;M60,140 Q250,165 440,140;M60,140 Q250,155 440,140" dur="3s" repeatCount="indefinite" />
        </path>
        <text x="250" y="178" textAnchor="middle" fill="var(--amber)" fontSize="10" fontWeight="500">δ_max</text>
      </svg>
    ),
  },

  ohmslaw: {
    label: "Ohm's Law circuit diagram",
    render: () => (
      <svg viewBox="0 0 400 200" width="100%" style={{ maxWidth: '400px' }}>
        {/* Battery */}
        <line x1="60" y1="40" x2="60" y2="160" stroke="var(--txt)" strokeWidth="2" />
        <line x1="60" y1="40" x2="180" y2="40" stroke="var(--txt)" strokeWidth="2" />
        <line x1="60" y1="160" x2="340" y2="160" stroke="var(--txt)" strokeWidth="2" />

        {/* Battery symbol */}
        <line x1="40" y1="85" x2="80" y2="85" stroke="var(--p)" strokeWidth="3" />
        <line x1="48" y1="100" x2="72" y2="100" stroke="var(--p)" strokeWidth="1.5" />
        <line x1="40" y1="115" x2="80" y2="115" stroke="var(--p)" strokeWidth="3" />
        <text x="30" y="105" fill="var(--p)" fontSize="14" fontWeight="700" textAnchor="end">V</text>

        {/* Resistor */}
        <line x1="180" y1="40" x2="210" y2="40" stroke="var(--txt)" strokeWidth="2" />
        <path d="M210,40 L220,25 L240,55 L260,25 L280,55 L300,25 L310,40" fill="none" stroke="var(--amber)" strokeWidth="2" />
        <line x1="310" y1="40" x2="340" y2="40" stroke="var(--txt)" strokeWidth="2" />
        <text x="260" y="18" textAnchor="middle" fill="var(--amber)" fontSize="14" fontWeight="700">R</text>

        {/* Wire down */}
        <line x1="340" y1="40" x2="340" y2="160" stroke="var(--txt)" strokeWidth="2" />

        {/* Current arrow */}
        <path d="M140,30 L160,30" stroke="var(--emerald)" strokeWidth="2" markerEnd="url(#arrowG)" />
        <text x="150" y="24" textAnchor="middle" fill="var(--emerald)" fontSize="12" fontWeight="600">I</text>

        {/* Current flow dots */}
        {[0,1,2].map(i => (
          <circle key={`dot-${i}`} r="3" fill="var(--emerald)" opacity="0.7">
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${i*0.66}s`}>
              <mpath href="#currentPath" />
            </animateMotion>
          </circle>
        ))}
        <path id="currentPath" d="M60,40 L180,40 L340,40 L340,160 L60,160 L60,40" fill="none" stroke="none" />

        {/* Arrow marker */}
        <defs>
          <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--emerald)" />
          </marker>
        </defs>

        {/* V = IR */}
        <text x="200" y="190" textAnchor="middle" fill="var(--txt2)" fontSize="13" fontWeight="600" fontFamily="serif">V = I × R</text>
      </svg>
    ),
  },

  voltdivider: {
    label: 'Voltage divider circuit schematic',
    render: () => (
      <svg viewBox="0 0 350 250" width="100%" style={{ maxWidth: '350px' }}>
        {/* Input wire */}
        <line x1="50" y1="30" x2="175" y2="30" stroke="var(--txt)" strokeWidth="2" />
        <text x="40" y="35" fill="var(--p)" fontSize="13" fontWeight="700" textAnchor="end">V_in</text>

        {/* R1 */}
        <line x1="175" y1="30" x2="175" y2="55" stroke="var(--txt)" strokeWidth="2" />
        <rect x="162" y="55" width="26" height="60" rx="3" fill="none" stroke="var(--amber)" strokeWidth="2" />
        <text x="155" y="90" textAnchor="end" fill="var(--amber)" fontSize="13" fontWeight="700">R₁</text>
        <line x1="175" y1="115" x2="175" y2="130" stroke="var(--txt)" strokeWidth="2" />

        {/* Output node */}
        <circle cx="175" cy="130" r="4" fill="var(--emerald)" />
        <line x1="175" y1="130" x2="300" y2="130" stroke="var(--emerald)" strokeWidth="2" strokeDasharray="5,3" />
        <text x="310" y="135" fill="var(--emerald)" fontSize="13" fontWeight="700">V_out</text>

        {/* R2 */}
        <line x1="175" y1="130" x2="175" y2="145" stroke="var(--txt)" strokeWidth="2" />
        <rect x="162" y="145" width="26" height="60" rx="3" fill="none" stroke="var(--amber)" strokeWidth="2" />
        <text x="155" y="180" textAnchor="end" fill="var(--amber)" fontSize="13" fontWeight="700">R₂</text>
        <line x1="175" y1="205" x2="175" y2="220" stroke="var(--txt)" strokeWidth="2" />

        {/* Ground */}
        <line x1="50" y1="220" x2="175" y2="220" stroke="var(--txt)" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="220" stroke="var(--txt)" strokeWidth="2" />

        {/* Ground symbol */}
        <line x1="100" y1="220" x2="100" y2="230" stroke="var(--txt2)" strokeWidth="1.5" />
        <line x1="88" y1="233" x2="112" y2="233" stroke="var(--txt2)" strokeWidth="2" />
        <line x1="93" y1="238" x2="107" y2="238" stroke="var(--txt2)" strokeWidth="1.5" />
        <line x1="97" y1="243" x2="103" y2="243" stroke="var(--txt2)" strokeWidth="1" />

        {/* Formula */}
        <text x="175" y="248" textAnchor="middle" fill="var(--txt2)" fontSize="11" fontWeight="500">V_out = V_in × R₂/(R₁+R₂)</text>
      </svg>
    ),
  },

  springforce: {
    label: "Hooke's Law spring diagram",
    render: () => (
      <svg viewBox="0 0 400 200" width="100%" style={{ maxWidth: '400px' }}>
        {/* Wall */}
        <rect x="30" y="40" width="10" height="120" fill="var(--txt)" opacity="0.3" rx="2" />
        {[0,1,2,3,4,5].map(i => (
          <line key={`wall-${i}`} x1="30" y1={45+i*20} x2="20" y2={55+i*20} stroke="var(--txt2)" strokeWidth="1" />
        ))}

        {/* Spring coils */}
        <path d="M40,100 L60,100 L70,70 L90,130 L110,70 L130,130 L150,70 L170,130 L190,70 L210,130 L220,100 L240,100" fill="none" stroke="var(--p)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="d" values="M40,100 L60,100 L70,70 L90,130 L110,70 L130,130 L150,70 L170,130 L190,70 L210,130 L220,100 L240,100;M40,100 L60,100 L68,75 L82,125 L96,75 L110,125 L124,75 L138,125 L152,75 L166,125 L173,100 L190,100;M40,100 L60,100 L70,70 L90,130 L110,70 L130,130 L150,70 L170,130 L190,70 L210,130 L220,100 L240,100" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Block */}
        <rect x="240" y="75" width="50" height="50" rx="6" fill="var(--amber)" opacity="0.8">
          <animate attributeName="x" values="240;190;240" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="265" y="105" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">m</text>

        {/* Force arrow */}
        <line x1="300" y1="100" x2="350" y2="100" stroke="var(--emerald)" strokeWidth="2.5">
          <animate attributeName="x1" values="300;250;300" dur="3s" repeatCount="indefinite" />
          <animate attributeName="x2" values="350;300;350" dur="3s" repeatCount="indefinite" />
        </line>
        <polygon points="350,95 350,105 360,100" fill="var(--emerald)">
          <animate attributeName="points" values="350,95 350,105 360,100;300,95 300,105 310,100;350,95 350,105 360,100" dur="3s" repeatCount="indefinite" />
        </polygon>
        <text x="340" y="85" fill="var(--emerald)" fontSize="14" fontWeight="700">F</text>

        {/* Displacement bracket */}
        <line x1="240" y1="140" x2="240" y2="155" stroke="var(--txt2)" strokeWidth="1" />
        <line x1="240" y1="150" x2="280" y2="150" stroke="var(--txt2)" strokeWidth="1" markerEnd="url(#arrowT)" />
        <text x="260" y="168" textAnchor="middle" fill="var(--txt2)" fontSize="12" fontWeight="600">x</text>

        {/* Formula */}
        <text x="200" y="193" textAnchor="middle" fill="var(--txt2)" fontSize="13" fontWeight="600" fontFamily="serif">F = k × x</text>

        <defs>
          <marker id="arrowT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--txt2)" />
          </marker>
        </defs>
      </svg>
    ),
  },

  gearratio: {
    label: 'Meshing gears visualization',
    render: () => (
      <svg viewBox="0 0 400 200" width="100%" style={{ maxWidth: '400px' }}>
        {/* Driving gear (smaller) */}
        <g>
          <circle cx="140" cy="100" r="45" fill="none" stroke="var(--p)" strokeWidth="2" strokeDasharray="8,4">
            <animateTransform attributeName="transform" type="rotate" from="0 140 100" to="360 140 100" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="100" r="8" fill="var(--p)" opacity="0.3" />
          <circle cx="140" cy="100" r="3" fill="var(--p)" />
          <text x="140" y="155" textAnchor="middle" fill="var(--p)" fontSize="12" fontWeight="700">N₁ (driver)</text>
        </g>

        {/* Driven gear (larger) */}
        <g>
          <circle cx="260" cy="100" r="65" fill="none" stroke="var(--amber)" strokeWidth="2" strokeDasharray="10,5">
            <animateTransform attributeName="transform" type="rotate" from="0 260 100" to="-360 260 100" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="260" cy="100" r="10" fill="var(--amber)" opacity="0.3" />
          <circle cx="260" cy="100" r="3" fill="var(--amber)" />
          <text x="260" y="175" textAnchor="middle" fill="var(--amber)" fontSize="12" fontWeight="700">N₂ (driven)</text>
        </g>

        {/* Mesh point */}
        <circle cx="196" cy="100" r="5" fill="var(--emerald)" opacity="0.6">
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Speed labels */}
        <text x="140" y="52" textAnchor="middle" fill="var(--p)" fontSize="11" fontWeight="600">ω₁ (fast)</text>
        <text x="260" y="28" textAnchor="middle" fill="var(--amber)" fontSize="11" fontWeight="600">ω₂ (slow)</text>

        {/* Formula */}
        <text x="200" y="195" textAnchor="middle" fill="var(--txt2)" fontSize="12" fontWeight="600">GR = N₂/N₁ = ω₁/ω₂</text>
      </svg>
    ),
  },

  transformer: {
    label: 'Transformer winding diagram',
    render: () => (
      <svg viewBox="0 0 400 200" width="100%" style={{ maxWidth: '400px' }}>
        {/* Core */}
        <rect x="170" y="30" width="16" height="140" rx="3" fill="var(--txt)" opacity="0.15" />
        <rect x="214" y="30" width="16" height="140" rx="3" fill="var(--txt)" opacity="0.15" />

        {/* Primary winding */}
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={`p-${i}`} cx="155" cy={52 + i * 20} rx="30" ry="8" fill="none" stroke="var(--p)" strokeWidth="2" opacity="0.8" />
        ))}
        <text x="100" y="105" textAnchor="middle" fill="var(--p)" fontSize="13" fontWeight="700">N₁</text>

        {/* Secondary winding */}
        {Array.from({ length: 4 }).map((_, i) => (
          <ellipse key={`s-${i}`} cx="245" cy={62 + i * 26} rx="30" ry="8" fill="none" stroke="var(--amber)" strokeWidth="2" opacity="0.8" />
        ))}
        <text x="300" y="105" textAnchor="middle" fill="var(--amber)" fontSize="13" fontWeight="700">N₂</text>

        {/* Input/Output labels */}
        <text x="80" y="40" fill="var(--p)" fontSize="12" fontWeight="600">V₁</text>
        <text x="310" y="40" fill="var(--amber)" fontSize="12" fontWeight="600">V₂</text>

        {/* Magnetic flux arrows */}
        <path d="M195,60 L195,140" stroke="var(--emerald)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
        <polygon points="192,60 198,60 195,52" fill="var(--emerald)" opacity="0.5" />
        <text x="200" y="190" textAnchor="middle" fill="var(--txt2)" fontSize="12" fontWeight="600">V₁/V₂ = N₁/N₂</text>
      </svg>
    ),
  },
};
