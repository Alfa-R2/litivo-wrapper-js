import type { Page } from 'playwright';

async function assertClipboardPermissionGranted(page: Page): Promise<void> {
  const state = await page.evaluate(async () => {
    const result = await navigator.permissions.query({
      name: 'clipboard-read' as PermissionName,
    });
    return result.state;
  });

  if (state !== 'granted') {
    throw new Error(
      `Clipboard permission not granted.

Current state: "${state}"

Please ensure your browser context is created with clipboard-read permission, like this:

const browserContext = await browser.newContext({
  permissions: ['clipboard-read'],
});
`,
    );
  }
}

export { assertClipboardPermissionGranted };
