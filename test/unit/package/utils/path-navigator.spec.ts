import PathNavigator from '@package/utils/path-navigator';
import { describe, expect, it } from 'vitest';

describe('PathNavigator', () => {
  const source = {
    user: {
      name: 'John Doe',
      address: {
        city: 'New York',
        postalCode: '10001'
      },
      cities: ['New York', 'Los Angeles']
    }
  };

  describe('parse', () => {
    it('should split a path into a single segment array', () => {
      expect(PathNavigator.parse('user')).toEqual(['user']);
    });

    it('should split a nested path into an array of segments', () => {
      expect(PathNavigator.parse('user.address.city')).toEqual(['user', 'address', 'city']);
    });

    it('should handle paths with array indices', () => {
      expect(PathNavigator.parse('user.cities.0')).toEqual(['user', 'cities', '0']);
    });
  });

  describe('format', () => {
    it('should join a single segment into a single string', () => {
      expect(PathNavigator.format(['user'])).toBe('user');
    });

    it('should join multiple segments into a dot-separated path', () => {
      expect(PathNavigator.format(['user', 'address', 'city'])).toBe('user.address.city');
    });
  });

  describe('getPathInfo', () => {
    it('should return correct information for a property', () => {
      const path = 'user';
      const result = PathNavigator.getInfo(source, path);

      expect(result.exists).toBe(true);
      expect(result.value).toEqual(source.user);
    });

    it('should return correct information for a nested property', () => {
      const path = 'user.address.city';
      const result = PathNavigator.getInfo(source, path);

      expect(result.exists).toBe(true);
      expect(result.value).toBe(source.user.address.city);
    });

    it('should return false for a non-existent path', () => {
      const path = 'user.address.zipcode';
      const result = PathNavigator.getInfo(source, path);

      expect(result.exists).toBe(false);
      expect(result.value).toBeUndefined();
    });

    it('should return correct information for an array index path', () => {
      const path = 'user.cities.1';
      const result = PathNavigator.getInfo(source, path);

      expect(result.exists).toBe(true);
      expect(result.value).toBe(source.user.cities[1]);
    });

    it('should return false for a path when the source is not an array or object', () => {
      const path = 'user.address.city';
      const source: any = 'string value';
      const result = PathNavigator.getInfo(source, path);

      expect(result.exists).toBe(false);
      expect(result.value).toBeUndefined();
    });
  });

  describe('getValue', () => {
    it('should return value of property', () => {
      const path = 'user';
      const result = PathNavigator.get(source, path);

      expect(result).toBe(source.user);
    });

    it('should return value of a nested property', () => {
      expect(PathNavigator.get(source, 'user.address.city')).toBe(source.user.address.city);
    });

    it('should return value of an array item', () => {
      expect(PathNavigator.get(source, 'user.cities.0')).toBe(source.user.cities[0]);
    });

    it('should return undefined for a non-existent property', () => {
      expect(PathNavigator.get(source, 'user.age')).toBeUndefined();
    });

    it('should return undefined for a non-existent nested property', () => {
      expect(PathNavigator.get(source, 'user.address.street')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true for an existing property', () => {
      expect(PathNavigator.has(source, 'user')).toBe(true);
    });

    it('should return true for a nested existing property', () => {
      expect(PathNavigator.has(source, 'user.address.city')).toBe(true);
    });

    it('should return true for an existing array index', () => {
      expect(PathNavigator.has(source, 'user.cities.0')).toBe(true);
    });
  });

  describe('set', () => {
    it('should set property on the object', () => {
      const source = {};
      const path = 'status';
      const value = 'active';
      const expectedSource = { status: value };

      PathNavigator.set(source, path, value);

      expect(source).toEqual(expectedSource);
    });

    it('should set a nested property missing', () => {
      const source = {};
      const path = 'user.address.city';
      const value = 'Tokyo';
      const expectedSource = { user: { address: { city: value } } };

      PathNavigator.set(source, path, value);

      expect(source).toEqual(expectedSource);
    });

    it('should overwrite an existing value at a given path', () => {
      const source = { user: { name: 'John' } };
      const path = 'user.name';
      const value = 'Max';

      PathNavigator.set(source, path, value);

      expect(source.user.name).toBe(value);
    });

    it('should set a value at an array index', () => {
      const source = ['first'];
      const path = '1';
      const value = 'second';

      PathNavigator.set(source, path, value);

      expect(source[1]).toBe(value);
    });
  });
});
