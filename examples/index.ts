import Litivo from 'litivo-wrapper';
import { chromium } from 'playwright';
import { email, insolvency, password } from './config.js';

const permissions: [string, ...string[]] = ['clipboard-read'];
const browser = await chromium.launch({ channel: 'msedge', headless: false });
try {
  const browserContext = await browser.newContext({ permissions: permissions });
  const litivo = new Litivo(browserContext);
  await litivo.login(email, password);
  await litivo.createInsolvency(insolvency);
  await litivo.logout();
} catch (error) {
  console.error('Error during execution:', error);
} finally {
  await browser.close();
}
