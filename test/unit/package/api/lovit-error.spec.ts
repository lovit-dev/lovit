import LovitError from '@package/api/lovit-error';
import { describe, expect, it } from 'vitest';

describe('LovitError', () => {
  it('should set the correct message in the LovitError', () => {
    const errorMessage = new LovitError('Test Error').message;

    expect(errorMessage).toBe('Test Error');
  });

  it('should set the correct name in the LovitError', () => {
    const errorName = new LovitError('Test Error', { messageType: 'Warning' }).name;

    expect(errorName).toBe('Lovit Warning');
  });

  it('should assign the custom property to the LovitError', () => {
    const error = new LovitError('Test Error', { code: 200 });

    expect(error.code).toBe(200);
  });
});
