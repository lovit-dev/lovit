import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  format: ['esm', 'cjs'],
  target: ['es2022', 'node18'],
  dts: true,
  splitting: true
});
