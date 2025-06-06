import { expect, test } from '@playwright/test';

test('TS01: 1 + 2 = 3', async ({ page }) => {
  await page.goto('http://localhost:3000'); // asegurate que tu app esté corriendo
  await page.getByText('1').click();
  await page.getByText('+').click();
  await page.getByText('2').click();
  await page.getByText('=').click();
  await expect(page.locator('input')).toHaveValue('3');
});
