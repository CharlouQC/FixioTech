// Configuration Vitest pour les tests frontend
// Les tests backend utilisent backend/vitest.config.js
import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config.js';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./frontend/src/setupTests.js'],
    include: ['frontend/src/tests/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      include: [
        'frontend/src/**/*.{js,jsx}',
        'frontend/services/**/*.{js,jsx}'
      ],
      exclude: [
        'frontend/src/tests/**',
        'frontend/src/setupTests.js',
        'frontend/src/main.jsx',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        '**/node_modules/**'
      ],
      all: true,
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75
    }
  }
}));