import { insolvency } from './config/data.js';
// NOTE: commented "import { expect, test } from './fixtures/wrapper.fixture.js';" because expect is not needed yet.
import { test } from './fixtures/wrapper.fixture.js';

test.describe('Wrapper Tests', () => {
  test('Test insolvency', async ({ litivo }) => {
    await litivo.createInsolvency(insolvency);
  });
});
