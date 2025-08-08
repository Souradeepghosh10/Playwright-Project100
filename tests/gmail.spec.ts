import { test, expect } from '@playwright/test';

test('Validate Gmail page loads', async ({ page }) => {
  // Step 1: Navigate to Gmail
  await page.goto('https://mail.google.com/');

  // Step 2: Verify Gmail login page is displayed
  await expect(page).toHaveTitle(/Gmail/);
  await expect(page.locator('input[type="email"]')).toBeVisible();
});
