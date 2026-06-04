'use client';

import React from 'react';

/* ═══════════════════════════════════════════════════
   Calc Labz — Calculator Graphic Component
   Renders unique inline SVG visualizations per calculator.
   
   Tier 1: Custom SVGs for 30 high-traffic calculators
   Tier 2: Category-level template SVGs (10 categories)
   Tier 3: Generic fallback with category icon + color
   ═══════════════════════════════════════════════════ */

interface CalculatorGraphicProps {
  calcId: string;
  category: string;
  variant: 'card' | 'hero';
}

/* ── Category Color Map ─────────────────────────── */
const CAT_COLORS: Record<string, { primary: string; secondary: string; bg: string }> = {
  finance:      { primary: '#3B82F6', secondary: '#60A5FA', bg: 'rgba(59,130,246,.08)' },
  health:       { primary: '#EF4444', secondary: '#FB7185', bg: 'rgba(239,68,68,.08)' },
  math:         { primary: '#6366F1', secondary: '#818CF8', bg: 'rgba(99,102,241,.08)' },
  everyday:     { primary: '#F59E0B', secondary: '#FBBF24', bg: 'rgba(245,158,11,.08)' },
  education:    { primary: '#3B82F6', secondary: '#93C5FD', bg: 'rgba(59,130,246,.08)' },
  engineering:  { primary: '#64748B', secondary: '#94A3B8', bg: 'rgba(100,116,139,.08)' },
  construction: { primary: '#D97706', secondary: '#F59E0B', bg: 'rgba(217,119,6,.08)' },
  datetime:     { primary: '#0EA5E9', secondary: '#38BDF8', bg: 'rgba(14,165,233,.08)' },
  science:      { primary: '#8B5CF6', secondary: '#A78BFA', bg: 'rgba(139,92,246,.08)' },
  unit:         { primary: '#EC4899', secondary: '#F472B6', bg: 'rgba(236,72,153,.08)' },
};

function getColors(category: string) {
  return CAT_COLORS[category] || CAT_COLORS.finance;
}

/* ═══════════════════════════════════════════════════
   TIER 1 — Custom SVGs (30 High-Traffic Calculators)
   ═══════════════════════════════════════════════════ */

function EMIGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Decreasing loan bars */}
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x={8 + i * (w/5 - 2)} y={h - 10 - (h * 0.7 * (1 - i * 0.18))}
          width={w/5 - 6} height={h * 0.7 * (1 - i * 0.18)} rx={3}
          fill={`url(#emiGrad${i})`} className="calc-graphic-bar"
          style={{ animationDelay: `${i * 120}ms` }} />
      ))}
      {/* ₹ symbol */}
      <text x={w/2} y={16} textAnchor="middle" fontSize="12" fontWeight="800" fill="#3B82F6" opacity="0.6"
        fontFamily="system-ui, sans-serif">₹</text>
      {/* Downward trend arrow */}
      <line x1={6} y1={h * 0.22} x2={w - 6} y2={h * 0.72} stroke="#10B981" strokeWidth="2"
        strokeDasharray="4 3" opacity="0.5" className="calc-graphic-draw" />
      <defs>
        {[0,1,2,3,4].map((i) => (
          <linearGradient key={i} id={`emiGrad${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={1 - i * 0.15} />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.4 - i * 0.06} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

function SIPGraphic({ w, h }: { w: number; h: number }) {
  const points = [0,1,2,3,4,5].map((i) => {
    const x = 6 + (i / 5) * (w - 12);
    const y = h - 8 - (Math.pow(i / 5, 1.6) * (h * 0.75));
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sipFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon points={`6,${h - 8} ${points} ${w - 6},${h - 8}`} fill="url(#sipFill)" />
      {/* Growth curve */}
      <polyline points={points} stroke="#10B981" strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" className="calc-graphic-draw" />
      {/* Coin dots */}
      {[1,3,5].map((i) => (
        <circle key={i} cx={6 + (i / 5) * (w - 12)}
          cy={h - 8 - (Math.pow(i / 5, 1.6) * (h * 0.75))}
          r="3.5" fill="#10B981" className="calc-graphic-pulse"
          style={{ animationDelay: `${i * 200}ms` }} />
      ))}
      {/* ₹ arrow indicator */}
      <text x={w - 14} y={14} fontSize="10" fontWeight="700" fill="#10B981" opacity="0.7"
        fontFamily="system-ui, sans-serif">↗</text>
    </svg>
  );
}

function GSTGraphic({ w, h }: { w: number; h: number }) {
  const barH = h * 0.6;
  const taxPortion = barH * 0.18;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base price bar */}
      <rect x={w * 0.2} y={h - 6 - barH + taxPortion} width={w * 0.6} height={barH - taxPortion}
        rx={4} fill="#3B82F6" opacity="0.7" className="calc-graphic-bar" />
      {/* Tax portion */}
      <rect x={w * 0.2} y={h - 6 - barH} width={w * 0.6} height={taxPortion}
        rx={4} fill="#F59E0B" opacity="0.8" className="calc-graphic-bar"
        style={{ animationDelay: '200ms' }} />
      {/* Labels */}
      <text x={w/2} y={h - 10 - barH * 0.45} textAnchor="middle" fontSize="8" fontWeight="700"
        fill="#fff" fontFamily="system-ui, sans-serif">Base</text>
      <text x={w/2} y={h - 6 - barH + taxPortion * 0.7} textAnchor="middle" fontSize="7"
        fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">GST</text>
      {/* Percentage badge */}
      <rect x={w * 0.3} y={4} width={w * 0.4} height={14} rx={7} fill="#F59E0B" opacity="0.2" />
      <text x={w/2} y={14} textAnchor="middle" fontSize="7" fontWeight="700" fill="#F59E0B"
        fontFamily="system-ui, sans-serif">18%</text>
    </svg>
  );
}

function BMIGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gauge arc */}
      <path d={`M ${w * 0.15} ${h * 0.7} A ${w * 0.35} ${w * 0.35} 0 0 1 ${w * 0.85} ${h * 0.7}`}
        stroke="url(#bmiGauge)" strokeWidth="6" strokeLinecap="round" fill="none"
        className="calc-graphic-draw" />
      {/* Gauge needle */}
      <line x1={w/2} y1={h * 0.7} x2={w * 0.58} y2={h * 0.35} stroke="#1E293B"
        strokeWidth="2" strokeLinecap="round" className="calc-graphic-needle" />
      <circle cx={w/2} cy={h * 0.7} r="3" fill="#1E293B" />
      {/* Person silhouette (simplified) */}
      <circle cx={w * 0.15} cy={h * 0.25} r="5" fill="#3B82F6" opacity="0.3" />
      <rect x={w * 0.12} y={h * 0.35} width={6} height={14} rx={3} fill="#3B82F6" opacity="0.2" />
      <defs>
        <linearGradient id="bmiGauge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="40%" stopColor="#10B981" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PercentageGraphic({ w, h }: { w: number; h: number }) {
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.34;
  const pct = 0.65;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} stroke="#E2E8F0" strokeWidth="5" opacity="0.3" />
      {/* Filled arc */}
      <circle cx={cx} cy={cy} r={r} stroke="#6366F1" strokeWidth="5"
        strokeDasharray={`${circ * pct} ${circ * (1 - pct)}`}
        strokeDashoffset={circ * 0.25} strokeLinecap="round"
        className="calc-graphic-sweep" />
      {/* Center text */}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="800"
        fill="#6366F1" fontFamily="system-ui, sans-serif">65%</text>
    </svg>
  );
}

function IncomeTaxGraphic({ w, h }: { w: number; h: number }) {
  const slabs = [0.15, 0.25, 0.35, 0.50, 0.70];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tax slab staircase */}
      {slabs.map((s, i) => (
        <rect key={i} x={4 + i * (w / 5 - 1)} y={h - 6 - s * (h * 0.82)}
          width={w / 5 - 3} height={s * (h * 0.82)} rx={2}
          fill="#3B82F6" opacity={0.3 + i * 0.15}
          className="calc-graphic-bar" style={{ animationDelay: `${i * 100}ms` }} />
      ))}
      {/* Steps line */}
      <polyline points={slabs.map((s, i) =>
        `${4 + i * (w / 5 - 1)},${h - 6 - s * (h * 0.82)}`
      ).join(' ')} stroke="#1E293B" strokeWidth="1.5" fill="none" opacity="0.4"
        strokeDasharray="3 2" />
      {/* Tax label */}
      <text x={w/2} y={12} textAnchor="middle" fontSize="7" fontWeight="700"
        fill="#3B82F6" opacity="0.6" fontFamily="system-ui, sans-serif">TAX SLABS</text>
    </svg>
  );
}

function CompoundInterestGraphic({ w, h }: { w: number; h: number }) {
  // Exponential vs linear curve
  const expPts = [0,1,2,3,4,5].map(i => {
    const x = 6 + (i / 5) * (w - 12);
    const y = h - 8 - (Math.pow(i / 5, 2) * (h * 0.78));
    return `${x},${y}`;
  }).join(' ');
  const linPts = [0,1,2,3,4,5].map(i => {
    const x = 6 + (i / 5) * (w - 12);
    const y = h - 8 - ((i / 5) * (h * 0.45));
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Linear (SI) */}
      <polyline points={linPts} stroke="#94A3B8" strokeWidth="1.5" fill="none"
        strokeDasharray="4 3" opacity="0.5" />
      {/* Exponential (CI) */}
      <polyline points={expPts} stroke="#3B82F6" strokeWidth="2.5" fill="none"
        strokeLinecap="round" className="calc-graphic-draw" />
      {/* Gap indicator */}
      <line x1={w - 10} y1={h - 8 - h * 0.45} x2={w - 10} y2={h - 8 - h * 0.78}
        stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
      {/* Labels */}
      <text x={w - 6} y={h * 0.2} textAnchor="end" fontSize="6" fill="#3B82F6"
        fontWeight="600" fontFamily="system-ui, sans-serif">CI</text>
      <text x={w - 6} y={h * 0.5} textAnchor="end" fontSize="6" fill="#94A3B8"
        fontWeight="600" fontFamily="system-ui, sans-serif">SI</text>
    </svg>
  );
}

function CAGRGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cagrFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Smooth growth curve */}
      <path d={`M 6 ${h - 8} Q ${w * 0.3} ${h - 12} ${w * 0.5} ${h * 0.45} T ${w - 6} ${h * 0.15}`}
        stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round"
        className="calc-graphic-draw" />
      {/* Area under curve */}
      <path d={`M 6 ${h - 8} Q ${w * 0.3} ${h - 12} ${w * 0.5} ${h * 0.45} T ${w - 6} ${h * 0.15} L ${w - 6} ${h - 8} Z`}
        fill="url(#cagrFill)" opacity="0.6" />
      {/* Start/End dots */}
      <circle cx={8} cy={h - 10} r="3" fill="#94A3B8" />
      <circle cx={w - 8} cy={h * 0.15} r="3.5" fill="#10B981" className="calc-graphic-pulse" />
    </svg>
  );
}

function PPFGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Piggy bank shape (simplified) */}
      <ellipse cx={w * 0.4} cy={h * 0.55} rx={w * 0.28} ry={h * 0.3}
        fill="#3B82F6" opacity="0.15" />
      <ellipse cx={w * 0.4} cy={h * 0.55} rx={w * 0.28} ry={h * 0.3}
        stroke="#3B82F6" strokeWidth="1.5" opacity="0.4" />
      {/* Coin slot */}
      <rect x={w * 0.33} y={h * 0.25} width={w * 0.14} height={3} rx={1.5}
        fill="#3B82F6" opacity="0.6" />
      {/* Growing coin stacks on the right */}
      {[0,1,2].map(i => (
        <React.Fragment key={i}>
          <circle cx={w * 0.75 + i * 6} cy={h - 10 - i * 10} r="5"
            fill="#F59E0B" opacity={0.4 + i * 0.2}
            className="calc-graphic-pulse" style={{ animationDelay: `${i * 300}ms` }} />
          <text x={w * 0.75 + i * 6} y={h - 7 - i * 10} textAnchor="middle"
            fontSize="5" fontWeight="800" fill="#92400E"
            fontFamily="system-ui, sans-serif">₹</text>
        </React.Fragment>
      ))}
    </svg>
  );
}

function MortgageGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House shape */}
      <path d={`M ${w * 0.5} ${h * 0.15} L ${w * 0.2} ${h * 0.45} L ${w * 0.2} ${h * 0.82} L ${w * 0.8} ${h * 0.82} L ${w * 0.8} ${h * 0.45} Z`}
        fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.15" />
      {/* Roof */}
      <path d={`M ${w * 0.15} ${h * 0.45} L ${w * 0.5} ${h * 0.12} L ${w * 0.85} ${h * 0.45}`}
        stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door */}
      <rect x={w * 0.42} y={h * 0.55} width={w * 0.16} height={h * 0.27} rx={2}
        fill="#3B82F6" opacity="0.25" />
      {/* ₹ on door */}
      <text x={w * 0.5} y={h * 0.73} textAnchor="middle" fontSize="10" fontWeight="800"
        fill="#3B82F6" opacity="0.5" fontFamily="system-ui, sans-serif">₹</text>
    </svg>
  );
}

function HRAGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rent split */}
      <rect x={6} y={h * 0.3} width={w * 0.4} height={h * 0.55} rx={4}
        fill="#3B82F6" stroke="#3B82F6" strokeWidth="1" opacity="0.2" />
      <text x={w * 0.23} y={h * 0.55} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#3B82F6" fontFamily="system-ui, sans-serif">HRA</text>
      <rect x={w * 0.52} y={h * 0.3} width={w * 0.4} height={h * 0.55} rx={4}
        fill="#10B981" stroke="#10B981" strokeWidth="1" opacity="0.2" />
      <text x={w * 0.72} y={h * 0.55} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#10B981" fontFamily="system-ui, sans-serif">Exempt</text>
      {/* Arrow */}
      <path d={`M ${w * 0.43} ${h * 0.57} L ${w * 0.52} ${h * 0.57}`}
        stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arrowHRA)" />
      <defs>
        <marker id="arrowHRA" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="#64748B" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
}

function TaxRegimeGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Old regime bar */}
      <rect x={w * 0.1} y={h * 0.25} width={w * 0.32} height={h * 0.6} rx={4}
        fill="#F59E0B" opacity="0.25" className="calc-graphic-bar" />
      <text x={w * 0.26} y={h * 0.18} textAnchor="middle" fontSize="6" fontWeight="700"
        fill="#F59E0B" fontFamily="system-ui, sans-serif">OLD</text>
      {/* New regime bar (shorter = better) */}
      <rect x={w * 0.58} y={h * 0.4} width={w * 0.32} height={h * 0.45} rx={4}
        fill="#10B981" opacity="0.25" className="calc-graphic-bar"
        style={{ animationDelay: '150ms' }} />
      <text x={w * 0.74} y={h * 0.33} textAnchor="middle" fontSize="6" fontWeight="700"
        fill="#10B981" fontFamily="system-ui, sans-serif">NEW</text>
      {/* VS divider */}
      <text x={w * 0.5} y={h * 0.58} textAnchor="middle" fontSize="8" fontWeight="800"
        fill="#64748B" opacity="0.4" fontFamily="system-ui, sans-serif">VS</text>
    </svg>
  );
}

function AgeGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Timeline */}
      <line x1={10} y1={h / 2} x2={w - 10} y2={h / 2} stroke="#E2E8F0" strokeWidth="2" />
      {/* Birth dot */}
      <circle cx={14} cy={h / 2} r="4" fill="#3B82F6" />
      <text x={14} y={h / 2 - 10} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#3B82F6" fontFamily="system-ui, sans-serif">Born</text>
      {/* Today dot */}
      <circle cx={w - 14} cy={h / 2} r="4" fill="#10B981" className="calc-graphic-pulse" />
      <text x={w - 14} y={h / 2 - 10} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#10B981" fontFamily="system-ui, sans-serif">Today</text>
      {/* Tick marks */}
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1={10 + p * (w - 20)} y1={h / 2 - 4} x2={10 + p * (w - 20)} y2={h / 2 + 4}
          stroke="#94A3B8" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function TDEEGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame icon */}
      <path d={`M ${w/2} ${h * 0.12} C ${w * 0.6} ${h * 0.3} ${w * 0.72} ${h * 0.55} ${w * 0.65} ${h * 0.75} C ${w * 0.6} ${h * 0.85} ${w * 0.4} ${h * 0.85} ${w * 0.35} ${h * 0.75} C ${w * 0.28} ${h * 0.55} ${w * 0.4} ${h * 0.3} ${w/2} ${h * 0.12}`}
        fill="url(#flameGrad)" opacity="0.7" className="calc-graphic-pulse" />
      {/* Energy meter lines */}
      {[0.3, 0.5, 0.7].map((p, i) => (
        <line key={i} x1={w * 0.15} y1={h * p} x2={w * 0.25} y2={h * p}
          stroke="#EF4444" strokeWidth="2" opacity={0.3 + i * 0.2} strokeLinecap="round" />
      ))}
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function QuadraticGraphic({ w, h }: { w: number; h: number }) {
  // Parabola y = x^2
  const pts = [];
  for (let i = 0; i <= 20; i++) {
    const t = (i / 20) * 2 - 1; // -1 to 1
    const x = 8 + ((t + 1) / 2) * (w - 16);
    const y = h * 0.85 - (1 - t * t) * (h * 0.7);
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1={w/2} y1={6} x2={w/2} y2={h - 4} stroke="#E2E8F0" strokeWidth="1" />
      <line x1={4} y1={h * 0.85} x2={w - 4} y2={h * 0.85} stroke="#E2E8F0" strokeWidth="1" />
      {/* Parabola */}
      <polyline points={pts.join(' ')} stroke="#6366F1" strokeWidth="2" fill="none"
        strokeLinecap="round" className="calc-graphic-draw" />
      {/* Roots */}
      <circle cx={8} cy={h * 0.85} r="3" fill="#EF4444" opacity="0.7" />
      <circle cx={w - 8} cy={h * 0.85} r="3" fill="#EF4444" opacity="0.7" />
      {/* Vertex */}
      <circle cx={w/2} cy={h * 0.15} r="3" fill="#6366F1" className="calc-graphic-pulse" />
    </svg>
  );
}

function TriangleGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={`${w/2},${h * 0.1} ${w * 0.12},${h * 0.85} ${w * 0.88},${h * 0.85}`}
        fill="#6366F1" opacity="0.08" stroke="#6366F1" strokeWidth="2"
        strokeLinejoin="round" className="calc-graphic-draw" />
      {/* Side labels */}
      <text x={w * 0.24} y={h * 0.5} fontSize="7" fontWeight="600" fill="#6366F1"
        opacity="0.6" fontFamily="system-ui, sans-serif" transform={`rotate(-55 ${w * 0.24} ${h * 0.5})`}>a</text>
      <text x={w * 0.76} y={h * 0.5} fontSize="7" fontWeight="600" fill="#6366F1"
        opacity="0.6" fontFamily="system-ui, sans-serif" transform={`rotate(55 ${w * 0.76} ${h * 0.5})`}>b</text>
      <text x={w/2} y={h * 0.95} textAnchor="middle" fontSize="7" fontWeight="600"
        fill="#6366F1" opacity="0.6" fontFamily="system-ui, sans-serif">c</text>
      {/* Angle arcs */}
      <path d={`M ${w * 0.2} ${h * 0.78} A 8 8 0 0 1 ${w * 0.25} ${h * 0.85}`}
        stroke="#10B981" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function DateDiffGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calendar 1 */}
      <rect x={4} y={h * 0.2} width={w * 0.35} height={h * 0.6} rx={4}
        fill="#0EA5E9" stroke="#0EA5E9" strokeWidth="1" opacity="0.15" />
      <rect x={4} y={h * 0.2} width={w * 0.35} height={h * 0.18} rx={4}
        fill="#0EA5E9" opacity="0.3" />
      {/* Calendar 2 */}
      <rect x={w * 0.6} y={h * 0.2} width={w * 0.35} height={h * 0.6} rx={4}
        fill="#0EA5E9" stroke="#0EA5E9" strokeWidth="1" opacity="0.15" />
      <rect x={w * 0.6} y={h * 0.2} width={w * 0.35} height={h * 0.18} rx={4}
        fill="#0EA5E9" opacity="0.3" />
      {/* Arrow between */}
      <line x1={w * 0.42} y1={h / 2} x2={w * 0.58} y2={h / 2}
        stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <path d={`M ${w * 0.55} ${h / 2 - 4} L ${w * 0.58} ${h / 2} L ${w * 0.55} ${h / 2 + 4}`}
        stroke="#0EA5E9" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Days label */}
      <text x={w/2} y={h * 0.9} textAnchor="middle" fontSize="7" fontWeight="700"
        fill="#0EA5E9" opacity="0.6" fontFamily="system-ui, sans-serif">DAYS</text>
    </svg>
  );
}

function TipGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Receipt */}
      <rect x={w * 0.2} y={h * 0.08} width={w * 0.6} height={h * 0.7} rx={4}
        fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" opacity="0.12" />
      {/* Lines on receipt */}
      {[0.25, 0.4, 0.55].map((p, i) => (
        <line key={i} x1={w * 0.28} y1={h * p} x2={w * 0.72} y2={h * p}
          stroke="#F59E0B" strokeWidth="1" opacity={0.2 + i * 0.1} />
      ))}
      {/* Tip highlight */}
      <rect x={w * 0.28} y={h * 0.62} width={w * 0.44} height={10} rx={2}
        fill="#F59E0B" opacity="0.2" />
      <text x={w/2} y={h * 0.7} textAnchor="middle" fontSize="6" fontWeight="700"
        fill="#F59E0B" fontFamily="system-ui, sans-serif">+ TIP</text>
      {/* Coin */}
      <circle cx={w * 0.75} cy={h * 0.85} r="7" fill="#F59E0B" opacity="0.3"
        className="calc-graphic-pulse" />
      <text x={w * 0.75} y={h * 0.88} textAnchor="middle" fontSize="7" fontWeight="800"
        fill="#92400E" fontFamily="system-ui, sans-serif">₹</text>
    </svg>
  );
}

function DiscountGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Price tag shape */}
      <path d={`M ${w * 0.15} ${h * 0.5} L ${w * 0.35} ${h * 0.2} L ${w * 0.85} ${h * 0.2} L ${w * 0.85} ${h * 0.8} L ${w * 0.35} ${h * 0.8} Z`}
        fill="#10B981" stroke="#10B981" strokeWidth="1.5" opacity="0.18" />
      {/* Hole in tag */}
      <circle cx={w * 0.38} cy={h * 0.5} r="3" fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
      {/* Crossed-out price */}
      <text x={w * 0.6} y={h * 0.42} textAnchor="middle" fontSize="8" fontWeight="600"
        fill="#94A3B8" fontFamily="system-ui, sans-serif" textDecoration="line-through">₹500</text>
      {/* New price */}
      <text x={w * 0.6} y={h * 0.65} textAnchor="middle" fontSize="10" fontWeight="800"
        fill="#10B981" fontFamily="system-ui, sans-serif">₹350</text>
    </svg>
  );
}

function FuelGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fuel pump (simplified) */}
      <rect x={w * 0.25} y={h * 0.15} width={w * 0.35} height={h * 0.7} rx={5}
        fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5" opacity="0.15" />
      {/* Fuel level */}
      <rect x={w * 0.3} y={h * 0.4} width={w * 0.25} height={h * 0.4} rx={3}
        fill="#F59E0B" opacity="0.25" className="calc-graphic-bar" />
      {/* Nozzle */}
      <path d={`M ${w * 0.6} ${h * 0.3} L ${w * 0.72} ${h * 0.25} L ${w * 0.72} ${h * 0.5} L ${w * 0.78} ${h * 0.55}`}
        stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Drop */}
      <circle cx={w * 0.78} cy={h * 0.65} r="3" fill="#F59E0B" opacity="0.5"
        className="calc-graphic-pulse" />
    </svg>
  );
}

function ROIGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arrow going up */}
      <path d={`M ${w * 0.15} ${h * 0.82} Q ${w * 0.4} ${h * 0.6} ${w * 0.55} ${h * 0.4} T ${w * 0.85} ${h * 0.15}`}
        stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round"
        className="calc-graphic-draw" />
      {/* Arrow head */}
      <polygon points={`${w * 0.82},${h * 0.08} ${w * 0.88},${h * 0.18} ${w * 0.78},${h * 0.2}`}
        fill="#10B981" />
      {/* % badge */}
      <rect x={w * 0.1} y={h * 0.08} width={w * 0.3} height={14} rx={7}
        fill="#10B981" opacity="0.15" />
      <text x={w * 0.25} y={h * 0.08 + 10} textAnchor="middle" fontSize="7" fontWeight="700"
        fill="#10B981" fontFamily="system-ui, sans-serif">+50%</text>
    </svg>
  );
}

function FDGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vault door */}
      <rect x={w * 0.2} y={h * 0.12} width={w * 0.6} height={h * 0.76} rx={6}
        fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.12" />
      {/* Handle */}
      <circle cx={w / 2} cy={h * 0.5} r={h * 0.18} fill="none"
        stroke="#3B82F6" strokeWidth="2" opacity="0.3" />
      <circle cx={w / 2} cy={h * 0.5} r={2} fill="#3B82F6" opacity="0.5" />
      {/* Interest growing */}
      <text x={w / 2} y={h * 0.93} textAnchor="middle" fontSize="7" fontWeight="700"
        fill="#3B82F6" opacity="0.5" fontFamily="system-ui, sans-serif">6.5% p.a.</text>
    </svg>
  );
}

function NPSGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path d={`M ${w/2} ${h * 0.08} L ${w * 0.2} ${h * 0.25} L ${w * 0.2} ${h * 0.6} Q ${w * 0.2} ${h * 0.9} ${w/2} ${h * 0.95} Q ${w * 0.8} ${h * 0.9} ${w * 0.8} ${h * 0.6} L ${w * 0.8} ${h * 0.25} Z`}
        fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.15" />
      {/* Checkmark inside */}
      <path d={`M ${w * 0.35} ${h * 0.52} L ${w * 0.45} ${h * 0.65} L ${w * 0.65} ${h * 0.38}`}
        stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round"
        strokeLinejoin="round" className="calc-graphic-draw" />
    </svg>
  );
}

function SalaryHikeGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Before bar */}
      <rect x={w * 0.12} y={h * 0.4} width={w * 0.3} height={h * 0.5} rx={4}
        fill="#94A3B8" opacity="0.2" className="calc-graphic-bar" />
      <text x={w * 0.27} y={h * 0.35} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#94A3B8" fontFamily="system-ui, sans-serif">Before</text>
      {/* After bar (taller) */}
      <rect x={w * 0.58} y={h * 0.18} width={w * 0.3} height={h * 0.72} rx={4}
        fill="#10B981" opacity="0.2" className="calc-graphic-bar"
        style={{ animationDelay: '150ms' }} />
      <text x={w * 0.73} y={h * 0.13} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#10B981" fontFamily="system-ui, sans-serif">After</text>
      {/* +15% badge */}
      <text x={w / 2} y={h * 0.95} textAnchor="middle" fontSize="7" fontWeight="700"
        fill="#10B981" fontFamily="system-ui, sans-serif">↑ 15%</text>
    </svg>
  );
}

function InHandSalaryGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack segments: CTC breakdown */}
      <rect x={w * 0.15} y={h * 0.08} width={w * 0.7} height={h * 0.22} rx={3}
        fill="#94A3B8" opacity="0.15" />
      <text x={w/2} y={h * 0.22} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#94A3B8" fontFamily="system-ui, sans-serif">PF + Tax</text>
      <rect x={w * 0.15} y={h * 0.33} width={w * 0.7} height={h * 0.55} rx={3}
        fill="#10B981" opacity="0.15" />
      <text x={w/2} y={h * 0.63} textAnchor="middle" fontSize="8" fontWeight="700"
        fill="#10B981" fontFamily="system-ui, sans-serif">In-Hand</text>
      {/* Arrow pointing to in-hand */}
      <path d={`M ${w * 0.9} ${h * 0.6} L ${w * 0.87} ${h * 0.6}`}
        stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SimpleInterestGraphic({ w, h }: { w: number; h: number }) {
  const pts = [0,1,2,3,4,5].map(i => {
    const x = 6 + (i / 5) * (w - 12);
    const y = h - 8 - ((i / 5) * (h * 0.7));
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points={pts} stroke="#3B82F6" strokeWidth="2.5" fill="none"
        strokeLinecap="round" className="calc-graphic-draw" />
      <text x={w - 10} y={h * 0.2} fontSize="7" fontWeight="700" fill="#3B82F6"
        opacity="0.6" fontFamily="system-ui, sans-serif">SI</text>
      {/* Baseline */}
      <line x1={6} y1={h - 8} x2={w - 6} y2={h - 8} stroke="#E2E8F0" strokeWidth="1" />
    </svg>
  );
}

function GratuityGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handshake icon */}
      <path d={`M ${w * 0.15} ${h * 0.55} C ${w * 0.25} ${h * 0.35} ${w * 0.4} ${h * 0.4} ${w * 0.5} ${h * 0.45} C ${w * 0.6} ${h * 0.4} ${w * 0.75} ${h * 0.35} ${w * 0.85} ${h * 0.55}`}
        stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Years bar */}
      <rect x={w * 0.15} y={h * 0.7} width={w * 0.7} height={6} rx={3}
        fill="#E2E8F0" />
      <rect x={w * 0.15} y={h * 0.7} width={w * 0.5} height={6} rx={3}
        fill="#3B82F6" opacity="0.5" className="calc-graphic-bar" />
      <text x={w/2} y={h * 0.92} textAnchor="middle" fontSize="6" fontWeight="600"
        fill="#64748B" fontFamily="system-ui, sans-serif">Years of Service</text>
    </svg>
  );
}

function RDGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monthly deposit coins stacking up */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={w * 0.25} y={h * 0.78 - i * (h * 0.14)} width={w * 0.5} height={h * 0.11}
          rx={h * 0.055} fill="#3B82F6" opacity={0.15 + i * 0.1}
          className="calc-graphic-bar" style={{ animationDelay: `${i * 100}ms` }} />
      ))}
      {/* ₹ on each */}
      {[0,2,4].map(i => (
        <text key={i} x={w/2} y={h * 0.85 - i * (h * 0.14)} textAnchor="middle"
          fontSize="6" fontWeight="700" fill="#3B82F6" opacity="0.5"
          fontFamily="system-ui, sans-serif">₹</text>
      ))}
    </svg>
  );
}

function SleepGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Moon */}
      <path d={`M ${w * 0.55} ${h * 0.15} A ${w * 0.22} ${w * 0.22} 0 1 0 ${w * 0.55} ${h * 0.65} A ${w * 0.16} ${w * 0.16} 0 1 1 ${w * 0.55} ${h * 0.15}`}
        fill="#6366F1" opacity="0.2" />
      {/* Zzz */}
      <text x={w * 0.7} y={h * 0.25} fontSize="10" fontWeight="800" fill="#6366F1" opacity="0.5"
        fontFamily="system-ui, sans-serif" className="calc-graphic-float">Z</text>
      <text x={w * 0.78} y={h * 0.38} fontSize="7" fontWeight="700" fill="#6366F1" opacity="0.3"
        fontFamily="system-ui, sans-serif" className="calc-graphic-float"
        style={{ animationDelay: '400ms' }}>z</text>
    </svg>
  );
}

function WaterGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glass */}
      <path d={`M ${w * 0.25} ${h * 0.12} L ${w * 0.3} ${h * 0.88} L ${w * 0.7} ${h * 0.88} L ${w * 0.75} ${h * 0.12}`}
        fill="none" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.3" />
      {/* Water level */}
      <path d={`M ${w * 0.29} ${h * 0.45} Q ${w * 0.4} ${h * 0.4} ${w * 0.5} ${h * 0.45} T ${w * 0.71} ${h * 0.45} L ${w * 0.7} ${h * 0.88} L ${w * 0.3} ${h * 0.88} Z`}
        fill="#0EA5E9" opacity="0.15" />
      {/* Drops */}
      <circle cx={w * 0.5} cy={h * 0.05} r="2.5" fill="#0EA5E9" opacity="0.4"
        className="calc-graphic-pulse" />
    </svg>
  );
}

function CaloriesGraphic({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plate */}
      <ellipse cx={w/2} cy={h * 0.55} rx={w * 0.38} ry={h * 0.3}
        fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.25" />
      <ellipse cx={w/2} cy={h * 0.55} rx={w * 0.28} ry={h * 0.2}
        fill="#EF4444" opacity="0.06" />
      {/* kcal text */}
      <text x={w/2} y={h * 0.58} textAnchor="middle" fontSize="8" fontWeight="800"
        fill="#EF4444" opacity="0.5" fontFamily="system-ui, sans-serif">kcal</text>
      {/* Steam lines */}
      {[0.38, 0.5, 0.62].map((p, i) => (
        <line key={i} x1={w * p} y1={h * 0.22} x2={w * p} y2={h * 0.12}
          stroke="#EF4444" strokeWidth="1.5" opacity="0.2" strokeLinecap="round"
          className="calc-graphic-float" style={{ animationDelay: `${i * 200}ms` }} />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   TIER 1 — Calc ID → SVG Mapper
   ═══════════════════════════════════════════════════ */
const TIER1_MAP: Record<string, React.FC<{ w: number; h: number }>> = {
  emi: EMIGraphic,
  carloan: EMIGraphic,
  mortgage: MortgageGraphic,
  sip: SIPGraphic,
  stepupsip: SIPGraphic,
  goalsip: SIPGraphic,
  gst: GSTGraphic,
  pregst: GSTGraphic,
  bmi: BMIGraphic,
  percentage: PercentageGraphic,
  incometax: IncomeTaxGraphic,
  advancetax: IncomeTaxGraphic,
  compoundinterest: CompoundInterestGraphic,
  simpleinterest: SimpleInterestGraphic,
  cagr: CAGRGraphic,
  roi: ROIGraphic,
  ppf: PPFGraphic,
  fd: FDGraphic,
  rd: RDGraphic,
  nps: NPSGraphic,
  hra: HRAGraphic,
  taxregime: TaxRegimeGraphic,
  age: AgeGraphic,
  tdee: TDEEGraphic,
  bmr: TDEEGraphic,
  calories: CaloriesGraphic,
  caloriedeficit: CaloriesGraphic,
  salaryhike: SalaryHikeGraphic,
  inhandsalary: InHandSalaryGraphic,
  ctcbreakup: InHandSalaryGraphic,
  tip: TipGraphic,
  tipsplit: TipGraphic,
  discount: DiscountGraphic,
  fuel: FuelGraphic,
  quadratic: QuadraticGraphic,
  triangleArea: TriangleGraphic,
  datediff: DateDiffGraphic,
  countdown: DateDiffGraphic,
  gratuity: GratuityGraphic,
  sleep: SleepGraphic,
  water: WaterGraphic,
  savingsgoal: CAGRGraphic,
  lumpsum: SIPGraphic,
  swp: EMIGraphic,
  balancetransfer: MortgageGraphic,
  prepayment: MortgageGraphic,
  networth: TaxRegimeGraphic,
  retirementcorpus: SIPGraphic,
  capitalgains: ROIGraphic,
  stockreturn: ROIGraphic,
  dividendyield: ROIGraphic,
  salarycomparison: SalaryHikeGraphic,
  loaneligibility: MortgageGraphic,
  fire: SIPGraphic,
  epf: NPSGraphic,
};

/* ═══════════════════════════════════════════════════
   TIER 2 — Category Template SVGs
   ═══════════════════════════════════════════════════ */

function FinanceTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3].map(i => (
        <rect key={i} x={6 + i * (w/4 - 1)} y={h - 8 - (h * (0.3 + i * 0.15))}
          width={w/4 - 4} height={h * (0.3 + i * 0.15)} rx={3}
          fill="#3B82F6" opacity={0.15 + i * 0.1}
          className="calc-graphic-bar" style={{ animationDelay: `${i * 80}ms` }} />
      ))}
      <text x={w - 8} y={14} textAnchor="end" fontSize="9" fontWeight="800"
        fill="#3B82F6" opacity="0.4" fontFamily="system-ui, sans-serif">₹</text>
    </svg>
  );
}

function HealthTemplate({ w, h }: { w: number; h: number }) {
  const mid = h / 2;
  const pts = [0,1,2,3,4,5,6,7,8].map(i => {
    const x = (i / 8) * w;
    const isSpike = i === 3 || i === 5;
    const y = isSpike ? (i === 3 ? mid - h * 0.35 : mid + h * 0.25) : mid;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points={pts} stroke="#EF4444" strokeWidth="2" fill="none"
        strokeLinecap="round" strokeLinejoin="round" className="calc-graphic-draw" />
      <circle cx={w * 0.375} cy={mid - h * 0.35} r="3" fill="#EF4444"
        className="calc-graphic-pulse" />
    </svg>
  );
}

function MathTemplate({ w, h }: { w: number; h: number }) {
  // Sine-ish wave
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const x = Math.round(((i / 24) * w) * 100) / 100;
    const y = Math.round((h / 2 + Math.sin((i / 24) * Math.PI * 3) * (h * 0.3)) * 100) / 100;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid */}
      <line x1={0} y1={h/2} x2={w} y2={h/2} stroke="#E2E8F0" strokeWidth="0.5" />
      <line x1={w/2} y1={0} x2={w/2} y2={h} stroke="#E2E8F0" strokeWidth="0.5" />
      {/* Wave */}
      <polyline points={pts.join(' ')} stroke="#6366F1"
        strokeWidth="2" fill="none" strokeLinecap="round" className="calc-graphic-draw" />
    </svg>
  );
}

function EverydayTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dial gauge */}
      <path d={`M ${w * 0.15} ${h * 0.75} A ${w * 0.35} ${w * 0.35} 0 0 1 ${w * 0.85} ${h * 0.75}`}
        stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d={`M ${w * 0.15} ${h * 0.75} A ${w * 0.35} ${w * 0.35} 0 0 1 ${w * 0.6} ${h * 0.28}`}
        stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"
        className="calc-graphic-draw" />
      <circle cx={w/2} cy={h * 0.75} r="3" fill="#F59E0B" />
    </svg>
  );
}

function EducationTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap */}
      <polygon points={`${w/2},${h * 0.15} ${w * 0.15},${h * 0.4} ${w/2},${h * 0.55} ${w * 0.85},${h * 0.4}`}
        fill="#3B82F6" stroke="#3B82F6" strokeWidth="1" opacity="0.25" />
      {/* Progress bars */}
      {[0,1,2].map(i => (
        <React.Fragment key={i}>
          <rect x={w * 0.2} y={h * 0.65 + i * 10} width={w * 0.6} height={5} rx={2.5}
            fill="#E2E8F0" opacity="0.3" />
          <rect x={w * 0.2} y={h * 0.65 + i * 10} width={w * (0.45 - i * 0.1)} height={5}
            rx={2.5} fill="#3B82F6" opacity={0.3 + i * 0.15}
            className="calc-graphic-bar" style={{ animationDelay: `${i * 100}ms` }} />
        </React.Fragment>
      ))}
    </svg>
  );
}

function EngineeringTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear */}
      <circle cx={w/2} cy={h/2} r={h * 0.28} fill="none" stroke="#64748B"
        strokeWidth="2" opacity="0.25" />
      <circle cx={w/2} cy={h/2} r={h * 0.15} fill="#64748B" opacity="0.08" />
      {/* Teeth */}
      {[0,60,120,180,240,300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.round((w/2 + Math.cos(rad) * h * 0.28) * 100) / 100;
        const y1 = Math.round((h/2 + Math.sin(rad) * h * 0.28) * 100) / 100;
        const x2 = Math.round((w/2 + Math.cos(rad) * h * 0.35) * 100) / 100;
        const y2 = Math.round((h/2 + Math.sin(rad) * h * 0.35) * 100) / 100;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#64748B" strokeWidth="3" strokeLinecap="round" opacity="0.25" />;
      })}
    </svg>
  );
}

function ConstructionTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Building blocks */}
      {[0,1,2].map(row => (
        <React.Fragment key={row}>
          {Array.from({ length: 3 - row }, (_, col) => (
            <rect key={`${row}-${col}`}
              x={w * 0.15 + col * (w * 0.25) + (row * w * 0.12)}
              y={h * 0.7 - row * (h * 0.22)}
              width={w * 0.22} height={h * 0.18} rx={2}
              fill="#D97706" stroke="#D97706" strokeWidth="0.5"
              opacity={0.15 + row * 0.1}
              className="calc-graphic-bar"
              style={{ animationDelay: `${(row * 3 + col) * 60}ms` }} />
          ))}
        </React.Fragment>
      ))}
    </svg>
  );
}

function DateTimeTemplate({ w, h }: { w: number; h: number }) {
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clock face */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0EA5E9" strokeWidth="2" opacity="0.25" />
      {/* Hour ticks */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.round((cx + Math.cos(rad) * (r - 4)) * 100) / 100;
        const y1 = Math.round((cy + Math.sin(rad) * (r - 4)) * 100) / 100;
        const x2 = Math.round((cx + Math.cos(rad) * r) * 100) / 100;
        const y2 = Math.round((cy + Math.sin(rad) * r) * 100) / 100;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#0EA5E9" strokeWidth="1.5" opacity="0.3" />;
      })}
      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={cx + r * 0.4} y2={cy - r * 0.35}
        stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={cx - r * 0.15} y2={cy - r * 0.65}
        stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx={cx} cy={cy} r="2" fill="#0EA5E9" opacity="0.5" />
    </svg>
  );
}

function ScienceTemplate({ w, h }: { w: number; h: number }) {
  const cx = w / 2, cy = h / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Atom */}
      <ellipse cx={cx} cy={cy} rx={w * 0.38} ry={h * 0.18}
        fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.25"
        transform={`rotate(-30 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={w * 0.38} ry={h * 0.18}
        fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.25"
        transform={`rotate(30 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx={w * 0.38} ry={h * 0.18}
        fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.25"
        transform={`rotate(90 ${cx} ${cy})`} />
      {/* Nucleus */}
      <circle cx={cx} cy={cy} r="4" fill="#8B5CF6" opacity="0.4"
        className="calc-graphic-pulse" />
      {/* Electron */}
      <circle cx={cx + w * 0.35} cy={cy - h * 0.05} r="2.5" fill="#A78BFA"
        className="calc-graphic-pulse" style={{ animationDelay: '500ms' }} />
    </svg>
  );
}

function UnitTemplate({ w, h }: { w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left unit */}
      <rect x={4} y={h * 0.25} width={w * 0.35} height={h * 0.5} rx={6}
        fill="#EC4899" stroke="#EC4899" strokeWidth="1" opacity="0.15" />
      <text x={w * 0.2} y={h * 0.55} textAnchor="middle" fontSize="9" fontWeight="800"
        fill="#EC4899" opacity="0.5" fontFamily="system-ui, sans-serif">kg</text>
      {/* Arrows */}
      <line x1={w * 0.42} y1={h * 0.42} x2={w * 0.58} y2={h * 0.42}
        stroke="#EC4899" strokeWidth="1.5" opacity="0.4" />
      <line x1={w * 0.58} y1={h * 0.58} x2={w * 0.42} y2={h * 0.58}
        stroke="#EC4899" strokeWidth="1.5" opacity="0.4" />
      {/* Right unit */}
      <rect x={w * 0.6} y={h * 0.25} width={w * 0.35} height={h * 0.5} rx={6}
        fill="#EC4899" stroke="#EC4899" strokeWidth="1" opacity="0.15" />
      <text x={w * 0.78} y={h * 0.55} textAnchor="middle" fontSize="9" fontWeight="800"
        fill="#EC4899" opacity="0.5" fontFamily="system-ui, sans-serif">lb</text>
    </svg>
  );
}

const TIER2_MAP: Record<string, React.FC<{ w: number; h: number }>> = {
  finance: FinanceTemplate,
  health: HealthTemplate,
  math: MathTemplate,
  everyday: EverydayTemplate,
  education: EducationTemplate,
  engineering: EngineeringTemplate,
  construction: ConstructionTemplate,
  datetime: DateTimeTemplate,
  science: ScienceTemplate,
  unit: UnitTemplate,
};

/* ═══════════════════════════════════════════════════
   TIER 3 — Generic Fallback
   ═══════════════════════════════════════════════════ */
function GenericGraphic({ w, h, category }: { w: number; h: number; category: string }) {
  const colors = getColors(category);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract dots pattern */}
      {[
        { cx: w * 0.3, cy: h * 0.3, r: 6, delay: 0 },
        { cx: w * 0.6, cy: h * 0.5, r: 8, delay: 200 },
        { cx: w * 0.45, cy: h * 0.7, r: 5, delay: 400 },
        { cx: w * 0.75, cy: h * 0.25, r: 4, delay: 600 },
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r}
          fill={colors.primary} opacity={0.1 + i * 0.05}
          className="calc-graphic-pulse" style={{ animationDelay: `${dot.delay}ms` }} />
      ))}
      {/* Connection lines */}
      <line x1={w * 0.3} y1={h * 0.3} x2={w * 0.6} y2={h * 0.5}
        stroke={colors.primary} strokeWidth="1" opacity="0.1" />
      <line x1={w * 0.6} y1={h * 0.5} x2={w * 0.45} y2={h * 0.7}
        stroke={colors.primary} strokeWidth="1" opacity="0.1" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════ */
export default function CalculatorGraphic({ calcId, category, variant }: CalculatorGraphicProps) {
  const isCard = variant === 'card';
  const w = isCard ? 80 : 320;
  const h = isCard ? 60 : 100;

  // Resolve which graphic to render
  const Tier1 = TIER1_MAP[calcId];
  const Tier2 = TIER2_MAP[category];

  const containerClass = isCard ? 'calc-card-graphic' : 'calc-hero-graphic';

  return (
    <div className={containerClass} aria-hidden="true">
      {Tier1 ? (
        <Tier1 w={w} h={h} />
      ) : Tier2 ? (
        <Tier2 w={w} h={h} />
      ) : (
        <GenericGraphic w={w} h={h} category={category} />
      )}
    </div>
  );
}
