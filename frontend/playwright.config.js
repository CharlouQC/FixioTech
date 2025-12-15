import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests E2E de FixioTech
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  /* Durée maximale par test (120s pour stabilité) */
  timeout: 120 * 1000,
  
  /* Configuration des expect */
  expect: {
    timeout: 5000
  },
  
  /* Exécution en parallèle */
  fullyParallel: true,
  
  /* Échec si .only est laissé dans le code */
  forbidOnly: !!process.env.CI,
  
  /* Nombre de tentatives en cas d'échec en CI */
  retries: process.env.CI ? 2 : 0,
  
  /* Nombre de workers parallèles */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter: liste pour dev, html pour CI */
  reporter: 'html',
  
  /* Configuration partagée pour tous les tests */
  use: {
    /* URL de base pour les tests */
    baseURL: 'http://localhost:5173',
    
    /* Collecter les traces en cas d'échec */
    trace: 'on-first-retry',
    
    /* Capturer des screenshots en cas d'échec */
    screenshot: 'only-on-failure',
  },

  /* Configuration des différents navigateurs */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        // Webkit est plus lent - augmenter les timeouts
        navigationTimeout: 30000,
        actionTimeout: 15000,
      },
      timeout: 120000, // 2 minutes par test pour webkit
    },

    /* Tests sur mobile */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* IMPORTANT: Démarrez manuellement les serveurs avant de lancer les tests:
   * 1. Backend: cd backend && npm run dev
   * 2. Frontend: npm run dev (depuis la racine)
   * 3. Tests: npm run test:e2e:headed
   */
  // webServer désactivé - démarrez les serveurs manuellement
});
