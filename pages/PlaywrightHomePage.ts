import { Page, expect } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  async clickGetStarted() {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  async expectInstallationHeading() {
    await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }
}