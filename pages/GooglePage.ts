import { Page, expect } from '@playwright/test';

export class GooglePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.google.com');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Google/);
  }
}