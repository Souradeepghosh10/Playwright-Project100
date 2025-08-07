import { test, expect } from '@playwright/test';

const CONTACT_URL = 'https://practicetestautomation.com/contact/';

// Helper to ensure logged out before each test
async function ensureLoggedOut(page) {
  await page.goto('https://practicetestautomation.com/');
  // If there's a logout button, click it. Otherwise, do nothing.
  const logoutBtn = await page.$('text=Logout');
  if (logoutBtn) {
    await logoutBtn.click();
    await page.waitForSelector('text=Login', { timeout: 5000 });
  }
}

test.describe('Practice Test Automation - Contacts Tab', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedOut(page);
    await page.goto(CONTACT_URL);
  });

  test('Validate visible UI elements in Contacts tab', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText(/Contact/);
    await expect(page.getByRole('textbox', { name: /First/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Last/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Email/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Comment|Message/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Submit/i })).toBeVisible();
  });

  test('Submit contact form with valid data and verify thanks message', async ({ page }) => {
    await page.getByRole('textbox', { name: /First/i }).fill('Test');
    await page.getByRole('textbox', { name: /Last/i }).fill('User');
    await page.getByRole('textbox', { name: /Email/i }).fill('testuser@example.com');
    await page.getByRole('textbox', { name: /Comment|Message/i }).fill('This is a test message.');
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  test('Validate required fields: name, email, message', async ({ page }) => {
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByRole('textbox', { name: /First/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Last/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Email/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Comment|Message/i })).toHaveClass(/wpforms-error/);
  });

  test('Validate email format in contact form', async ({ page }) => {
    await page.getByRole('textbox', { name: /First/i }).fill('Test');
    await page.getByRole('textbox', { name: /Last/i }).fill('User');
    await page.getByRole('textbox', { name: /Email/i }).fill('invalid-email');
    await page.getByRole('textbox', { name: /Comment|Message/i }).fill('Test message');
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByRole('textbox', { name: /Email/i })).toHaveAttribute('aria-invalid', 'true');
  });

  test('Validate contact form submission with empty fields', async ({ page }) => {
    await page.getByRole('textbox', { name: /First/i }).fill('');
    await page.getByRole('textbox', { name: /Last/i }).fill('');
    await page.getByRole('textbox', { name: /Email/i }).fill('');
    await page.getByRole('textbox', { name: /Comment|Message/i }).fill('');
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByRole('textbox', { name: /First/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Last/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Email/i })).toHaveClass(/wpforms-error/);
    await expect(page.getByRole('textbox', { name: /Comment|Message/i })).toHaveClass(/wpforms-error/);
  });

  test('Validate navigation to Contacts tab', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/');
    await page.click('text=Contact1');
    await expect(page).toHaveURL(CONTACT_URL);
    await expect(page.locator('h1')).toHaveText(/Contact/);
  });
});
