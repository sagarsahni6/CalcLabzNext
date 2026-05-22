/* ═══════════════════════════════════════════════════
   Calc Labz — Formatter Utilities
   ═══════════════════════════════════════════════════ */

/**
 * Fast INR formatter (10-15x faster than toLocaleString('en-IN'))
 * Ported from original app.js formatINR function
 */
export function formatINR(n: number): string {
  n = Math.round(n);
  if (n < 0) return '-' + formatINR(-n);
  const s = n.toString();
  if (s.length <= 3) return s;
  let r = s.slice(-3);
  let i = s.slice(0, -3);
  while (i.length > 2) {
    r = i.slice(-2) + ',' + r;
    i = i.slice(0, -2);
  }
  return i ? i + ',' + r : r;
}

/**
 * Format a number as Indian Rupees with ₹ prefix
 */
export function formatRupees(n: number): string {
  return '₹' + formatINR(n);
}

/**
 * Format time ago from timestamp
 */
export function formatAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  return Math.floor(diff / 86400000) + 'd ago';
}

/**
 * Escape HTML special characters
 */
export function escHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
