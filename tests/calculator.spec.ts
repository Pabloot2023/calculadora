import { expect, test } from '@playwright/test';

// test que falla para pruebas, como ver el CI/CD y que no depoye errores a vercel productivo
// test('TS99: Test fallido adrede', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   await expect(page.locator('input')).toHaveValue('9999'); // Esto fallará
// });

test('TS01: Al presionar cada número, aparece ese número en pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');

  for (const num of ['1','2','3','4','5','6','7','8','9','0']) {
    await page.getByRole('button', { name: 'C' }).click(); // Limpiar input antes de cada prueba
    await page.getByRole('button', { name: num }).click();
    await expect(page.locator('input')).toHaveValue(num);
  }
});

test('TS02: 1 + 2 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('input')).toHaveValue('3');
});

test('TS03: 5 - 3 = 2', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '-' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('input')).toHaveValue('2');
});

test('TS04: 4 × 5 = 20', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '×' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('input')).toHaveValue('20');
});

test('TS05: 9 ÷ 3 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: '÷' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('input')).toHaveValue('3');
});

test('TS06: Botón C limpia la pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: 'C' }).click();
  await expect(page.locator('input')).toHaveValue('');
});

test('TS07: Backspace elimina último dígito', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '⌫' }).click();  // Ajusta el símbolo si usas otro
  await expect(page.locator('input')).toHaveValue('1');
});

test('TS08: División por cero muestra error', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '÷' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('input')).toHaveValue('Error'); // Cambia si usas otro texto
});

test('TS09: Entrada usando teclado físico: 7 + 2 = 9', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.keyboard.press('7');
  await page.keyboard.press('+');
  await page.keyboard.press('2');
  await page.keyboard.press('Enter');
  // A veces el input tarda un poco en actualizar, le damos un pequeño tiempo
  await page.waitForTimeout(500);
  await expect(page.locator('input')).toHaveValue('9');
});
