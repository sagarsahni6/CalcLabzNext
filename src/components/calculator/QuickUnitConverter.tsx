'use client';

import { useState, useMemo } from 'react';
import { convert, getUnitKeys, formatWithUnit } from '@/lib/unit-converter';
import type { UnitCategory } from '@/types/engineering';
import Icon from '@/components/ui/Icon';

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  length: 'Length',
  force: 'Force',
  pressure: 'Pressure',
  temperature: 'Temperature',
  torque: 'Torque',
  power: 'Power',
  flow: 'Flow Rate',
  electrical: 'Electrical',
  area: 'Area',
  volume: 'Volume',
  mass: 'Mass',
  energy: 'Energy',
};

export default function QuickUnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('');
  const [expanded, setExpanded] = useState(false);

  const unitKeys = useMemo(() => getUnitKeys(category), [category]);

  // Default fromUnit when category changes
  useMemo(() => {
    const keys = getUnitKeys(category);
    if (keys.length > 0 && !keys.includes(fromUnit)) {
      setFromUnit(keys[0]);
    }
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  const numValue = parseFloat(inputValue) || 0;

  const conversions = useMemo(() => {
    if (!numValue || !fromUnit) return [];
    return unitKeys
      .filter((u) => u !== fromUnit)
      .map((toUnit) => {
        try {
          const converted = convert(numValue, fromUnit, toUnit);
          return { unit: toUnit, value: converted, formatted: formatWithUnit(converted, toUnit) };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as { unit: string; value: number; formatted: string }[];
  }, [numValue, fromUnit, unitKeys]);

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--brd)',
      borderRadius: '16px',
      overflow: 'hidden',
      marginTop: '16px',
    }}>
      {/* Header — click to expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '14px 18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--txt)',
          textAlign: 'left',
        }}
      >
        <Icon name="fa-arrows-rotate" style={{ fontSize: '0.9rem', color: 'var(--p)' }} />
        <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 600 }}>Quick Unit Converter</span>
        <Icon
          name={expanded ? 'fa-chevron-up' : 'fa-chevron-down'}
          style={{ fontSize: '0.7rem', color: 'var(--txt2)' }}
        />
      </button>

      {expanded && (
        <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Category selector */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(Object.keys(CATEGORY_LABELS) as UnitCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  border: category === cat ? '1px solid var(--p)' : '1px solid var(--brd)',
                  background: category === cat ? 'var(--p-light)' : 'var(--bg3)',
                  color: category === cat ? 'var(--p)' : 'var(--txt2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s var(--ease)',
                }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--bg1)',
                border: '1px solid var(--brd)',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--txt)',
                outline: 'none',
                fontFamily: 'var(--font-mono, monospace)',
              }}
              aria-label="Value to convert"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              style={{
                padding: '10px 12px',
                background: 'var(--bg1)',
                border: '1px solid var(--brd)',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--txt)',
                cursor: 'pointer',
                outline: 'none',
              }}
              aria-label="Unit to convert from"
            >
              {unitKeys.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Results */}
          {conversions.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '6px',
            }}>
              {conversions.map((c) => (
                <div
                  key={c.unit}
                  style={{
                    background: 'var(--bg1)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--txt)', fontFamily: 'var(--font-mono, monospace)' }}>
                    {c.value < 0.01 || c.value > 999999 ? c.value.toExponential(3) : c.value.toLocaleString('en-IN', { maximumFractionDigits: 4 })}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--p)', fontSize: '0.72rem' }}>
                    {c.unit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
