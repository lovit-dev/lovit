import Message from '@package/utils/message';
import { describe, expect, it } from 'vitest';

describe('Message', () => {
  it.each([
    ['missing', ['email'], 'Missing required email.'],
    ['invalidType', ['age', 'number'], 'Invalid type for age. Expected number.'],
    ['invalidUsage', ['Use "validate" before saving'], 'Invalid usage: Use "validate" before saving.'],
    ['incorrect', ['password'], 'Incorrect password.']
  ])('should return correct message for %s', (type, args, expected) => {
    const message = (Message as Record<string, any>)[type](...args);

    expect(message).toBe(expected);
  });
});
