'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpValueProps {
  value: string | number;
  duration?: number;
  className?: string;
}

/**
 * Animates a numeric value from 0 to the target using requestAnimationFrame.
 * Falls back to instant display for non-numeric values or when
 * prefers-reduced-motion is active.
 */
export default function CountUpValue({
  value,
  duration = 600,
  className = '',
}: CountUpValueProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value));
  const rafRef = useRef<number | null>(null);
  const prevValueRef = useRef<string>(String(value));

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(String(value));
      return;
    }

    const raw = String(value);

    // Extract numeric part (handle currency symbols, commas, %, etc.)
    const numericMatch = raw.match(/[\d,.]+/);
    if (!numericMatch) {
      setDisplayValue(raw);
      return;
    }

    const numericStr = numericMatch[0];
    const numericClean = numericStr.replace(/,/g, '');
    const target = parseFloat(numericClean);

    if (isNaN(target) || target === 0) {
      setDisplayValue(raw);
      return;
    }

    // Determine prefix and suffix around the numeric part
    const numStart = raw.indexOf(numericStr);
    const prefix = raw.slice(0, numStart);
    const suffix = raw.slice(numStart + numericStr.length);

    // Determine decimal places
    const decimalParts = numericClean.split('.');
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;

    // Determine if original used commas (Indian/international formatting)
    const usesCommas = numericStr.includes(',');

    // Format number with commas matching original pattern
    const formatNumber = (n: number): string => {
      const fixed = n.toFixed(decimals);
      if (!usesCommas) return fixed;
      // Use Indian number formatting if the original looks like it (e.g., 1,00,000)
      const parts = fixed.split('.');
      const intPart = parts[0];
      // Simple comma insertion (last 3 digits, then groups of 2 for Indian)
      const isIndian = numericStr.match(/,\d{2},/) !== null;
      let formatted: string;
      if (isIndian) {
        // Indian grouping: last 3 digits, then groups of 2
        const len = intPart.length;
        if (len <= 3) {
          formatted = intPart;
        } else {
          const last3 = intPart.slice(-3);
          const rest = intPart.slice(0, -3);
          const groups = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
          formatted = groups + ',' + last3;
        }
      } else {
        formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return decimals > 0 ? formatted + '.' + parts[1] : formatted;
    };

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * eased;
      setDisplayValue(prefix + formatNumber(currentValue) + suffix);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(raw);
      }
    };

    // Cancel any running animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(animate);
    prevValueRef.current = raw;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
}
