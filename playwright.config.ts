import { defineConfig } from '@playwright/test';
import path from 'path';

// Crear timestamp en formato yyyy-MM-ddTHH-mm-ss para el nombre del archivo
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const junitPath = path.join('test-results', `junit-report-${timestamp}.xml`);

export default defineConfig({
  testDir: './tests', // Asegurate que tus tests están en esta carpeta
  timeout: 30000,
  retries: 0,
  reporter: [['junit', { outputFile: junitPath }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
