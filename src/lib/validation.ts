/* ═══════════════════════════════════════════════════
   Calc Labz — Input Validation Framework
   Reusable validation rules for calculator inputs.
   ═══════════════════════════════════════════════════ */

export interface ValidationRule {
  /** Field is required (non-empty, non-NaN) */
  required?: boolean;
  /** Minimum numeric value (inclusive) */
  min?: number;
  /** Maximum numeric value (inclusive) */
  max?: number;
  /** Value type constraint */
  type?: 'integer' | 'float' | 'positive' | 'non-negative';
  /** Custom validation function — return error message or null */
  custom?: (value: number | string) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate a single field value against a set of rules.
 * Returns an error message string, or null if valid.
 */
export function validateField(
  label: string,
  value: number | string | undefined,
  rules: ValidationRule
): string | null {
  // Required check
  if (rules.required) {
    if (value === '' || value === undefined || value === null) {
      return `${label} is required`;
    }
  }

  // For non-required empty fields, skip further checks
  if (value === '' || value === undefined || value === null) {
    return null;
  }

  // Numeric checks
  const num = typeof value === 'number' ? value : parseFloat(String(value));

  // For string values, check if they parse to a valid number
  if (isNaN(num)) {
    // String value that doesn't parse to a number
    if (typeof value === 'string') {
      return `${label}: enter a valid number`;
    }
    // Numeric NaN
    return `${label}: enter a valid number`;
  }

  if (rules.type === 'positive' && num <= 0) {
    return `${label} must be greater than 0`;
  }

  if (rules.type === 'non-negative' && num < 0) {
    return `${label} cannot be negative`;
  }

  if (rules.type === 'integer' && !Number.isInteger(num)) {
    return `${label} must be a whole number`;
  }

  if (rules.min !== undefined && num < rules.min) {
    return `${label} must be at least ${rules.min.toLocaleString('en-IN')}`;
  }

  if (rules.max !== undefined && num > rules.max) {
    return `${label} must be at most ${rules.max.toLocaleString('en-IN')}`;
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) return customError;
  }

  return null;
}

/**
 * Validate all fields in a values map against a rules map.
 * Returns a Record of field ID → error message (only for invalid fields).
 */
export function validateAll(
  values: Record<string, number | string>,
  rules: Record<string, { label: string; rules: ValidationRule }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [fieldId, config] of Object.entries(rules)) {
    const error = validateField(config.label, values[fieldId], config.rules);
    if (error) {
      errors[fieldId] = error;
    }
  }

  return errors;
}

/**
 * Sanitize a raw input string to a safe numeric value.
 * Strips non-numeric characters (except decimal point and minus sign).
 * Returns the cleaned number or NaN if invalid.
 */
export function sanitizeNumericInput(value: string): number {
  const cleaned = value.replace(/[^0-9.\-]/g, '');
  return parseFloat(cleaned);
}

/**
 * Clamp a number to a given range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
