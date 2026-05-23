'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { CalculatorInput, CalculatorResult } from '@/types/calculator';
import { getCalcFunction } from '@/lib/calc-registry-client';
import { DB } from '@/data/calculator-db';
import { getInterpretation } from '@/lib/interpretation-engine';
import Icon from '@/components/ui/Icon';
import InterpretationBadge from '@/components/calculator/InterpretationBadge';
import ExportButtons from '@/components/calculator/ExportButtons';
import ComparisonMode from '@/components/calculator/ComparisonMode';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import { addToHistory } from '@/lib/history';

// Lazy-load Recharts chart component (only loads when chart data exists)
const ResultChart = dynamic(() => import('@/components/calculator/ResultChart'), {
  ssr: false,
  loading: () => (
    <div style={{ background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--brd)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: 'var(--txt2)', fontSize: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="spinner" style={{ width: '18px', height: '18px', border: '2px solid var(--brd)', borderTopColor: 'var(--p)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        Loading chart...
      </div>
    </div>
  ),
});

interface CalculatorWidgetProps {
  calcId: string;
  inputs: CalculatorInput[];
  tips?: string[];
}

function getRangeParams(inp: CalculatorInput, label: string) {
  if (inp.min !== undefined && inp.max !== undefined) {
    return { min: inp.min, max: inp.max, step: (inp.max - inp.min) / 100 || 1 };
  }

  const name = label.toLowerCase();
  if (name.includes('amount') || name.includes('principal') || name.includes('investment') || name.includes('loan') || name.includes('cost')) {
    if (name.includes('monthly') || name.includes('sip')) {
      return { min: 500, max: 1000000, step: 500 };
    }
    return { min: 10000, max: 20000000, step: 10000 };
  }
  if (name.includes('rate') || name.includes('interest') || name.includes('cagr') || name.includes('return') || name.includes('inflation') || name.includes('yield')) {
    return { min: 1, max: 30, step: 0.1 };
  }
  if (name.includes('tenure') || name.includes('time') || name.includes('period') || name.includes('years') || name.includes('duration')) {
    return { min: 1, max: 40, step: 1 };
  }
  if (name.includes('months')) {
    return { min: 1, max: 120, step: 1 };
  }
  if (name.includes('percentage') || name.includes('gst') || name.includes('percent')) {
    return { min: 0, max: 100, step: 1 };
  }
  if (name.includes('age')) {
    return { min: 0, max: 100, step: 1 };
  }
  if (name.includes('height')) {
    return { min: 50, max: 250, step: 1 };
  }
  if (name.includes('weight')) {
    return { min: 20, max: 200, step: 1 };
  }
  return null;
}

/* ── Animated number display ─────────────────── */
function AnimatedValue({ value }: { value: string | number }) {
  return (
    <span className="animated-value" style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s', animation: 'countUp 0.4s ease-out' }}>
      {value}
    </span>
  );
}

export default function CalculatorWidget({ calcId, inputs, tips }: CalculatorWidgetProps) {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach((inp) => {
      if (inp.default !== undefined) {
        initial[inp.id] = inp.default;
      } else if (inp.type === 'select' && inp.options && inp.options.length > 0) {
        initial[inp.id] = inp.options[0];
      } else {
        initial[inp.id] = '';
      }
    });
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleChange = useCallback((id: string, value: string, type?: string) => {
    if (type === 'select' || type === 'text' || type === 'date') {
      setValues((prev) => ({ ...prev, [id]: value }));
    } else {
      const num = parseFloat(value);
      setValues((prev) => ({ ...prev, [id]: isNaN(num) ? value : num }));
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const calculate = useCallback(() => {
    const calcFn = getCalcFunction(calcId);
    if (!calcFn) return;

    const newErrors: Record<string, string> = {};
    inputs.forEach((inp) => {
      if (inp.type === 'select' || inp.type === 'text' || inp.type === 'date') return;
      const val = values[inp.id];
      if (val === '' || val === undefined) {
        newErrors[inp.id] = inp.label + ' is required';
      } else if (typeof val === 'string' && isNaN(parseFloat(val))) {
        newErrors[inp.id] = 'Enter a valid number';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = calcFn(values);
      setResult(res);

      // Save to localStorage history using utility
      try {
        addToHistory({
          calcId,
          name: DB[calcId]?.name || calcId,
          result: String(res.main?.value || ''),
          category: DB[calcId]?.cat,
          inputs: values
        });
      } catch (err) {
        console.warn('Failed to save calculation history:', err);
      }
    } catch (e) {
      console.error('Calculation error:', e);
    }
  }, [calcId, inputs, values]);

  const reset = useCallback(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach((inp) => {
      if (inp.default !== undefined) {
        initial[inp.id] = inp.default;
      } else if (inp.type === 'select' && inp.options && inp.options.length > 0) {
        initial[inp.id] = inp.options[0];
      } else {
        initial[inp.id] = '';
      }
    });
    setValues(initial);
    setResult(null);
    setErrors({});
  }, [inputs]);

  // Debounced auto-calculate (300ms) — prevents jank during fast typing
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      calculate();
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [values, calculate]);

  // Auto-focus first input on mount (desktop only — prevents mobile keyboard popup)
  useEffect(() => {
    if (inputs.length > 0 && window.innerWidth > 768) {
      const firstInput = document.getElementById(`inp_${inputs[0].id}`);
      if (firstInput) firstInput.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts: Enter = calculate, Escape = reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        calculate();
      }
      if (e.key === 'Escape') {
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calculate, reset]);

  // Get interpretation for the current result
  const interpretation = useMemo(() => {
    if (!result?.main) return null;
    return getInterpretation(calcId, values, result.main.value);
  }, [calcId, values, result]);

  return (
    <div>
      {/* ── Inputs ── */}
      <div className="inp-grid">
        {inputs.map((inp, inputIdx) => {
          const range = inp.type !== 'select' && inp.type !== 'text' && inp.type !== 'date' ? getRangeParams(inp, inp.label) : null;
          return (
            <div
              className={`inp-grp ${errors[inp.id] ? 'inp-invalid' : ''}`}
              key={inp.id}
              style={{ animationDelay: `${inputIdx * 50}ms` }}
            >
              <label htmlFor={`inp_${inp.id}`}>{inp.label}</label>
              <div className="inp-wrap">
                {inp.type === 'select' ? (
                  <select
                    id={`inp_${inp.id}`}
                    value={values[inp.id] as string}
                    onChange={(e) => handleChange(inp.id, e.target.value, 'select')}
                  >
                    {inp.options?.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ) : inp.type === 'text' ? (
                  <input
                    type="text"
                    id={`inp_${inp.id}`}
                    value={values[inp.id] as string}
                    onChange={(e) => handleChange(inp.id, e.target.value, 'text')}
                  />
                ) : inp.type === 'date' ? (
                  <input
                    type="date"
                    id={`inp_${inp.id}`}
                    value={values[inp.id] as string}
                    onChange={(e) => handleChange(inp.id, e.target.value, 'date')}
                  />
                ) : (
                  <>
                    {inp.prefix && <span className="inp-pfx">{inp.prefix}</span>}
                    <input
                      type="number"
                      id={`inp_${inp.id}`}
                      value={values[inp.id]}
                      step="any"
                      onChange={(e) => handleChange(inp.id, e.target.value)}
                    />
                    {inp.suffix && <span className="inp-sfx">{inp.suffix}</span>}
                  </>
                )}
              </div>
              
              {/* Linked Range Slider with current value badge */}
              {range && (
                <div style={{ marginTop: '10px', position: 'relative' }}>
                  {/* Current value floating badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: `calc(${((Number(values[inp.id]) || range.min) - range.min) / (range.max - range.min) * 100}% - 20px)`,
                    background: 'var(--p)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    transition: 'left 0.15s ease',
                    opacity: Number(values[inp.id]) ? 1 : 0,
                    zIndex: 2,
                  }}>
                    {inp.prefix}{Number(values[inp.id]).toLocaleString('en-IN')}{inp.suffix}
                  </div>
                  <input
                    type="range"
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={values[inp.id] !== '' ? Number(values[inp.id]) : range.min}
                    onChange={(e) => handleChange(inp.id, e.target.value)}
                    className="range-slider"
                    style={{
                      width: '100%',
                      accentColor: 'var(--p)',
                      background: `linear-gradient(to right, var(--p) ${((Number(values[inp.id]) || range.min) - range.min) / (range.max - range.min) * 100}%, var(--bg3) ${((Number(values[inp.id]) || range.min) - range.min) / (range.max - range.min) * 100}%)`,
                      height: '6px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--txt2)', marginTop: '4px' }}>
                    <span>{inp.prefix}{range.min.toLocaleString('en-IN')}{inp.suffix}</span>
                    <span>{inp.prefix}{range.max.toLocaleString('en-IN')}{inp.suffix}</span>
                  </div>
                </div>
              )}

              {errors[inp.id] && <div className="inp-error">{errors[inp.id]}</div>}
            </div>
          );
        })}
      </div>

      {/* ── Buttons (Manual triggers and E2E support) ── */}
      <div className="btn-row" style={{ display: 'flex', gap: '12px', marginTop: '20px', marginBottom: '24px' }}>
        <button className="btn btn-p" data-action="calculate" onClick={calculate} style={{ flex: 1, justifyContent: 'center' }}>
          <Icon name="fa-calculator" style={{ marginRight: '6px' }} /> Calculate
        </button>
        <button className="btn btn-s" onClick={reset}>
          <Icon name="fa-redo" style={{ marginRight: '6px' }} /> Reset
        </button>
      </div>

      {/* ── Results Panel ── */}
      {result && (
        <div
          className="results"
          style={{ marginTop: '30px' }}
          aria-live="polite"
          aria-atomic="true"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Wrapper for Exporting/Copying/Printing */}
            <div ref={resultRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Main Result with animated value */}
              {result.main && (
                <div className="res-main-card">
                  <div className="res-lbl">
                    {result.main.label}
                  </div>
                  <div className="res-val">
                    <AnimatedValue value={result.main.value} />
                  </div>
                </div>
              )}

              {/* Interpretation Badge */}
              {interpretation && (
                <InterpretationBadge interpretation={interpretation} />
              )}

              {/* Secondary Results Grid */}
              {result.secondary && result.secondary.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {result.secondary.map((r, i) => (
                    <div
                      className="res-card"
                      key={i}
                      role="button"
                      tabIndex={0}
                      title="Click to copy"
                      onClick={() => {
                        navigator.clipboard.writeText(`${r.label}: ${r.value}`).then(() => {
                          // Show brief "Copied!" feedback
                          const el = document.getElementById(`res-card-${i}`);
                          if (el) { el.textContent = 'Copied!'; setTimeout(() => { el.textContent = ''; }, 1200); }
                        }).catch(() => {});
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigator.clipboard.writeText(`${r.label}: ${r.value}`).catch(() => {});
                        }
                      }}
                      style={{
                        background: 'var(--bg2)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid var(--brd)',
                        animation: `slideUp 0.3s ease-out ${i * 50}ms both`,
                      }}
                    >
                      <div className="res-lbl" style={{ fontSize: '0.78rem', color: 'var(--txt2)', marginBottom: '6px', lineHeight: 1.3 }}>{r.label}</div>
                      <div className={`res-val sm${r.pos ? ' pos' : ''}${r.neg ? ' neg' : ''}`} style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: r.pos ? 'var(--emerald)' : r.neg ? '#ef4444' : 'var(--fg)',
                      }}>
                        {r.value}
                      </div>
                      <span id={`res-card-${i}`} style={{ fontSize: '0.65rem', color: 'var(--p)', fontWeight: 600, minHeight: '14px', display: 'block', marginTop: '2px' }}></span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export buttons (Print, Copy, CSV, WhatsApp Share) */}
            <ExportButtons resultRef={resultRef} calcName={DB[calcId]?.name || calcId} calcId={calcId} />

            {/* Comparison Mode for side-by-side scenarios */}
            <ComparisonMode calcId={calcId} />

            {/* Interactive Recharts Chart */}
            {result.chart && (
              <ResultChart chart={result.chart} calcId={calcId} />
            )}
          </div>
        </div>
      )}

      {/* ── Tips ── */}
      {tips && tips.length > 0 && (
        <div className="tips-box" style={{ marginTop: '24px' }}>
          <div className="tips-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: 'var(--p)', marginBottom: '12px' }}>
            <Icon name="fa-lightbulb" />
            Tips &amp; Formulas
          </div>
          {tips.map((tip, i) => (
            <div key={i} className="tip-item" style={{ fontSize: '0.9rem', color: 'var(--txt1)', marginBottom: '8px', lineHeight: 1.5 }}>{tip}</div>
          ))}
        </div>
      )}

      {/* ── Related Calculators ── */}
      <RelatedCalculators calcId={calcId} />

      {/* ── Keyframe Animations ── */}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
