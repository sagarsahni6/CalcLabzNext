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
  | 'unit';

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

export interface CalculatorResult {
  main: ResultMain;
  secondary?: ResultSecondary[];
  chart?: ChartData;
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
    color: 'linear-gradient(135deg, #004C8F, #2E7BBF)',
    description: 'EMI, SIP, GST, Tax & Investment calculators',
  },
  health: {
    name: 'Health & Fitness',
    icon: 'fa-heartbeat',
    color: 'linear-gradient(135deg, #ef4444, #f87171)',
    description: 'BMI, BMR, TDEE, Calories & health metrics',
  },
  math: {
    name: 'Math',
    icon: 'fa-calculator',
    color: 'linear-gradient(135deg, #6366f1, #818cf8)',
    description: 'Percentage, algebra, statistics & number tools',
  },
  everyday: {
    name: 'Everyday',
    icon: 'fa-lightbulb',
    color: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    description: 'Tip, discount, fuel, salary & daily life tools',
  },
  education: {
    name: 'Education',
    icon: 'fa-graduation-cap',
    color: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    description: 'GPA, exam scores, study planning tools',
  },
  engineering: {
    name: 'Engineering',
    icon: 'fa-gear',
    color: 'linear-gradient(135deg, #64748b, #94a3b8)',
    description: 'Electrical, mechanical & physics calculators',
  },
  construction: {
    name: 'Construction',
    icon: 'fa-helmet-safety',
    color: 'linear-gradient(135deg, #d97706, #f59e0b)',
    description: 'Concrete, bricks, paint & building tools',
  },
  datetime: {
    name: 'Date & Time',
    icon: 'fa-clock',
    color: 'linear-gradient(135deg, #004C8F, #2E7BBF)',
    description: 'Date differences, working days & countdowns',
  },
  science: {
    name: 'Science',
    icon: 'fa-flask',
    color: 'linear-gradient(135deg, #003D75, #004C8F)',
    description: 'Physics, chemistry & scientific calculators',
  },
  unit: {
    name: 'Unit Conversion',
    icon: 'fa-right-left',
    color: 'linear-gradient(135deg, #ec4899, #f472b6)',
    description: 'Length, weight, temperature & unit converters',
  },
};
