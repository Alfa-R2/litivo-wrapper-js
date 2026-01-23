import { handleError } from './errors.js';
import { navigate } from './page.js';

async function main(): Promise<void> {
  await navigate();
}

main().catch(handleError);
