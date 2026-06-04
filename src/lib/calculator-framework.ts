/* ═══════════════════════════════════════════════════
   Calc Labz — Reusable Calculator Framework
   Abstract engine interfaces for building engineering
   calculator workstations with consistent patterns.
   ═══════════════════════════════════════════════════ */
import type { EngineeringCalculatorConfig, EngineeringStandard, FormulaStep, EngineeringValidation } from '@/types/engineering';
import type { CalculatorResult } from '@/types/calculator';

// ── Engine Interfaces ─────────────────────────────

/**
 * InputEngine — Validates inputs, applies unit conversions, manages presets.
 */
export interface InputEngine {
  /** Validate a single input value */
  validate(fieldId: string, value: number | string): string | null;
  /** Apply unit conversion to a value */
  convertUnit?(value: number, fromUnit: string, toUnit: string): number;
  /** Get preset input configurations */
  getPresets?(): Record<string, Record<string, number | string>>;
}

/**
 * FormulaEngine — Executes calculations and generates derivation steps.
 */
export interface FormulaEngine {
  /** Run the calculation */
  calculate(inputs: Record<string, number | string>): CalculatorResult;
  /** Generate step-by-step derivation with intermediate values */
  getDerivationSteps(inputs: Record<string, number | string>): FormulaStep[];
}

/**
 * VisualizationEngine — Determines which charts/diagrams to render.
 */
export interface VisualizationEngine {
  /** Get the type of diagram to render for this calculator */
  getDiagramType(): 'beam' | 'circuit' | 'fluid' | 'gear' | 'thermal' | 'spring' | 'phasor' | 'transformer' | 'none';
  /** Get chart configuration based on result data */
  getChartConfig?(result: CalculatorResult): Record<string, unknown> | null;
}

/**
 * ReportEngine — Generates PDF/print-friendly output.
 */
export interface ReportEngine {
  /** Generate a PDF report blob */
  generatePDF(inputs: Record<string, number | string>, result: CalculatorResult): Promise<Blob>;
  /** Get report title */
  getReportTitle(): string;
}

/**
 * SEOEngine — Generates page-specific schemas, meta, and content.
 */
export interface SEOEngine {
  /** Get JSON-LD schemas specific to this calculator */
  getSchemas(): Record<string, unknown>[];
  /** Get meta description */
  getMetaDescription(): string;
}

// ── Calculator Factory ────────────────────────────

export interface EngineeringWorkstation {
  config: EngineeringCalculatorConfig;
  standards: EngineeringStandard[];
  formulaSteps: FormulaStep[];
  validate(inputs: Record<string, number | string>, mainValue: number | string): EngineeringValidation | null;
}

/**
 * Factory function to create an engineering calculator workstation
 * from a config object. Provides a standardized interface for
 * all engineering calculator pages.
 */
export function createEngineeringCalculator(config: EngineeringCalculatorConfig): EngineeringWorkstation {
  return {
    config,
    standards: config.standards,
    formulaSteps: config.formulaSteps,
    validate: (_inputs, _mainValue) => {
      // Validation is handled by engineering-validation.ts
      // This is a placeholder for the framework pattern
      return null;
    },
  };
}

/**
 * Check if a calculator ID belongs to the engineering category.
 * Used to conditionally render engineering-specific components.
 */
export function isEngineeringCalc(calcId: string): boolean {
  const ENGINEERING_CALC_IDS = [
    'ohmslaw', 'resistor', 'power', 'voltdivider', 'ledresistor',
    'batterylife', 'pcbtrace', 'decibel', 'antennalen', 'torque',
    'beamload', 'heatexchanger', 'fluidflow', 'springforce', 'gearratio',
    'inverterbattery', 'acbtu', 'pipeflow', 'threephase', 'transformer',
    'motorsize', 'resistorDecode', 'pythagorean',
  ];
  return ENGINEERING_CALC_IDS.includes(calcId);
}

/**
 * Get calculators that support material selection.
 */
export function supportsMaterials(calcId: string): boolean {
  return ['beamload', 'springforce', 'heatexchanger', 'fluidflow', 'pipeflow'].includes(calcId);
}
