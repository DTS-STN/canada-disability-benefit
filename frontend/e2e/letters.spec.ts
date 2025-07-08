import { expect, test } from '@playwright/test';

test('Navigating to /en/letters renders the expected english landing page', async ({ page }) => {
  await page.goto('/en/letters');

  expect(await page.locator('main').innerHTML()).toMatchSnapshot();
});

test('Navigating to /fr/lettres renders the expected french landing page', async ({ page }) => {
  await page.goto('/fr/lettres');

  expect(await page.locator('main').innerHTML()).toMatchSnapshot();
});
