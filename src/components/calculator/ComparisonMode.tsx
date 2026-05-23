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
    <div className="cmp-panel" style={{ borderColor: `${color}33` }}>
      {/* Header */}
      <div className="cmp-panel-hdr">
        <span className="cmp-dot" style={{ background: color, boxShadow: `0 0 8px ${color}55` }} />
        <span className="cmp-panel-label">{label}</span>
      </div>

      {/* Inputs */}
      {inputs.map(inp => (
        <div key={inp.id} className="cmp-inp-grp">
          <label className="cmp-label">{inp.label}</label>
          {inp.type === 'select' ? (
            <select
              value={String(values[inp.id])}
              onChange={e => handleChange(inp.id, e.target.value, 'select')}
              className="cmp-input"
            >
              {inp.options?.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <div className="cmp-inp-row">
              {inp.prefix && <span className="cmp-affix">{inp.prefix}</span>}
              <input
                type={inp.type || 'number'}
                value={values[inp.id]}
                step="any"
                onChange={e => handleChange(inp.id, e.target.value, inp.type)}
                className="cmp-input"
              />
              {inp.suffix && <span className="cmp-affix">{inp.suffix}</span>}
            </div>
          )}
        </div>
      ))}

      {/* Result */}
      {result && (
        <div className="cmp-result" style={{ background: `${color}11`, borderColor: `${color}33` }}>
          <div className="cmp-result-label">{result.main.label}</div>
          <div className="cmp-result-value" style={{ color }}>{result.main.value}</div>
          {result.secondary?.slice(0, 4).map((s, i) => (
            <div key={i} className="cmp-result-row">
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
    <div className="cmp-wrap">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cmp-toggle${isOpen ? ' active' : ''}`}
      >
        <span>{isOpen ? <Icon name="fa-xmark" /> : <Icon name="fa-scale-balanced" />}</span>
        {isOpen ? 'Close Comparison' : 'Compare Scenarios'}
      </button>

      {isOpen && (
        <div className="cmp-body pulse">
          <div className="cmp-panels">
            <ScenarioPanel label="Scenario A" color={colors[0]} inputs={def.inputs} calcId={calcId} />
            <ScenarioPanel label="Scenario B" color={colors[1]} inputs={def.inputs} calcId={calcId} />
          </div>
          <p className="cmp-hint">
            <Icon name="fa-lightbulb" /> Adjust values in each scenario to compare results side-by-side
          </p>
        </div>
      )}
    </div>
  );
}

