'use client';

import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from 'recharts';
import { ChartData } from '@/types/calculator';

/* ── Color Palette (Calc Labz Premium Theme Colors) ─ */
const CHART_COLORS = [
  '#3B82F6', // Electric Blue (Primary)
  '#10B981', // Emerald Green (Asset/Gain)
  '#F59E0B', // Amber (Warning/Cost)
  '#6366F1', // Indigo (Accent)
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#FB7185', // Soft Rose
  '#94A3B8', // Cool Slate
];

const AREA_GRADIENTS = [
  { id: 'grad0', start: '#3B82F6', end: 'rgba(59,130,246,0.02)' },
  { id: 'grad1', start: '#10B981', end: 'rgba(16,185,129,0.02)' },
  { id: 'grad2', start: '#F59E0B', end: 'rgba(245,158,11,0.02)' },
];

/* ── Currency formatter for tooltips ───────────────── */
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
}

interface LegendPayloadEntry {
  value: string;
  color: string;
}

/* ── Custom Tooltip ────────────────────────────────── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadEntry[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg1, #12121a)',
      border: '1px solid var(--brd, rgba(255,255,255,0.1))',
      borderRadius: '12px',
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(12px)',
      fontSize: '0.82rem',
      minWidth: '140px',
    }}>
      {label && <div style={{ fontWeight: 700, color: 'var(--txt, #f0f0f5)', marginBottom: '8px', fontSize: '0.85rem' }}>{label}</div>}
      {payload.map((entry: TooltipPayloadEntry, idx: number) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '4px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--txt1, #a0a0b8)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
            {entry.name}
          </span>
          <span style={{ fontWeight: 600, color: 'var(--txt, #f0f0f5)' }}>
            {formatValue(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Custom Legend ──────────────────────────────────── */
function CustomLegend({ payload }: { payload?: LegendPayloadEntry[] }) {
  if (!payload?.length) return null;
  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
      {payload.map((entry: LegendPayloadEntry, idx: number) => (
        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--txt1, #a0a0b8)' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: entry.color, display: 'inline-block' }} />
          {entry.value}
        </span>
      ))}
    </div>
  );
}

/* ── Donut/Pie Chart ───────────────────────────────── */
function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  if (total <= 0) return null;

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
            stroke="none"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div style={{
        position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--txt2, #6b6b82)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--txt, #f0f0f5)', marginTop: '2px' }}>
          {formatValue(total)}
        </div>
      </div>
    </div>
  );
}

/* ── Timeline/Area Chart ───────────────────────────── */
function TimelineChart({ timeline }: { timeline: NonNullable<ChartData['timeline']> }) {
  const chartData = useMemo(() => {
    return timeline.labels.map((label, idx) => {
      const point: Record<string, string | number> = { name: label };
      timeline.datasets.forEach(ds => {
        point[ds.label] = ds.data[idx];
      });
      return point;
    });
  }, [timeline]);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {timeline.datasets.map((_, idx) => (
            <linearGradient key={idx} id={AREA_GRADIENTS[idx % AREA_GRADIENTS.length].id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={AREA_GRADIENTS[idx % AREA_GRADIENTS.length].start} stopOpacity={0.3} />
              <stop offset="95%" stopColor={AREA_GRADIENTS[idx % AREA_GRADIENTS.length].end} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--brd, rgba(255,255,255,0.07))" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'var(--txt2, #6b6b82)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--brd, rgba(255,255,255,0.07))' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => {
            if (v >= 10000000) return (v / 10000000).toFixed(1) + 'Cr';
            if (v >= 100000) return (v / 100000).toFixed(1) + 'L';
            if (v >= 1000) return (v / 1000).toFixed(0) + 'K';
            return v;
          }}
          tick={{ fill: 'var(--txt2, #6b6b82)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        {timeline.datasets.map((ds, idx) => (
          <Area
            key={ds.label}
            type="monotone"
            dataKey={ds.label}
            stroke={CHART_COLORS[idx % CHART_COLORS.length]}
            strokeWidth={2}
            fill={ds.fill ? `url(#${AREA_GRADIENTS[idx % AREA_GRADIENTS.length].id})` : 'none'}
            animationBegin={idx * 200}
            animationDuration={800}
            animationEasing="ease-out"
            dot={false}
            activeDot={{ r: 5, stroke: CHART_COLORS[idx % CHART_COLORS.length], strokeWidth: 2, fill: 'var(--bg1, #12121a)' }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Comparison Bar Chart ──────────────────────────── */
function ComparisonChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--brd, rgba(255,255,255,0.07))" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'var(--txt2, #6b6b82)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--brd, rgba(255,255,255,0.07))' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatValue(v)}
          tick={{ fill: 'var(--txt2, #6b6b82)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
          {data.map((_, idx) => (
            <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ═══════════════════════════════════════════════════
   Main ResultChart Component
   Auto-selects chart type based on data shape
   ═══════════════════════════════════════════════════ */
interface ResultChartProps {
  chart: ChartData;
  calcId?: string;
}

export default function ResultChart({ chart, calcId }: ResultChartProps) {
  // Determine chart type based on data shape
  const hasTimeline = chart.timeline && chart.timeline.labels.length > 0;
  const hasPieData = (chart.a !== undefined && chart.b !== undefined) || (chart.labels && chart.data);

  // Build pie data
  const pieData = useMemo(() => {
    if (chart.labels && chart.data) {
      return chart.labels.map((label, idx) => ({ name: label, value: chart.data![idx] }));
    }
    if (chart.a !== undefined && chart.b !== undefined) {
      return [
        { name: chart.lA || 'Part A', value: chart.a },
        { name: chart.lB || 'Part B', value: chart.b },
      ];
    }
    return [];
  }, [chart]);

  // Determine if this is a comparison calculator
  // Calculators where labels+data should render as bar chart (comparison/zones) not donut
  const isComparison = calcId === 'taxregime' || calcId === 'rentvsbuy' || calcId === 'loancompare'
    || calcId === 'bmr' || calcId === 'heartrate' || calcId === 'bloodpressure'
    || calcId === 'cholesterolratio' || calcId === 'sleep' || calcId === 'vo2max'
    || calcId === 'idealweight' || calcId === 'bsa' || calcId === 'electrolyte'
    || calcId === 'runningpace';

  return (
    <div style={{
      background: 'var(--bg2, #1a1a25)',
      borderRadius: '16px',
      border: '1px solid var(--brd, rgba(255,255,255,0.07))',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Donut / Pie Chart */}
      {hasPieData && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--txt2, #6b6b82)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isComparison ? 'Comparison' : 'Breakdown'}
          </div>
          {isComparison ? (
            <ComparisonChart data={pieData} />
          ) : (
            <DonutChart data={pieData} />
          )}
        </div>
      )}

      {/* Timeline / Area Chart */}
      {hasTimeline && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--txt2, #6b6b82)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Growth Over Time
          </div>
          <TimelineChart timeline={chart.timeline!} />
        </div>
      )}
    </div>
  );
}
