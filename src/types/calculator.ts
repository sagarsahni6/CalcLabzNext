/* ═══════════════════════════════════════════════════
   Calc Labz — TypeScript Type Definitions
   ═══════════════════════════════════════════════════ */

export type CalculatorCategory =
  | 'finance'
  | 'health'
  | 'math'
  | 'everyday'
  | 'education'
  | 'engineering'
  | 'construction'
  | 'datetime'
  | 'science'
  | 'unit'
  | 'tech';

export interface CalculatorInput {
  id: string;
  label: string;
  default?: number | string;
  type?: 'number' | 'text' | 'select' | 'date' | 'time' | 'datetime-local';
  options?: string[];
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

export interface ResultMain {
  label: string;
  value: string | number;
}

export interface ResultSecondary {
  label: string;
  value: string | number;
  pos?: boolean;
  neg?: boolean;
}

export interface ChartData {
  a?: number;
  b?: number;
  lA?: string;
  lB?: string;
  labels?: string[];
  data?: number[];
  timeline?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
    }[];
  };
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
  collapsible?: boolean;
  highlightRows?: number[];  // indices of milestone rows to highlight
}

export interface SensitivityPoint {
  variable: string;        // input field id, e.g. 'rate'
  label: string;           // display label, e.g. 'Interest Rate'
  unit?: string;           // e.g. '%', 'months'
  range: number[];         // x-axis values
  values: number[];        // corresponding main result values
  currentIdx: number;      // index of current input value
  resultLabel?: string;    // e.g. 'Monthly EMI'
}

export interface CalculatorResult {
  main: ResultMain;
  secondary?: ResultSecondary[];
  chart?: ChartData;
  table?: TableData;
  sensitivity?: SensitivityPoint[];
  tips?: string[];
}

export type CalcFunction = (values: Record<string, number | string>) => CalculatorResult;

export interface CalculatorDefinition {
  name: string;
  desc: string;
  icon: string;
  cat: CalculatorCategory;
  badge?: string;
  inputs: CalculatorInput[];
  calc: CalcFunction | null;
  tips?: string[];
}

export interface RegistryEntry {
  id: string;
  slug: string;
  cat: CalculatorCategory;
  priority: string;
  name: string;
  prerender?: boolean;
  title?: string;
  desc?: string;
  blogSlug?: string;
}

export interface CategoryMeta {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const CATEGORY_META: Record<CalculatorCategory, CategoryMeta> = {
  finance: {
    name: 'Finance',
    icon: 'fa-landmark',
    color: 'linear-gradient(135deg, #2563EB, #3B82F6)',
    description: 'EMI, SIP, GST, Tax & Investment calculators',
  },
  health: {
    name: 'Health & Fitness',
    icon: 'fa-heartbeat',
    color: 'linear-gradient(135deg, #DC2626, #EF4444)',
    description: 'BMI, BMR, TDEE, Calories & health metrics',
  },
  math: {
    name: 'Math',
    icon: 'fa-calculator',
    color: 'linear-gradient(135deg, #6366F1, #818CF8)',
    description: 'Percentage, algebra, statistics & number tools',
  },
  everyday: {
    name: 'Everyday',
    icon: 'fa-lightbulb',
    color: 'linear-gradient(135deg, #D97706, #F59E0B)',
    description: 'Tip, discount, fuel, salary & daily life tools',
  },
  education: {
    name: 'Education',
    icon: 'fa-graduation-cap',
    color: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    description: 'GPA, exam scores, study planning tools',
  },
  engineering: {
    name: 'Engineering',
    icon: 'fa-gear',
    color: 'linear-gradient(135deg, #475569, #64748B)',
    description: 'Electrical, mechanical & physics calculators',
  },
  construction: {
    name: 'Construction',
    icon: 'fa-helmet-safety',
    color: 'linear-gradient(135deg, #B45309, #D97706)',
    description: 'Concrete, bricks, paint & building tools',
  },
  datetime: {
    name: 'Date & Time',
    icon: 'fa-clock',
    color: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    description: 'Date differences, working days & countdowns',
  },
  science: {
    name: 'Science',
    icon: 'fa-flask',
    color: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
    description: 'Physics, chemistry & scientific calculators',
  },
  unit: {
    name: 'Unit Conversion',
    icon: 'fa-right-left',
    color: 'linear-gradient(135deg, #DB2777, #EC4899)',
    description: 'Length, weight, temperature & unit converters',
  },
  tech: {
    name: 'Tech & Developer',
    icon: 'fa-code',
    color: 'linear-gradient(135deg, #0D9488, #14B8A6)',
    description: 'Password, subnet, bandwidth & developer tools',
  },
};
