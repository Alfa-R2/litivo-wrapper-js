import { insolvency } from './config.js';
// NOTE: commented "import { expect, test } from './fixtures/wrapper.fixture.js';" because expect is not needed yet.
import { test } from './wrapper.fixture.js';

test.describe('Wrapper Tests', () => {
  test('Test insolvency', async ({ litivo }) => {
    // NOTE: This test usually fails in headless mode, because it makes harder to find the elements, so it is recommended to run it in headed mode until a solution is found.
    await litivo.createInsolvency(insolvency);
    // TODO: Make a delete draft method a use it at the end of the test to clean up the created draft.
  });
});
