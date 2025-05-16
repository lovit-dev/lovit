import { describe, expect, it } from 'vitest';
import { capitalizeFirstLetter } from '../../../utils/capitalize-first-letter';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of word', () => {
    expect(capitalizeFirstLetter('lovit')).toBe('Lovit');
  });

  it('should not change the rest of the string', () => {
    expect(capitalizeFirstLetter('lOVIT')).toBe('LOVIT');
  });

  it('should work with single character strings', () => {
    expect(capitalizeFirstLetter('l')).toBe('L');
  });
});
