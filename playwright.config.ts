import { defineConfig } from '@playwright/test';
import path from 'path';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const junitPath = path.join('test-results', `junit-report-${timestamp}.xml`);

export default defineConfig({
  testDir: '.', // si tus tests están en la raíz, cambiar a '.' 
  timeout: 30000,
  retries: 0,

  reporter: [
    ['junit', { outputFile: junitPath }],
   // ['html', { outputFolder: 'playwright-report', open: 'never' }]
   ['./simple-reporter.ts'] // <- usar el reporter limpio
  ],

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Solo captura screenshot en fallo
    screenshot: 'only-on-failure',

    // Solo graba video en fallo
    video: 'retain-on-failure',

    // Trace solo en fallo (ya está bien)
    trace: 'retain-on-failure'
  },
});
