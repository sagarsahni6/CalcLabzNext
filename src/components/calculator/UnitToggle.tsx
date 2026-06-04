'use client';

import { useState, useMemo, useCallback } from 'react';
import { convert, getUnitKeys, formatWithUnit } from '@/lib/unit-converter';
import type { UnitCategory } from '@/types/engineering';
import Icon from '@/components/ui/Icon';

interface UnitToggleProps {
  value: number;
  /** The unit key the value is currently in (e.g. 'mm', 'N', 'Pa') */
  currentUnit: string;
  /** The unit category to show conversion options for */
  category: UnitCategory;
  /** Optional: label to show before the value */
  label?: string;
}

export default function UnitToggle({ value, currentUnit, category, label }: UnitToggleProps) {
  const [selectedUnit, setSelectedUnit] = useState(currentUnit);

  const unitKeys = useMemo(() => getUnitKeys(category), [category]);

  const convertedValue = useMemo(() => {
    if (selectedUnit === currentUnit) return value;
    try {
      return convert(value, currentUnit, selectedUnit);
    } catch {
      return value;
    }
  }, [value, currentUnit, selectedUnit]);

  const formatted = useMemo(() => formatWithUnit(convertedValue, selectedUnit), [convertedValue, selectedUnit]);

  const handleCycle = useCallback(() => {
    const idx = unitKeys.indexOf(selectedUnit);
    const nextIdx = (idx + 1) % unitKeys.length;
    setSelectedUnit(unitKeys[nextIdx]);
  }, [unitKeys, selectedUnit]);

  if (unitKeys.length <= 1) return null;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.82rem',
    }}>
      {label && <span style={{ color: 'var(--txt2)', fontWeight: 500 }}>{label}</span>}

      <span style={{
        fontWeight: 700,
        color: 'var(--txt)',
        fontFamily: 'var(--font-mono, monospace)',
      }}>
        {formatted}
      </span>

      <button
        onClick={handleCycle}
        title="Click to cycle units"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          padding: '3px 8px',
          borderRadius: '9999px',
          background: 'var(--p-light)',
          border: '1px solid var(--p)',
          color: 'var(--p)',
          fontSize: '0.7rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.15s var(--ease)',
          whiteSpace: 'nowrap',
        }}
        aria-label={`Toggle unit from ${selectedUnit}`}
      >
        <Icon name="fa-arrows-rotate" style={{ fontSize: '0.6rem' }} />
        {selectedUnit}
      </button>
    </div>
  );
}
