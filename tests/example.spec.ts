import { test } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';
import { GooglePage } from '../pages/GooglePage';

test('has title', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);
  await homePage.goto();
  await homePage.expectTitle();
});

test('get started link', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);
  await homePage.goto();
  await homePage.clickGetStarted();
  await homePage.expectInstallationHeading();
});

test('open google homepage', async ({ page }) => {
  const googlePage = new GooglePage(page);
  await googlePage.goto();
  await googlePage.expectTitle();
});
