import { test, expect } from '@playwright/test';

const credentials = [
  { username: 'standard_user', password: 'secret_sauce', description: 'valid credentials' },
  { username: 'locked_out_user', password: 'secret_sauce', description: 'locked out user' },
  { username: 'problem_user', password: 'secret_sauce', description: 'problem user' },
  { username: 'performance_glitch_user', password: 'secret_sauce', description: 'performance glitch user' },
  { username: 'standard_user', password: 'wrong_password', description: 'invalid password' },
  { username: 'invalid_user', password: 'secret_sauce', description: 'invalid username' },
];

test('Login and add Sauce Labs Backpack to cart', async ({ page }) => {
  // Step 1: Navigate to the SauceDemo homepage
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Login with valid credentials (standard_user / secret_sauce)
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 3: Click on the "Sauce Labs Backpack" product
  await page.getByText('Sauce Labs Backpack').click();

  // Step 4: Add to cart
  await page.getByRole('button', { name: 'Add to cart' }).click();

  // Step 5: Verify the product is added to the cart (cart badge should show 1)
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});


test.describe('Login with all username/password combinations', () => {
  for (const { username, password, description } of credentials) {
    test(`Login attempt: ${description} (${username} / ${password})`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username').fill(username);
      await page.getByPlaceholder('Password').fill(password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (username === 'standard_user' && password === 'secret_sauce') {
        // Successful login should land on inventory page
        await expect(page).toHaveURL(/inventory/);
      } else if (username === 'locked_out_user' && password === 'secret_sauce') {
        await expect(page.locator('[data-test="error"]')).toContainText('locked out');
      } else {
        // All other invalid logins should show error
        await expect(page.locator('[data-test="error"]')).toBeVisible();
      }
    });
  }
});
