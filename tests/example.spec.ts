import { test, expect } from '@playwright/test';
import * as fs from "fs";
import * as path from 'path';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  const folderPath = path.join(process.cwd(), "test-results", "screenshots");
  try{
    await fs.mkdirSync(folderPath, {recursive: true})
    console.log("Folder created:", folderPath);
  }catch{
    console.log("Folder already exists:", folderPath);
  }
  const timestamp = Date.now();
  await page.screenshot({path: path.join(folderPath, `New Path - ${timestamp} +.png`),fullPage: true});

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
