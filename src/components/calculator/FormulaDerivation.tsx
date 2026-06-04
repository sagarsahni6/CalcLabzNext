'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/Icon';
import type { FormulaStep } from '@/types/engineering';

const KaTeXRenderer = dynamic(() => import('./KaTeXRenderer'), {
  ssr: false,
  loading: () => <span style={{ color: 'var(--txt2)', fontSize: '0.85rem' }}>Loading formula…</span>,
});

interface FormulaDerivationProps {
  steps: FormulaStep[];
  calculatorName: string;
}

export default function FormulaDerivation({ steps, calculatorName }: FormulaDerivationProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="standalone-section formula-derivation-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-square-root-variable" />
        </div>
        <div>
          <h2>Step-by-Step Formula Derivation</h2>
          <p>Mathematical derivation for the {calculatorName}</p>
        </div>
      </div>

      <div className="standalone-section-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {steps.map((step) => {
            const isExpanded = expandedStep === step.step;
            return (
              <div
                key={step.step}
                style={{
                  background: 'var(--bg2)',
                  border: `1px solid ${isExpanded ? 'var(--p)' : 'var(--brd)'}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Step Header */}
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--fg)',
                    textAlign: 'left',
                  }}
                  aria-expanded={isExpanded}
                  aria-controls={`derivation-step-${step.step}`}
                >
                  {/* Step Number Badge */}
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isExpanded ? 'var(--p)' : 'var(--bg3)',
                    color: isExpanded ? '#fff' : 'var(--txt2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}>
                    {step.step}
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{step.title}</div>
                  </div>

                  <Icon
                    name={isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--txt2)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>

                {/* Step Body */}
                {isExpanded && (
                  <div
                    id={`derivation-step-${step.step}`}
                    style={{
                      padding: '0 18px 18px',
                      animation: 'slideUp 0.3s ease-out',
                    }}
                  >
                    {/* Description */}
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--txt1)',
                      lineHeight: 1.7,
                      margin: '0 0 14px',
                    }}>
                      {step.description}
                    </p>

                    {/* LaTeX Formula */}
                    <div style={{
                      background: 'var(--bg1)',
                      border: '1px solid var(--brd)',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      textAlign: 'center',
                      overflowX: 'auto',
                    }}>
                      <KaTeXRenderer latex={step.latex} displayMode />
                    </div>

                    {/* Computed Result */}
                    {step.result && (
                      <div style={{
                        marginTop: '10px',
                        padding: '8px 14px',
                        background: 'rgba(16,185,129,0.08)',
                        borderRadius: '8px',
                        borderLeft: '3px solid #10B981',
                        fontSize: '0.85rem',
                        color: 'var(--txt1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <Icon name="fa-arrow-right" style={{ color: '#10B981', fontSize: '0.75rem' }} />
                        <strong style={{ color: '#10B981' }}>Result:</strong> {step.result}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
