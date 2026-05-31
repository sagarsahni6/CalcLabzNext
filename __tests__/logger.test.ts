/* ═══════════════════════════════════════════════════
   Calc Labz — Logger Unit Tests
   ═══════════════════════════════════════════════════ */

import { describe, test, expect, vi } from 'vitest';
import { createLogger, logger } from '@/lib/logger';

describe('logger', () => {
  test('has all log level methods', () => {
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  test('error logs to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('test error');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('warn logs to console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('test warning');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('createLogger', () => {
  test('creates a scoped logger with all methods', () => {
    const log = createLogger('TestContext');
    expect(typeof log.debug).toBe('function');
    expect(typeof log.info).toBe('function');
    expect(typeof log.warn).toBe('function');
    expect(typeof log.error).toBe('function');
  });

  test('includes context in output', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const log = createLogger('MyComponent');
    log.error('something broke');
    expect(spy).toHaveBeenCalled();
    const firstArg = spy.mock.calls[0]?.[0] as string;
    expect(firstArg).toContain('[MyComponent]');
    expect(firstArg).toContain('something broke');
    spy.mockRestore();
  });
});
