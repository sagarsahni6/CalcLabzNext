'use client';

import { useState, useCallback } from 'react';
import { TableData } from '@/types/calculator';
import Icon from '@/components/ui/Icon';

interface AmortizationTableProps {
  table: TableData;
}

function formatCell(val: string | number): string {
  if (typeof val === 'number') {
    if (Math.abs(val) >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr';
    if (Math.abs(val) >= 100000) return '₹' + (val / 100000).toFixed(2) + ' L';
    if (Math.abs(val) >= 1000) return '₹' + val.toLocaleString('en-IN');
    return val.toLocaleString('en-IN');
  }
  return String(val);
}

export default function AmortizationTable({ table }: AmortizationTableProps) {
  const [expanded, setExpanded] = useState(false);
  const isCollapsible = table.collapsible !== false && table.rows.length > 5;
  const visibleRows = isCollapsible && !expanded ? table.rows.slice(0, 5) : table.rows;

  const exportCSV = useCallback(() => {
    const csvContent = [
      table.headers.join(','),
      ...table.rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(table.title || 'breakdown').replace(/\s+/g, '_').toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [table]);

  return (
    <div className="amort-table-wrap" style={{
      background: 'var(--bg2)',
      borderRadius: '16px',
      border: '1px solid var(--brd)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--brd)',
        background: 'var(--surface-glass, var(--bg2))',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--p)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <Icon name="fa-table" />
          {table.title || 'Year-by-Year Breakdown'}
        </div>
        <button
          onClick={exportCSV}
          title="Export as CSV"
          style={{
            background: 'none',
            border: '1px solid var(--brd)',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '0.75rem',
            color: 'var(--txt1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s',
          }}
        >
          <Icon name="fa-download" style={{ fontSize: '0.7rem' }} />
          CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.82rem',
        }}>
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} style={{
                  padding: '10px 14px',
                  textAlign: i === 0 ? 'left' : 'right',
                  color: 'var(--txt2)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  borderBottom: '1px solid var(--brd)',
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  top: 0,
                  background: 'var(--bg2)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIdx) => {
              const isHighlight = table.highlightRows?.includes(rowIdx);
              return (
                <tr
                  key={rowIdx}
                  style={{
                    background: isHighlight
                      ? 'rgba(59, 130, 246, 0.08)'
                      : rowIdx % 2 === 0
                        ? 'transparent'
                        : 'rgba(255,255,255,0.015)',
                    transition: 'background 0.15s',
                    borderLeft: isHighlight ? '3px solid var(--p)' : '3px solid transparent',
                  }}
                >
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} style={{
                      padding: '9px 14px',
                      textAlign: cellIdx === 0 ? 'left' : 'right',
                      color: isHighlight ? 'var(--fg)' : 'var(--txt1)',
                      fontWeight: isHighlight ? 600 : 400,
                      borderBottom: '1px solid var(--brd)',
                      whiteSpace: 'nowrap',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {formatCell(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show More / Show Less */}
      {isCollapsible && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            width: '100%',
            padding: '12px',
            background: 'none',
            border: 'none',
            borderTop: '1px solid var(--brd)',
            color: 'var(--p)',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Icon
            name={expanded ? 'fa-chevron-up' : 'fa-chevron-down'}
            style={{ fontSize: '0.7rem' }}
          />
          {expanded
            ? 'Show Less'
            : `Show All ${table.rows.length} Rows`}
        </button>
      )}
    </div>
  );
}
