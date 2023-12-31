import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  splitting: false,
  sourcemap: false,
  minify: true,
  clean: true,
  platform: 'node',
  target: 'node16',
});
