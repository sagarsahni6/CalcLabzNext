'use client';

import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceDot, ReferenceLine,
} from 'recharts';
import { SensitivityPoint } from '@/types/calculator';
import Icon from '@/components/ui/Icon';

function formatValue(val: number): string {
  if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr';
  if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + ' L';
  if (val >= 1000) return '₹' + val.toLocaleString('en-IN');
  return val.toLocaleString('en-IN');
}

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
  payload: Record<string, number>;
}

function SensitivityTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadEntry[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div style={{
      background: 'var(--bg1, #12121a)',
      border: '1px solid var(--brd, rgba(255,255,255,0.1))',
      borderRadius: '10px',
      padding: '10px 14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      fontSize: '0.8rem',
    }}>
      <div style={{ color: 'var(--txt2)', marginBottom: '4px' }}>
        {point.payload.label}
      </div>
      <div style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '0.95rem' }}>
        {formatValue(point.value)}
      </div>
    </div>
  );
}

function SensitivityChart({ point }: { point: SensitivityPoint }) {
  const chartData = useMemo(() => {
    return point.range.map((x, idx) => ({
      x,
      value: point.values[idx],
      label: `${point.label}: ${x}${point.unit || ''}`,
    }));
  }, [point]);

  const currentX = point.range[point.currentIdx];
  const currentY = point.values[point.currentIdx];

  // Calculate min/max for highlighting range
  const minVal = Math.min(...point.values);
  const maxVal = Math.max(...point.values);
  const range = maxVal - minVal;
  const pctChange = ((maxVal - minVal) / (minVal || 1) * 100).toFixed(1);

  return (
    <div style={{
      background: 'var(--bg2)',
      borderRadius: '14px',
      border: '1px solid var(--brd)',
      padding: '16px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--txt2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {point.resultLabel || 'Result'} vs {point.label}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--txt2)', marginTop: '2px' }}>
            Range: {formatValue(minVal)} — {formatValue(maxVal)} ({pctChange}% swing)
          </div>
        </div>
        <div style={{
          background: 'rgba(59, 130, 246, 0.12)',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--p)',
        }}>
          Current: {currentX}{point.unit || ''}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sensitivityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--brd, rgba(255,255,255,0.05))" />
          <XAxis
            dataKey="x"
            tick={{ fill: 'var(--txt2)', fontSize: 10 }}
            axisLine={{ stroke: 'var(--brd)' }}
            tickLine={false}
            tickFormatter={(v) => `${v}${point.unit || ''}`}
          />
          <YAxis
            tickFormatter={(v) => {
              if (v >= 10000000) return (v / 10000000).toFixed(1) + 'Cr';
              if (v >= 100000) return (v / 100000).toFixed(1) + 'L';
              if (v >= 1000) return (v / 1000).toFixed(0) + 'K';
              return v;
            }}
            tick={{ fill: 'var(--txt2)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={50}
            domain={[minVal - range * 0.05, maxVal + range * 0.05]}
          />
          <Tooltip content={<SensitivityTooltip />} />
          <ReferenceLine x={currentX} stroke="var(--p)" strokeDasharray="4 4" strokeWidth={1.5} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={2.5}
            fill="url(#sensitivityGrad)"
            animationDuration={600}
            dot={false}
            activeDot={{ r: 5, stroke: '#6366F1', strokeWidth: 2, fill: 'var(--bg1)' }}
          />
          <ReferenceDot
            x={currentX}
            y={currentY}
            r={6}
            fill="#6366F1"
            stroke="#fff"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SensitivityAnalysisProps {
  sensitivity: SensitivityPoint[];
}

export default function SensitivityAnalysis({ sensitivity }: SensitivityAnalysisProps) {
  if (!sensitivity || sensitivity.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Section Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: 'var(--p)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        <Icon name="fa-sliders" />
        What-If Analysis
      </div>

      {/* Sensitivity Charts */}
      {sensitivity.map((point, idx) => (
        <SensitivityChart key={idx} point={point} />
      ))}
    </div>
  );
}
