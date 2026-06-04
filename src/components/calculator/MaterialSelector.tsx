'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Icon from '@/components/ui/Icon';
import type { MaterialProperty } from '@/types/engineering';
import { getMaterialsByCategory, searchMaterials } from '@/data/materials-db';

interface MaterialSelectorProps {
  /** Called when a material is selected, with the material's key properties */
  onSelect: (material: MaterialProperty) => void;
  /** Currently selected material ID */
  selectedId?: string;
}

export default function MaterialSelector({ onSelect, selectedId }: MaterialSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const filteredMaterials = useMemo(() => {
    if (!search.trim()) return getMaterialsByCategory();
    const results = searchMaterials(search);
    const grouped: Record<string, MaterialProperty[]> = {};
    for (const mat of results) {
      const catLabel = mat.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      if (!grouped[catLabel]) grouped[catLabel] = [];
      grouped[catLabel].push(mat);
    }
    return grouped;
  }, [search]);

  const totalResults = Object.values(filteredMaterials).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="standalone-section material-selector-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-cubes" />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Material Properties</h2>
          <p>Select a material to auto-fill properties</p>
        </div>
      </div>

      <div className="standalone-section-body" ref={menuRef}>
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg2)',
          border: '1px solid var(--brd)',
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '12px',
          transition: 'all 0.2s var(--ease)',
        }}>
          <Icon name="fa-magnifying-glass" style={{ color: 'var(--txt2)', fontSize: '0.85rem' }} />
          <input
            type="text"
            placeholder="Search materials (e.g. A36, 6061, M20)..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '0.88rem',
              color: 'var(--txt)',
            }}
            aria-label="Search engineering materials"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', color: 'var(--txt2)', cursor: 'pointer', fontSize: '0.8rem' }}
              aria-label="Clear search"
            >
              <Icon name="fa-xmark" />
            </button>
          )}
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--txt2)',
            background: 'var(--bg3)',
            padding: '2px 8px',
            borderRadius: '9999px',
          }}>
            {totalResults}
          </span>
        </div>

        {/* Material list */}
        {open && (
          <div style={{
            maxHeight: '360px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--bg3) transparent',
          }}>
            {Object.entries(filteredMaterials).map(([category, materials]) => (
              <div key={category}>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--p)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px',
                  paddingLeft: '4px',
                }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => {
                        onSelect(mat);
                        setOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: selectedId === mat.id ? 'var(--p-light)' : 'var(--bg2)',
                        border: `1px solid ${selectedId === mat.id ? 'var(--p)' : 'var(--brd)'}`,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s var(--ease)',
                        color: 'var(--txt)',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {mat.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--txt2)', display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '2px' }}>
                          {mat.yieldStrength && <span>σy: {mat.yieldStrength} MPa</span>}
                          {mat.elasticModulus && <span>E: {mat.elasticModulus} GPa</span>}
                          {mat.density && <span>ρ: {mat.density} kg/m³</span>}
                        </div>
                      </div>
                      {mat.grade && (
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: 'var(--txt2)',
                          background: 'var(--bg3)',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          flexShrink: 0,
                        }}>
                          {mat.grade}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {totalResults === 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--txt2)', fontSize: '0.85rem' }}>
                <Icon name="fa-search" style={{ marginBottom: '8px', fontSize: '1.2rem', display: 'block' }} />
                No materials found for &quot;{search}&quot;
              </div>
            )}
          </div>
        )}

        {/* Collapsed state: show selected material summary */}
        {!open && selectedId && (() => {
          const selected = searchMaterials('').find((m) => m.id === selectedId);
          if (!selected) return null;
          return (
            <div
              style={{
                background: 'var(--p-light)',
                border: '1px solid var(--p)',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                cursor: 'pointer',
              }}
              onClick={() => setOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--txt)' }}>{selected.name}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--p)', fontWeight: 600 }}>Change ▾</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--txt1)' }}>
                {selected.density && <span><strong>ρ:</strong> {selected.density} kg/m³</span>}
                {selected.yieldStrength && <span><strong>σy:</strong> {selected.yieldStrength} MPa</span>}
                {selected.tensileStrength && <span><strong>σu:</strong> {selected.tensileStrength} MPa</span>}
                {selected.elasticModulus && <span><strong>E:</strong> {selected.elasticModulus} GPa</span>}
                {selected.thermalConductivity && <span><strong>k:</strong> {selected.thermalConductivity} W/(m·K)</span>}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
