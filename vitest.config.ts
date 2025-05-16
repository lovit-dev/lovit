import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    name: 'Lovit Test',
    include: ['test/**/*.spec.ts'],
    reporters: 'verbose',

    coverage: {
      include: ['package'],
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './test/unit/coverage'
    }
  },

  plugins: [tsconfigPaths()]
});
