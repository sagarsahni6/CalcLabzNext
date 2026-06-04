/* ═══════════════════════════════════════════════════
   Calc Labz — Engineering Workstation Type Definitions
   Extended types for professional engineering features.
   ═══════════════════════════════════════════════════ */

// ── Engineering Standards ──────────────────────────
export interface EngineeringStandard {
  code: string;        // e.g. 'AISC 360-22'
  section?: string;    // e.g. 'Chapter F'
  title: string;       // e.g. 'Specification for Structural Steel Buildings'
  organization: 'ASME' | 'AISC' | 'Eurocode' | 'IS' | 'IEC' | 'NEC' | 'TEMA' | 'IPC' | 'ASHRAE' | 'AGMA' | 'IEEE';
  description: string;
  url?: string;
}

// ── Engineering Validation ─────────────────────────
export type ValidationStatus = 'safe' | 'warning' | 'critical';

export interface EngineeringValidation {
  status: ValidationStatus;
  title: string;
  message: string;
  standardRef?: string;  // e.g. 'AISC 360, L.1'
  limit?: string;        // e.g. 'L/250'
  actual?: string;       // e.g. 'L/180'
}

export const VALIDATION_CONFIG: Record<ValidationStatus, { color: string; bg: string; border: string; icon: string; label: string }> = {
  safe:     { color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: 'fa-shield-check',           label: 'SAFE' },
  warning:  { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  icon: 'fa-triangle-exclamation',  label: 'WARNING' },
  critical: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   icon: 'fa-circle-exclamation',    label: 'CRITICAL' },
};

// ── Formula Derivation Steps ───────────────────────
export interface FormulaStep {
  step: number;
  title: string;
  description: string;
  latex: string;          // KaTeX expression
  result?: string;        // Computed intermediate value
}

// ── Material Properties ────────────────────────────
export type MaterialCategory = 'structural-steel' | 'stainless-steel' | 'aluminum' | 'copper' | 'concrete' | 'timber' | 'plastic' | 'composite';

export interface MaterialProperty {
  id: string;
  name: string;
  category: MaterialCategory;
  grade?: string;
  standard?: string;         // e.g. 'IS 2062', 'ASTM A36'
  density: number;           // kg/m³
  yieldStrength?: number;    // MPa
  tensileStrength?: number;  // MPa
  elasticModulus?: number;   // GPa
  poissonsRatio?: number;
  thermalConductivity?: number;  // W/(m·K)
  specificHeat?: number;         // J/(kg·K)
  thermalExpansion?: number;     // µm/(m·°C)
  electricalResistivity?: number; // µΩ·cm
}

// ── Unit Conversion ────────────────────────────────
export type UnitCategory = 'length' | 'force' | 'pressure' | 'temperature' | 'torque' | 'power' | 'flow' | 'electrical' | 'area' | 'volume' | 'mass' | 'energy';

export interface UnitDefinition {
  symbol: string;
  name: string;
  category: UnitCategory;
  toBase: number;    // multiply by this to get SI base
  offset?: number;   // for temperature conversions
}

// ── Project Save/Load ──────────────────────────────
export interface EngineeringProject {
  id: string;
  name: string;
  calcId: string;
  calcName: string;
  inputs: Record<string, number | string>;
  timestamp: number;
  notes?: string;
}

// ── Engineering Calculator Config ──────────────────
export interface EngineeringCalculatorConfig {
  calcId: string;
  standards: EngineeringStandard[];
  formulaSteps: FormulaStep[];
  materials?: string[];       // IDs of applicable materials
  unitGroups?: UnitCategory[];
  education: {
    theory: string;
    applications: string[];
    examples: { title: string; steps: string[] }[];
    faqs: { q: string; a: string }[];
  };
}
