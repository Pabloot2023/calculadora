import { expect, test } from '@playwright/test';

test('TS01: Al presionar cada número, aparece ese número en pantalla', async ({ page }) => {
  await page.goto('http://localhost:3000');

  for (const num of ['1','2','3','4','5','6','7','8','9','0']) {
    await page.getByRole('button', { name: 'C', exact: true }).click();  // Limpiar input antes de cada prueba
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
