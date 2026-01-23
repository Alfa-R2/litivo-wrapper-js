import { expect, test } from 'playwright/test';
/**
 * Example page test.
 * https://playwright.dev/docs/getting-started-vscode
 */

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
