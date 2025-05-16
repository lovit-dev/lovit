import LovitError from '@package/api/lovit-error';
import throwError from '@package/api/throw-error';
import type { ThrowErrorOptions } from '@package/definitions/api/throw-error';
import Message from '@package/utils/message';
import { describe, expect, it } from 'vitest';

describe('throwError', () => {
  const testMessage = 'Test Error';

  it('should throw if input is invalid', () => {
    const errorMessage = Message.invalidType('throwError argument', ' string or a valid options object');

    expect(() => throwError(null as any)).toThrow(errorMessage);
  });

  it('should throw an instance of LovitError', () => {
    expect(() => throwError(testMessage)).toThrowError(LovitError);
  });

  it('should throw LovitError with the provided message', () => {
    try {
      throwError(testMessage);
    } catch (error: any) {
      expect(error.message).toBe(testMessage);
    }
  });

  it('should throw LovitError with the expected name"', () => {
    try {
      throwError(testMessage, 'Warning');
    } catch (error: any) {
      expect(error.name).toBe('Lovit Warning');
    }
  });

  it('should throw LovitError with the additional custom property', () => {
    try {
      const input: ThrowErrorOptions = { message: testMessage, code: 200 };
      throwError(input);
    } catch (error: any) {
      expect(error.code).toBe(200);
    }
  });
});
