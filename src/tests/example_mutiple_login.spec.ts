import { test, expect } from '@playwright/test';
import { getTestDataKey, getJSONArray } from '../utils/testDataReader';
import { constants } from 'buffer';
import * as fs from "fs";
import * as path from 'path';
import { customLogger } from '../logger/customLogger';

const testUsers = getJSONArray("users");
const logger = new customLogger();

test.describe('Fetching data from json file and logging in',()=>{
for(const user of testUsers){
  test(`Login with the username: ${user.username}`, async ({ page }) => {
  const baseUrl = getTestDataKey("loginUrl");
  logger.info('Navigating to the Login Page')
  await page.goto(baseUrl);

  // Expect a title "to contain" a substring.
  logger.info('Checking for the webpage header')
  await expect(page).toHaveTitle(/Swag Labs/);
  logger.info('Filling in the username')
  await page.getByPlaceholder('Username').fill(user.username);
  logger.info('Filling in the password');
  await page.getByPlaceholder('Password').fill(user.password);
  try{
  logger.info('Clicking on Login button')
  await page.getByText('Login').click();
  }catch{
    logger.error('Login failed')
  }
})
}
});