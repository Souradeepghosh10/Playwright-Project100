import { test, expect } from '@playwright/test';

test.describe('Practice Test Automation - Login Page', () => {
  const baseUrl = 'https://practicetestautomation.com/practice-test-login/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('Positive login', async ({ page }) => {
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*logged-in-successfully.*/);
    await expect(page.locator('h1')).toContainText('Congratulations');
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });

  test('Negative login - invalid username', async ({ page }) => {
    await page.fill('#username', 'incorrectUser');
    await page.fill('#password', 'Password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your username is invalid!');
  });

  test('Negative login - invalid password', async ({ page }) => {
    await page.fill('#username', 'student');
    await page.fill('#password', 'incorrectPassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  });

  test('Logout after successful login', async ({ page }) => {
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Log out")');
    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});

test.describe('Practice Test Automation - Exceptions Page', () => {
  const exceptionsUrl = 'https://practicetestautomation.com/practice-test-exceptions/';

  test.beforeEach(async ({ page }) => {
    await page.goto(exceptionsUrl);
  });

  test('Add row and verify new input field appears', async ({ page }) => {
    await page.click('button#add');
    await expect(page.locator('input[placeholder="Row 2"]')).toBeVisible();
  });

  test('Add row, type in new input, save, and verify text saved', async ({ page }) => {
    await page.click('button#add');
    await page.fill('input[placeholder="Row 2"]', 'Sushi');
    await page.click('button[name="Save"]');
    await expect(page.locator('input[placeholder="Row 2"]')).toHaveValue('Sushi');
  });

  test('Enable editing, clear and type in input field, verify text changed', async ({ page }) => {
    await page.click('button#edit');
    const input = page.locator('input[placeholder="Row 1"]');
    await input.fill('Burger');
    await expect(input).toHaveValue('Burger');
  });

  test('Add row and verify instructions text disappears', async ({ page }) => {
    const instructions = page.locator('#instructions');
    await expect(instructions).toBeVisible();
    await page.click('button#add');
    await expect(instructions).not.toBeVisible();
  });

  test('Add row, wait for input field with short timeout, verify timeout error', async ({ page }) => {
    await page.click('button#add');
    // Wait for 3 seconds, expect input not visible yet
    await expect(page.locator('input[placeholder="Row 2"]')).not.toBeVisible({ timeout: 3000 });
  });
});
