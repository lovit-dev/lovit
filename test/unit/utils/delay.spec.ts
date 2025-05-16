import { delay } from 'utils/delay';
import { describe, expect, it } from 'vitest';

describe('delay', () => {
  it('should delay execution for at least the specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  it('should resolve without errors', async () => {
    await expect(delay(50)).resolves.toBeUndefined();
  });
});
