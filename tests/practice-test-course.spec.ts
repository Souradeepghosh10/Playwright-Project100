import { test, expect } from '@playwright/test';

// Helper to ensure logout before each test
async function ensureLoggedOut(page) {
  await page.goto('https://practicetestautomation.com/');
  // If a logout button is present, click it
  const logoutSelector = 'a[href*="logout"], button:has-text("Logout")';
  if (await page.locator(logoutSelector).isVisible().catch(() => false)) {
    await page.click(logoutSelector);
    await page.waitForLoadState('networkidle');
  }
}

test.describe('Practice Test Automation Courses Page', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedOut(page);
  });

  test('All course titles are visible', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/courses/');
    const courseTitles = [
      'Selenium WebDriver: Selenium Automation Testing with Java',
      'Selenium WebDriver: Selenium Automation Testing with Python',
      'Java for Testers',
      'Python: The Complete Guide for Software Testers',
      'Advanced Selenium WebDriver with Java and TestNG',
      'XPath locators for Selenium',
      'REST Assured. API test automation for beginners',
      'Advanced Selenium Grid and Cloud',
      'Advanced Selenium testing framework with Java',
    ];
    for (const title of courseTitles) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  test('Each course has a description', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/courses/');
    // Check that each course heading is followed by a description
    const headings = await page.locator('h2 a').all();
    for (const heading of headings) {
      const parent = await heading.locator('xpath=..').elementHandle();
      const description = await parent?.evaluate(node => node.nextElementSibling?.textContent?.trim());
      expect(description && description.length > 0).toBeTruthy();
    }
  });

  test('Each course has a working Udemy enroll link', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/courses/');
    const enrollLinks = await page.locator('a:has-text("Enroll in this course on Udemy")').all();
    expect(enrollLinks.length).toBeGreaterThanOrEqual(8);
    for (const link of enrollLinks) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});
