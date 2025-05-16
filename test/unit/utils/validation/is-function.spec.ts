import { describe, expect, it } from 'vitest';
import { isFunction } from '../../../../utils/validation/is-function';
import { isObject } from '../../../../utils/validation/is-object';

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(isObject)).toBe(true);
  });

  it('should return false for class constructors', () => {
    class MyClass {
      private name: string;
      constructor() {
        this.name = 'Lovit';
      }
    }

    expect(isFunction(MyClass)).toBe(false);
  });

  it('should return false for non-function values', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined as any)).toBe(false);
    expect(isFunction(42)).toBe(false);
    expect(isFunction('Lovit')).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});
