/* ═══════════════════════════════════════════════════
   Calc Labz — Structured Logger
   Production-safe logging with levels and context.
   Extend with Sentry/OpenTelemetry when ready.
   ═══════════════════════════════════════════════════ */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// In production, only log warnings and errors
const MIN_LEVEL: LogLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LEVEL];
}

function formatEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.context ? `[${entry.context}]` : '',
    entry.message,
  ].filter(Boolean);

  return parts.join(' ');
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: string,
  data?: Record<string, unknown>,
): LogEntry {
  return {
    level,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
  };
}

function log(level: LogLevel, message: string, context?: string, data?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;

  const entry = createLogEntry(level, message, context, data);
  const formatted = formatEntry(entry);

  switch (level) {
    case 'debug':
      console.debug(formatted, data || '');
      break;
    case 'info':
      console.info(formatted, data || '');
      break;
    case 'warn':
      console.warn(formatted, data || '');
      break;
    case 'error':
      console.error(formatted, data || '');
      break;
  }

  // Future: Send to Sentry, OpenTelemetry, or external logging service
  // if (level === 'error' && typeof Sentry !== 'undefined') {
  //   Sentry.captureException(new Error(message), { extra: data });
  // }
}

/**
 * Create a scoped logger with a fixed context prefix.
 *
 * @example
 * const log = createLogger('ContactAPI');
 * log.info('Form submitted', { email: '...' });
 * log.error('Submission failed', { error: err.message });
 */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: Record<string, unknown>) => log('debug', message, context, data),
    info: (message: string, data?: Record<string, unknown>) => log('info', message, context, data),
    warn: (message: string, data?: Record<string, unknown>) => log('warn', message, context, data),
    error: (message: string, data?: Record<string, unknown>) => log('error', message, context, data),
  };
}

/** Default logger without context */
export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => log('debug', message, undefined, data),
  info: (message: string, data?: Record<string, unknown>) => log('info', message, undefined, data),
  warn: (message: string, data?: Record<string, unknown>) => log('warn', message, undefined, data),
  error: (message: string, data?: Record<string, unknown>) => log('error', message, undefined, data),
};
