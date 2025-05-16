import { toStatusText } from 'utils/to-status-text';
import { describe, expect, it } from 'vitest';

describe('toStatusText', () => {
  it('should convert camelCase to spaced capitalized text', () => {
    expect(toStatusText('notFound')).toBe('Not Found');
  });

  it('should handle single word', () => {
    expect(toStatusText('finally')).toBe('Finally');
  });
});
