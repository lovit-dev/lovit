import Message from '@package/utils/message';
import validateThrowErrorInput from '@package/validation/validate-throw-error-input';
import { describe, expect, it } from 'vitest';

describe('validateThrowErrorInput', () => {
  it('should throw if the input is invalid', () => {
    const validationError = Message.invalidType('throwError argument', ' string or a valid options object');

    expect(() => {
      validateThrowErrorInput(42 as any);
    }).toThrow(validationError);
  });
});
