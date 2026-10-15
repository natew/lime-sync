import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['packages/*/src/**/*.test.ts'],
    setupFiles: ['test/setup.ts'],
    exclude: ['**/demo/**', '**/node_modules/**'],
    testTimeout: 15_000,
    fileParallelism: false,
    disableConsoleIntercept: true,
  },
})
