'use client';

import { useState, useCallback, useMemo } from 'react';
import { CalculatorInput } from '@/types/calculator';
import { getCalcFunction } from '@/lib/calc-registry-client';
import { DB } from '@/data/calculator-db';
import Icon from '@/components/ui/Icon';


interface ComparisonModeProps {
  calcId: string;
}

function ScenarioPanel({
  label,
  color,
  inputs,
  calcId,
}: {
  label: string;
  color: string;
  inputs: CalculatorInput[];
  calcId: string;
}) {
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const init: Record<string, number | string> = {};
    inputs.forEach((inp) => {
      if (inp.default !== undefined) init[inp.id] = inp.default;
      else if (inp.type === 'select' && inp.options?.length) init[inp.id] = inp.options[0];
      else init[inp.id] = '';
    });
    return init;
  });

  const result = useMemo(() => {
    const fn = getCalcFunction(calcId);
    if (!fn) return null;
    try { return fn(values); } catch { return null; }
  }, [calcId, values]);

  const handleChange = useCallback((id: string, value: string, type?: string) => {
    if (type === 'select' || type === 'text' || type === 'date') {
      setValues(prev => ({ ...prev, [id]: value }));
    } else {
      const num = parseFloat(value);
      setValues(prev => ({ ...prev, [id]: isNaN(num) ? value : num }));
    }
  }, []);

  return (
    <div style={{
      flex: 1,
      minWidth: '280px',
      background: 'var(--bg2)',
      borderRadius: '16px',
      border: `1px solid ${color}33`,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--brd)',
      }}>
        <span style={{
          width: '10px', height: '10px', borderRadius: '50%',
          background: color, display: 'inline-block',
          boxShadow: `0 0 8px ${color}55`,
        }} />
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--txt)' }}>{label}</span>
      </div>

      {/* Inputs */}
      {inputs.map(inp => (
        <div key={inp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--txt2)', fontWeight: 500 }}>{inp.label}</label>
          {inp.type === 'select' ? (
            <select
              value={String(values[inp.id])}
              onChange={e => handleChange(inp.id, e.target.value, 'select')}
              style={{
                background: 'var(--bg3)', border: '1px solid var(--brd)',
                borderRadius: '8px', padding: '8px 12px', color: 'var(--txt)',
                fontSize: '0.85rem',
              }}
            >
              {inp.options?.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {inp.prefix && <span style={{ fontSize: '0.8rem', color: 'var(--txt2)' }}>{inp.prefix}</span>}
              <input
                type={inp.type || 'number'}
                value={values[inp.id]}
                step="any"
                onChange={e => handleChange(inp.id, e.target.value, inp.type)}
                style={{
                  background: 'var(--bg3)', border: '1px solid var(--brd)',
                  borderRadius: '8px', padding: '8px 12px', color: 'var(--txt)',
                  fontSize: '0.85rem', width: '100%', outline: 'none',
                }}
              />
              {inp.suffix && <span style={{ fontSize: '0.8rem', color: 'var(--txt2)', whiteSpace: 'nowrap' }}>{inp.suffix}</span>}
            </div>
          )}
        </div>
      ))}

      {/* Result */}
      {result && (
        <div style={{
          marginTop: '8px',
          padding: '16px',
          background: `${color}11`,
          borderRadius: '12px',
          border: `1px solid ${color}33`,
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--txt2)', marginBottom: '4px' }}>
            {result.main.label}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color }}>
            {result.main.value}
          </div>
          {result.secondary?.slice(0, 4).map((s, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: '0.8rem', marginTop: '8px', color: 'var(--txt1)',
            }}>
              <span>{s.label}</span>
              <span style={{ fontWeight: 600, color: s.pos ? '#2E7BBF' : 'var(--txt)' }}>{s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComparisonMode({ calcId }: ComparisonModeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const def = DB[calcId];
  if (!def) return null;

  const colors = ['#004C8F', '#FF6B6B', '#2E7BBF'];

  return (
    <div style={{ marginTop: '24px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '12px',
          background: isOpen ? 'var(--p)' : 'var(--bg2)',
          color: isOpen ? '#fff' : 'var(--txt1)',
          border: `1px solid ${isOpen ? 'var(--p)' : 'var(--brd)'}`,
          fontSize: '0.88rem', fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s var(--ease)',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>{isOpen ? <Icon name="fa-xmark" /> : <Icon name="fa-scale-balanced" />}</span>
        {isOpen ? 'Close Comparison' : 'Compare Scenarios'}
      </button>

      {isOpen && (
        <div style={{
          marginTop: '16px',
          animation: 'slideUp 0.3s var(--ease)',
        }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '16px',
          }}>
            <ScenarioPanel label="Scenario A" color={colors[0]} inputs={def.inputs} calcId={calcId} />
            <ScenarioPanel label="Scenario B" color={colors[1]} inputs={def.inputs} calcId={calcId} />
          </div>
          <p style={{
            marginTop: '12px', fontSize: '0.78rem', color: 'var(--txt2)', textAlign: 'center',
          }}>
            <Icon name="fa-lightbulb" style={{ color: 'var(--p)', fontSize: '0.85rem' }} /> Adjust values in each scenario to compare results side-by-side
          </p>
        </div>
      )}
    </div>
  );
}
