'use client';

import Icon from '@/components/ui/Icon';
import { VALIDATION_CONFIG, type EngineeringValidation } from '@/types/engineering';

interface EngineeringValidationBadgeProps {
  validation: EngineeringValidation;
}

export default function EngineeringValidationBadge({ validation }: EngineeringValidationBadgeProps) {
  const config = VALIDATION_CONFIG[validation.status];

  return (
    <div
      className="engineering-validation-badge"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '16px',
        padding: '16px 20px',
        marginTop: '12px',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slideUp 0.4s cubic-bezier(.4,0,.2,1)',
      }}
      role="status"
      aria-label={`Engineering validation: ${config.label}`}
    >
      {/* Animated border glow for critical */}
      {validation.status === 'critical' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          border: `2px solid ${config.color}`,
          animation: 'criticalPulse 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: `${config.color}20`,
          color: config.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}>
          <Icon name={config.icon} />
        </span>

        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: config.color,
            letterSpacing: '-0.01em',
          }}>
            {validation.title}
          </div>
        </div>

        {/* Status badge */}
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 800,
          color: '#fff',
          background: config.color,
          padding: '3px 10px',
          borderRadius: '9999px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {config.label}
        </span>
      </div>

      {/* Message */}
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--txt1)',
        lineHeight: 1.65,
        margin: 0,
      }}>
        {validation.message}
      </p>

      {/* Limit vs Actual comparison */}
      {(validation.limit || validation.actual) && (
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '12px',
          flexWrap: 'wrap',
        }}>
          {validation.limit && (
            <div style={{
              padding: '6px 12px',
              background: 'var(--bg2)',
              borderRadius: '8px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid var(--brd)',
            }}>
              <span style={{ color: 'var(--txt2)', fontWeight: 600 }}>Limit:</span>
              <span style={{ color: 'var(--txt)', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>
                {validation.limit}
              </span>
            </div>
          )}
          {validation.actual && (
            <div style={{
              padding: '6px 12px',
              background: `${config.color}08`,
              borderRadius: '8px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: `1px solid ${config.border}`,
            }}>
              <span style={{ color: 'var(--txt2)', fontWeight: 600 }}>Actual:</span>
              <span style={{ color: config.color, fontWeight: 700, fontFamily: 'var(--font-mono, monospace)' }}>
                {validation.actual}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Standard reference */}
      {validation.standardRef && (
        <div style={{
          marginTop: '10px',
          fontSize: '0.75rem',
          color: 'var(--txt2)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Icon name="fa-file-lines" style={{ fontSize: '0.68rem' }} />
          Ref: {validation.standardRef}
        </div>
      )}

      <style jsx>{`
        @keyframes criticalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
