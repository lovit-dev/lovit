import Type, { type Category, type LovitType } from '@package/utils/type';
import { describe, expect, it, vi } from 'vitest';

describe('Type', () => {
  describe('of', () => {
    it.each([
      [true, 'js', 'Lovit', 'string'],
      [false, 'js', 'Lovit', 'number'],
      [true, 'union', {}, 'string|object'],
      [false, 'union', 42, 'array|object'],
      [true, 'tuple', ['Lovit', vi.fn()], '[string, function]'],
      [false, 'tuple', ['Lovit', 42], '[string, function]'],
      [true, 'array', ['Lovit', 42], 'array'],
      [false, 'array', { lovit: 42 }, 'array']
    ])('should return %s for %s category with given value and type', (expected, _, value, type) => {
      expect(Type.of(value, type as LovitType)).toBe(expected);
    });
  });

  describe('parse', () => {
    it('should parse js types into an array with a single js type', () => {
      expect(Type.parse('string')).toEqual(['string']);
      expect(Type.parse('number')).toEqual(['number']);
    });

    it('should parse union into an array with multiple js types', () => {
      expect(Type.parse('string|number')).toEqual(['string', 'number']);
      expect(Type.parse('array|object')).toEqual(['array', 'object']);
    });

    it('should parse tuple into an array with multiple js types', () => {
      expect(Type.parse('[string, function]')).toEqual(['string', 'function']);
    });

    it('should parse array into an array with a single array type', () => {
      expect(Type.parse('array')).toEqual(['array']);
    });
  });

  describe('format', () => {
    it('should format js types as-is', () => {
      expect(Type.format('string')).toBe('string');
      expect(Type.format('number')).toBe('number');
    });

    it('should format union types with "or"', () => {
      expect(Type.format('string|number')).toBe('string or number');
      expect(Type.format('array|object')).toBe('array or object');
    });

    it('should format tuple types as a readable array description', () => {
      expect(Type.format('[string, function]')).toBe('an array of [string, function]');
    });

    it('should format array as-is', () => {
      expect(Type.format('array')).toBe('array');
    });
  });

  it.each([
    [true, 'js', 'string'],
    [false, 'array', 'string'],
    [false, 'tuple', 'number'],
    [true, 'array', 'array'],
    [false, 'tuple', 'array'],
    [true, 'tuple', '[string, function]'],
    [false, 'union', '[string, function]'],
    [true, 'union', 'string|number'],
    [false, 'js', 'string|number']
  ])('should return %s for types that matches %s category', (expected, category, type) => {
    expect(Type.isCategory(type as LovitType, category as Category)).toBe(expected);
  });
});
