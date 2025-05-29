import { expect, test } from '@playwright/test';

test('Navigating to /en/ renders the expected english landing page', async ({ page }) => {
  await page.goto('/en/');

  expect(await page.locator('main').innerHTML()).toMatchSnapshot();
});

test('Navigating to /fr/ renders the expected french landing page', async ({ page }) => {
  await page.goto('/fr/');

  expect(await page.locator('main').innerHTML()).toMatchSnapshot();
});
