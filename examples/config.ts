import { readFileSync } from 'fs';
import { InsolvencySchema } from 'litivo-wrapper';

process.loadEnvFile();

// Insolvency
const filePath = process.env.LITIVO_INSOLVENCY_DATA_JSON_FILE_PATH;
if (filePath === undefined) {
  throw new Error('Environment variable LITIVO_INSOLVENCY_DATA_JSON_FILE_PATH is not set.');
}
const insolvencyContent = readFileSync(filePath, 'utf-8');
const insolvencyData = JSON.parse(insolvencyContent);
const insolvency = InsolvencySchema.parse(insolvencyData);

// Credentials
const email: string = process.env.LITIVO_EMAIL || '';
if (email === '') {
  throw new Error('Environment variable LITIVO_EMAIL is not set.');
}
const password = process.env.LITIVO_PASSWORD || '';
if (password === '') {
  throw new Error('Environment variable LITIVO_PASSWORD is not set.');
}

export { email, insolvency, password };
