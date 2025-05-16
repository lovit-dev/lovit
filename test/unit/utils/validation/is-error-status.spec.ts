import { describe, expect, it } from 'vitest';
import { isErrorStatus } from '../../../../utils/validation/is-error-status';

describe('isErrorStatus', () => {
  it('should return true for known error status codes', () => {
    expect(isErrorStatus(404)).toBe(true);
    expect(isErrorStatus(403)).toBe(true);
    expect(isErrorStatus(401)).toBe(true);
    expect(isErrorStatus(500)).toBe(true);
    expect(isErrorStatus('404')).toBe(true);
  });

  it('should return false for unknown or non-error status codes', () => {
    expect(isErrorStatus(200)).toBe(false);
    expect(isErrorStatus(42)).toBe(false);
    expect(isErrorStatus('42')).toBe(false);
    expect(isErrorStatus('Lovit')).toBe(false);
    expect(isErrorStatus(null)).toBe(false);
    expect(isErrorStatus(undefined as any)).toBe(false);
  });
});
