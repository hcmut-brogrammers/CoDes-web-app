import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['./src/**/*.test.*'],
    coverage: {
      provider: 'v8',
      exclude: [
        '*.config.*',
        './build',
        './src/App.tsx',
        './src/index.tsx',
        './src/assets',
        './src/tests',
        './src/types',
        './src/**/*.test.*',
        './src/**/*.style.ts',
      ],
      reporter: ['text', 'lcov'],
    },
  },
  // @ts-expect-error vite-tsconfig-paths does not have types
  plugins: [tsconfigPaths()],
});

export default vitestConfig;
