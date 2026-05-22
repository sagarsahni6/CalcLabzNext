'use client';

import { Interpretation, getSeverityConfig } from '@/lib/interpretation-engine';
import Icon from '@/components/ui/Icon';

interface InterpretationBadgeProps {
  interpretation: Interpretation;
}

export default function InterpretationBadge({ interpretation }: InterpretationBadgeProps) {
  const config = getSeverityConfig(interpretation.severity);

  return (
    <div
      className="interpretation-badge"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '16px',
        padding: '16px 20px',
        marginTop: '16px',
        animation: 'slideUp 0.4s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.3rem', color: config.color, display: 'flex', alignItems: 'center' }}>
          <Icon name={interpretation.emoji} />
        </span>
        <span style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          color: config.color,
          letterSpacing: '-0.01em',
        }}>
          {interpretation.title}
        </span>
        {/* Severity dot indicator */}
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: config.color,
          display: 'inline-block',
          boxShadow: `0 0 8px ${config.color}`,
          animation: interpretation.severity === 'danger' ? 'pulse-glow 2s ease-in-out infinite' : 'none',
        }} />
      </div>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--txt1, #a0a0b8)',
        lineHeight: 1.6,
        margin: 0,
      }}>
        {interpretation.message}
      </p>

      {interpretation.advice && (
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: 'var(--bg2, rgba(0,0,0,0.2))',
          borderRadius: '10px',
          borderLeft: `3px solid ${config.color}`,
          fontSize: '0.82rem',
          color: 'var(--txt1, #a0a0b8)',
          lineHeight: 1.6,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '6px',
        }}>
          <Icon name="fa-lightbulb" style={{ color: 'var(--p)', fontSize: '0.85rem', flexShrink: 0, marginTop: '2px' }} />
          <span><strong style={{ color: 'var(--txt, #f0f0f5)', marginRight: '4px' }}>Tip:</strong>{interpretation.advice}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
