//console.log('🚀 Hook personalizado cargado'); // NO BORRAR SI ESTA COMENTADO


import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base;
export { expect };

// 📁 Carpetas base para evidencias fuera de test-results
const approvedVideosDir = path.resolve('evidencias/aprobadas/videos');
const approvedScreenshotsDir = path.resolve('evidencias/aprobadas/screenshots');
const rejectedVideosDir = path.resolve('evidencias/rechazadas/videos');
const rejectedScreenshotsDir = path.resolve('evidencias/rechazadas/screenshots');
const testResultsDir = path.resolve('test-results');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function moveFile(src: string, destDir: string, prefix: string) {
  if (!src || !fs.existsSync(src)) {
    console.warn(`Archivo no existe para mover: ${src}`);
    return;
  }
  ensureDir(destDir);

  const ext = path.extname(src);
  const baseName = path.basename(src, ext);
  const safePrefix = prefix.replace(/[^\w\d]+/g, '_');
  const destFileName = `${safePrefix}-${baseName}${ext}`;
  const dest = path.join(destDir, destFileName);

  try {
    fs.renameSync(src, dest);
    console.log(`🟢 Movido: ${src} → ${dest}`);
  } catch (e) {
    console.error(`❌ Error moviendo archivo ${src} a ${dest}:`, e);
  }
}

function findTestResultFolder(testTitle: string): string | null {
  const safeTitle = testTitle.replace(/[^\w\d]+/g, '_').slice(0, 50);
  if (!fs.existsSync(testResultsDir)) return null;

  const dirs = fs.readdirSync(testResultsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const dir of dirs) {
    if (dir.includes(safeTitle)) {
      return path.join(testResultsDir, dir);
    }
  }
  return null;
}

// ✅ Hook afterEach definido correctamente fuera del extend
test.afterEach(async ({ page }, testInfo) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeTitle = testInfo.title.replace(/[^\w\d]+/g, '_').slice(0, 50);
  const prefix = `${safeTitle}-${timestamp}`;

  // Buscar attachments
  const videoAttachment = testInfo.attachments.find(a => a.name === 'video');
  const videoPath = videoAttachment?.path;
  const screenshots = testInfo.attachments.filter(a => a.contentType === 'image/png');

  console.log(`\nTest: ${testInfo.title} - status: ${testInfo.status}`);
  console.log(`Video Attachment Path: ${videoPath || 'no hay'}`);
  console.log(`Screenshots Attachment Paths: ${screenshots.map(s => s.path).join(', ') || 'no hay'}`);

  const targetVideoDir = testInfo.status === 'passed' ? approvedVideosDir : rejectedVideosDir;
  const targetScreenshotDir = testInfo.status === 'passed' ? approvedScreenshotsDir : rejectedScreenshotsDir;

  if (videoPath) moveFile(videoPath, targetVideoDir, prefix);
  for (const shot of screenshots) {
    if (shot.path) moveFile(shot.path, targetScreenshotDir, prefix);
  }

  // Buscar archivos no adjuntos en carpeta test-results
  const testFolder = findTestResultFolder(testInfo.title);
  if (!testFolder) {
    console.warn(`No se encontró carpeta de resultados para el test: ${testInfo.title}`);
    return;
  }

  const files = fs.readdirSync(testFolder);
  console.log(`Archivos encontrados en carpeta ${testFolder}:`, files);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const fullPath = path.join(testFolder, file);
    if (['.webm'].includes(ext)) {
      moveFile(fullPath, targetVideoDir, prefix);
    } else if (['.png'].includes(ext)) {
      moveFile(fullPath, targetScreenshotDir, prefix);
    }
  }
});
