import { test } from '@playwright/test';

test('basic test', async ({ page }) => {
  const myURL: string = process.env.PLAYWRIGHT_TEST_BASE_URL
    ? process.env.PLAYWRIGHT_TEST_BASE_URL
    : ('http://localhost:3000/' as string);

  await page.goto(myURL);
});
