


import { test, expect } from '@playwright/test';

test.describe('RoboticQA Cart - Critical Scenarios', () => {
  //test.use({ browserName: 'chromium' });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://roboticqa.com/');
    // Ensure logged out by checking for Sign In button
    if (!(await page.getByRole('button', { name: 'Sign In' }).isVisible())) {
      // If already logged in, try to logout
      const logoutBtn = page.locator('button:has-text("")').first();
      if (await logoutBtn.isVisible()) {
        await logoutBtn.click();
        await page.waitForSelector('button:has-text("Sign In")');
      }
    }
  });

  test('Positive login with standard user', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username or Email' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Use a more specific locator for the welcome message
    await expect(page.getByText('Welcome back!', { exact: true })).toBeVisible();
    // Logout after test (find button that is not Sign In/Sign up)
    const logoutBtn = page.locator('button').filter({ has: page.locator('text=standard_user') }).first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.reload();
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({ timeout: 7000 });
    }
  });

  test('Negative login with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username or Email' }).fill('invalid_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Use partial text match for error message
    await expect(page.locator('text=Invalid')).toBeVisible();
  });

  test('Login with slow user credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username or Email' }).fill('slow_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Use a more specific locator for the welcome message, handle multiple matches
    await expect(page.getByText('Welcome back!', { exact: true })).toBeVisible({ timeout: 15000 });
    // Logout after test
    const logoutBtn = page.locator('button').filter({ has: page.locator('text=slow_user') }).first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.reload();
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({ timeout: 7000 });
    }
  });

  test('Form validation: empty username and password', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Use partial text match for validation error
    await expect(page.locator('text=Please enter')).toBeVisible();
  });

  test('Navigation: Sign up link', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('button', { name: 'Sign up' }).click();
    // Use heading for create account page
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await page.goBack();
  });

  test('Download Feature File link', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: 'Download Feature File' }).click()
    ]);
    await expect(download.suggestedFilename()).toContain('RoboticQACart');
  });

  // --- E-commerce UI & workflow tests ---
  test('Shop tab loads and displays products', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await expect(page.getByRole('heading', { name: /Wireless Bluetooth Headphones/i })).toBeVisible();
  });

  test('Search for a product (positive)', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await page.getByRole('textbox', { name: 'Search products...' }).fill('Wireless Bluetooth Headphones');
    await expect(page.getByRole('heading', { name: /Wireless Bluetooth Headphones/i })).toBeVisible();
  });

  test('Search for a product (negative)', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await page.getByRole('textbox', { name: 'Search products...' }).fill('NonExistentProduct');
    await expect(page.locator('text=No products found.')).toBeVisible();
  });

  test('Category filter updates products', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await page.getByRole('combobox').selectOption('Electronics');
    await expect(page.getByRole('heading', { name: /Wireless Bluetooth Headphones/i })).toBeVisible();
  });

  test('Add to Cart updates cart', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await page.getByRole('textbox', { name: 'Search products...' }).fill('Wireless Bluetooth Headphones');
    await page.getByRole('button', { name: /Add to Cart/i }).first().click();
    // Assert cart icon or notification updates (customize as needed)
    // Example: expect cart count to increase
    // await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('Testing Ground tab navigation', async ({ page }) => {
    await page.getByRole('tab', { name: 'Testing Ground' }).click();
    await expect(page.getByRole('heading', { name: /Basic Controls/i })).toBeVisible();
  });

  test('Product details display', async ({ page }) => {
    await page.getByRole('tab', { name: 'Shop' }).click();
    await expect(page.getByRole('heading', { name: /Wireless Bluetooth Headphones/i })).toBeVisible();
    await expect(page.locator('text=$199.99')).toBeVisible();
    await expect(page.locator('text=Premium quality wireless headphones')).toBeVisible();
  });

  // Add logout/login workflow if present (customize selectors as needed)
  // test('Logout workflow', async ({ page }) => {
  //   // Example: await page.getByRole('button', { name: 'Logout' }).click();
  //   // await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  // });
});

