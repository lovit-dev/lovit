import Message from '@package/utils/message';
import Type from '@package/utils/type';
import Validator from '@package/utils/validator';
import { describe, expect, it } from 'vitest';

describe('Validator', () => {
  const source = {
    user: {
      address: {
        city: 'New York'
      },
      cities: ['London', 'Paris']
    }
  };

  const validatorName = 'Test';
  const validator: Validator = new Validator(validatorName, source);

  it('should throw if source is not valid', () => {
    const errorMessage = Message.invalidType(`${validatorName} config`, 'valid object or array');

    expect(() => new Validator(validatorName, null as any)).toThrow(errorMessage);
  });

  describe('require', () => {
    it('should return true when the path exists and matches the expected type', () => {
      expect(validator.require('user.address.city', 'string')).toBe(true);
    });

    it('should throw if path exists but wrong type', () => {
      const path = 'user.address.city';
      const expectedType = 'number';
      const errorMessage = Message.invalidType(`"${path}" in the ${validatorName}`, Type.format(expectedType));

      expect(() => validator.require(path, expectedType)).toThrow(errorMessage);
    });

    it('should throw if the path is missing', () => {
      const path = 'user.address.zipCode';
      const errorMessage = Message.missing(`path: "${path}" in the ${validatorName}`);

      expect(() => validator.require(path, 'number')).toThrow(errorMessage);
    });
  });

  describe('requireOneOf', () => {
    it('should return true if one path exists', () => {
      expect(validator.requireOneOf(['user.address.city', 'user.cities'])).toBe(true);
    });

    it('should throw if none of the paths exists', () => {
      const paths = ['user.address.zipCode', 'user.countries'];
      const errorMessage = Message.missing(
        `path: "${paths[0]}", "${paths[1]}" in the ${validatorName}. Provide one of these`
      );

      expect(() => validator.requireOneOf(paths)).toThrow(errorMessage);
    });
  });

  describe('maybeTypeOf', () => {
    it('should return true when the path exists and matches the expected type', () => {
      expect(validator.maybeTypeOf('user.address.city', 'string')).toBe(true);
    });

    it('should throw if path exists but wrong type', () => {
      const path = 'user.address.city';
      const expectedType = 'number';
      const errorMessage = Message.invalidType(`"${path}" in the ${validatorName}`, Type.format(expectedType));

      expect(() => validator.maybeTypeOf(path, expectedType)).toThrow(errorMessage);
    });

    it('should return undefined if the path does not exist', () => {
      expect(validator.maybeTypeOf('user.address.zipCode', 'number')).toBeUndefined();
    });
  });
});
