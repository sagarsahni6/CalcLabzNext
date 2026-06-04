'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface EducationProps {
  theory: string;
  applications: string[];
  examples: { title: string; steps: string[] }[];
  faqs: { q: string; a: string }[];
  calculatorName: string;
}

const TABS = [
  { id: 'theory', label: 'Theory', icon: 'fa-atom' },
  { id: 'applications', label: 'Applications', icon: 'fa-industry' },
  { id: 'examples', label: 'Examples', icon: 'fa-file-signature' },
  { id: 'faqs', label: 'FAQs', icon: 'fa-circle-question' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function EngineeringEducation({ theory, applications, examples, faqs, calculatorName }: EducationProps) {
  const [activeTab, setActiveTab] = useState<TabId>('theory');

  return (
    <div className="standalone-section engineering-education-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-graduation-cap" />
        </div>
        <div>
          <h2>Engineering Reference</h2>
          <p>Learn the theory behind the {calculatorName}</p>
        </div>
      </div>

      <div className="standalone-section-body">
        {/* Tab bar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--bg2)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: activeTab === tab.id ? 'var(--bg1)' : 'transparent',
                border: activeTab === tab.id ? '1px solid var(--brd)' : '1px solid transparent',
                color: activeTab === tab.id ? 'var(--p)' : 'var(--txt2)',
                fontSize: '0.8rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s var(--ease)',
                whiteSpace: 'nowrap',
                boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none',
              }}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <Icon name={tab.icon} style={{ fontSize: '0.75rem' }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ animation: 'fadeIn 0.3s var(--ease)' }} role="tabpanel">
          {/* Theory */}
          {activeTab === 'theory' && (
            <div>
              {theory.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{
                  fontSize: '0.9rem',
                  color: 'var(--txt1)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Applications */}
          {activeTab === 'applications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {applications.map((app, idx) => {
                const [title, ...rest] = app.split(' — ');
                const description = rest.join(' — ');
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px 16px',
                    background: 'var(--bg2)',
                    borderRadius: '12px',
                    border: '1px solid var(--brd)',
                  }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'var(--p-light)',
                      color: 'var(--p)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {idx + 1}
                    </span>
                    <div>
                      {description ? (
                        <>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--txt)', marginBottom: '2px' }}>
                            {title}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--txt2)', lineHeight: 1.6 }}>
                            {description}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: '0.88rem', color: 'var(--txt1)', lineHeight: 1.6 }}>
                          {app}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Examples */}
          {activeTab === 'examples' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {examples.map((ex, exIdx) => (
                <div key={exIdx} style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--brd)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '14px 18px',
                    background: 'var(--bg3)',
                    borderBottom: '1px solid var(--brd)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Icon name="fa-play-circle" style={{ color: 'var(--p)', fontSize: '0.85rem' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--txt)' }}>
                      {ex.title}
                    </span>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    {ex.steps.map((step, stepIdx) => (
                      <div key={stepIdx} style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '8px 0',
                        borderBottom: stepIdx < ex.steps.length - 1 ? '1px dashed var(--brd)' : 'none',
                      }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: stepIdx === ex.steps.length - 1 ? 'var(--emerald)' : 'var(--bg3)',
                          color: stepIdx === ex.steps.length - 1 ? '#fff' : 'var(--txt2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '1px',
                        }}>
                          {stepIdx + 1}
                        </span>
                        <span style={{
                          fontSize: '0.84rem',
                          color: stepIdx === ex.steps.length - 1 ? 'var(--txt)' : 'var(--txt1)',
                          fontWeight: stepIdx === ex.steps.length - 1 ? 600 : 400,
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-mono, monospace)',
                        }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQs */}
          {activeTab === 'faqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((faq, idx) => (
                <details key={idx} className="faq-details">
                  <summary>
                    <span>{faq.q}</span>
                    <Icon name="fa-chevron-down" style={{ fontSize: '0.85rem', color: 'var(--txt2)' }} />
                  </summary>
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
