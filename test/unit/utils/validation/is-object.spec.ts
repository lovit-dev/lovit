import { describe, expect, it } from 'vitest';
import { isObject } from '../../../../utils/validation/is-object';

describe('isObject', () => {
  it('should return true for plain objects', () => {
    expect(isObject({ key: 'post.getPosts' })).toBe(true);
  });

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false for arrays', () => {
    expect(isObject(['Lovit'])).toBe(false);
  });

  it('should return false for Date instances', () => {
    expect(isObject(new Date())).toBe(false);
  });

  it('should return false for RegExp instances', () => {
    expect(isObject(/test/)).toBe(false);
  });
});
