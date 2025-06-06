import { expect, test } from '@playwright/test';

// test que falla para pruebas, como ver el CI/CD y que no depoye errores a vercel productivo
// test('TS99: Test fallido adrede', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   await expect(page.locator('input')).toHaveValue('9999'); // Esto fallará
// });

test('TS01: Al presionar cada número, aparece ese número en pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');
  for (const num of ['1','2','3','4','5','6','7','8','9','0']) {
    await page.getByText('C').click();  // Limpiar input antes de cada prueba
    await page.getByText(num).click();
    await expect(page.locator('input')).toHaveValue(num);
  }
});

test('TS02: 1 + 2 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('1').click();
  await page.getByText('+').click();
  await page.getByText('2').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('3');
});

// Operación resta
test('TS03: 5 - 3 = 2', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('5').click();
  await page.getByText('-').click();
  await page.getByText('3').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('2');
});

// Operación multiplicación
test('TS04: 4 × 5 = 20', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('4').click();
  await page.getByText('×').click();
  await page.getByText('5').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('20');
});

// Operación división
test('TS05: 9 ÷ 3 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('9').click();
  await page.getByText('÷').click();
  await page.getByText('3').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('3');
});

// Botón C limpia la pantalla
test('TS06: Botón C limpia la pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('9').click();
  await page.getByText('C').click();
  await expect(page.locator('input')).toHaveValue('');
});

// Backspace elimina último dígito
test('TS07: Backspace elimina último dígito', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('1').click();
  await page.getByText('2').click();
  await page.getByText('⌫').click(); // Suponiendo que usas este símbolo para backspace
  await expect(page.locator('input')).toHaveValue('1');
});

// División por cero muestra error
test('TS08: División por cero muestra error', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByText('5').click();
  await page.getByText('÷').click();
  await page.getByText('0').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('Error'); // Ajusta el texto si usás otro mensaje
});

// Entrada usando teclado físico (tecla 7 y +)
test('TS09: Entrada usando teclado físico: 7 + 2 = 9', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.keyboard.press('7');
  await page.keyboard.press('+');
  await page.keyboard.press('2');
  await page.keyboard.press('Enter');
  await expect(page.locator('input')).toHaveValue('9');
});
