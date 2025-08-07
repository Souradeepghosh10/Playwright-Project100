import { test, expect } from '@playwright/test';

test('End-to-end: Verify Facebook login page loads', async ({ page }) => {
  // Step 1: Navigate to Facebook
  await page.goto('https://www.facebook.com/');

  // Step 2: Verify Facebook login page is displayed
  await expect(page).toHaveTitle(/Facebook/);
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="pass"]')).toBeVisible();
  await expect(page.getByRole('button', { name: /Log In/i })).toBeVisible();
});
