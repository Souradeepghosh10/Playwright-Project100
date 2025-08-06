import { test, expect } from '@playwright/test';

test('Navigate to Playwright.dev and click Get Started', async ({ page }) => {
  // Step 1: Navigate to the Playwright homepage
  await page.goto('https://playwright.dev/');

  // Step 2: Click on the Get Started button
  await page.getByRole('link', { name: 'Get started' }).click();

  // Step 3: Verify the URL contains '/docs/intro' (current Get Started destination)
  await expect(page).toHaveURL(/.*\/docs\/intro/);
});
