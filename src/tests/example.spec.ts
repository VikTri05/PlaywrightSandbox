import { test, expect } from '@playwright/test';
import { getTestDataKey } from '../utils/testDataReader';
import { constants } from 'buffer';
import * as fs from "fs";
import * as path from 'path';

test('has title @smoke', async ({ page }) => {
  const baseUrl = getTestDataKey("baseUrl");
  await page.goto(baseUrl);

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