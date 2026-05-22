/* ═══════════════════════════════════════════════════
   Calc Labz — Calculation History Manager
   localStorage-based history with search and filtering
   ═══════════════════════════════════════════════════ */

export interface HistoryEntry {
  calcId: string;
  name: string;
  result: string;
  ts: number;
  inputs?: Record<string, number | string>;
  category?: string;
}

const HISTORY_KEY = 'cp_history';
const MAX_ENTRIES = 50;

const EMPTY_ARRAY: HistoryEntry[] = [];
let cachedHistory: HistoryEntry[] | null = null;

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notify() {
  cachedHistory = null;
  listeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.warn('Failed to notify listener:', e);
    }
  });
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return EMPTY_ARRAY;
  if (cachedHistory) return cachedHistory;
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    cachedHistory = data ? JSON.parse(data) : EMPTY_ARRAY;
    return cachedHistory!;
  } catch {
    cachedHistory = EMPTY_ARRAY;
    return cachedHistory;
  }
}

export function addToHistory(entry: Omit<HistoryEntry, 'ts'>): void {
  if (typeof window === 'undefined') return;
  try {
    let list = getHistory();
    // Remove duplicate for same calculator
    list = list.filter(h => h.calcId !== entry.calcId);
    list.unshift({ ...entry, ts: Date.now() });
    list = list.slice(0, MAX_ENTRIES);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
    notify();
  } catch (e) {
    console.warn('Failed to save history:', e);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
  notify();
}

export function getRecentlyUsed(limit = 8): HistoryEntry[] {
  return getHistory().slice(0, limit);
}

export function getHistoryByCategory(category: string): HistoryEntry[] {
  return getHistory().filter(h => h.category === category);
}

export function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
