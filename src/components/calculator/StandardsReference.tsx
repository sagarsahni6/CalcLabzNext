'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import type { EngineeringStandard } from '@/types/engineering';

interface StandardsReferenceProps {
  standards: EngineeringStandard[];
  calculatorName: string;
}

const ORG_COLORS: Record<string, string> = {
  ASME: '#1E40AF',
  AISC: '#0369A1',
  Eurocode: '#6D28D9',
  IS: '#B45309',
  IEC: '#047857',
  NEC: '#DC2626',
  TEMA: '#0E7490',
  IPC: '#7C3AED',
  ASHRAE: '#0891B2',
  AGMA: '#4338CA',
  IEEE: '#1D4ED8',
};

const ORG_ICONS: Record<string, string> = {
  ASME: 'fa-industry',
  AISC: 'fa-building',
  Eurocode: 'fa-earth-europe',
  IS: 'fa-flag',
  IEC: 'fa-bolt',
  NEC: 'fa-plug',
  TEMA: 'fa-temperature-half',
  IPC: 'fa-microchip',
  ASHRAE: 'fa-wind',
  AGMA: 'fa-gears',
  IEEE: 'fa-tower-broadcast',
};

export default function StandardsReference({ standards, calculatorName }: StandardsReferenceProps) {
  const [expanded, setExpanded] = useState(true);

  if (!standards || standards.length === 0) return null;

  // Group standards by organization
  const grouped = standards.reduce<Record<string, EngineeringStandard[]>>((acc, std) => {
    const org = std.organization;
    if (!acc[org]) acc[org] = [];
    acc[org].push(std);
    return acc;
  }, {});

  return (
    <div className="standalone-section standards-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-book-open-reader" />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Applicable Standards &amp; Codes</h2>
          <p>Engineering standards referenced by the {calculatorName}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--brd)',
            borderRadius: '8px',
            padding: '6px 12px',
            cursor: 'pointer',
            color: 'var(--txt2)',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s var(--ease)',
          }}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse standards' : 'Expand standards'}
        >
          <Icon name={expanded ? 'fa-chevron-up' : 'fa-chevron-down'} style={{ fontSize: '0.7rem' }} />
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {expanded && (
        <div className="standalone-section-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(grouped).map(([org, stds]) => {
              const color = ORG_COLORS[org] || '#475569';
              const icon = ORG_ICONS[org] || 'fa-file-lines';

              return (
                <div key={org}>
                  {/* Organization header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                  }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: `${color}18`,
                      color: color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      flexShrink: 0,
                    }}>
                      <Icon name={icon} />
                    </span>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--txt)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}>
                      {org}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: 'var(--txt2)',
                      background: 'var(--bg2)',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}>
                      {stds.length} {stds.length === 1 ? 'standard' : 'standards'}
                    </span>
                  </div>

                  {/* Standards cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '34px' }}>
                    {stds.map((std, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg2)',
                          border: '1px solid var(--brd)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          borderLeft: `3px solid ${color}`,
                          transition: 'all 0.2s var(--ease)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: 'var(--txt)',
                              marginBottom: '2px',
                            }}>
                              {std.code}
                              {std.section && (
                                <span style={{ fontWeight: 500, color: 'var(--txt2)', marginLeft: '6px', fontSize: '0.78rem' }}>
                                  — {std.section}
                                </span>
                              )}
                            </div>
                            <div style={{
                              fontSize: '0.8rem',
                              color: 'var(--txt1)',
                              lineHeight: 1.5,
                              marginBottom: '6px',
                            }}>
                              {std.title}
                            </div>
                            <div style={{
                              fontSize: '0.76rem',
                              color: 'var(--txt2)',
                              lineHeight: 1.6,
                            }}>
                              {std.description}
                            </div>
                          </div>
                          {std.url && (
                            <a
                              href={std.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Open ${std.code} reference`}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '8px',
                                background: `${color}12`,
                                color: color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.72rem',
                                flexShrink: 0,
                                transition: 'all 0.2s var(--ease)',
                              }}
                              aria-label={`Open ${std.code} external reference`}
                            >
                              <Icon name="fa-arrow-up-right-from-square" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
