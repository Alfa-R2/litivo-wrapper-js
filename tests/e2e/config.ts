import env from 'env-var';
import { readFileSync } from 'fs';
import InsolvencySchema from '../../src/models/insolvency';

process.loadEnvFile();

const wrapper: string = 'LITIVO';

// Insolvency
const filePath = env.get(`${wrapper}_INSOLVENCY_DATA_JSON_FILE_PATH`).required().asString(); // TODO: Check path
const insolvencyContent = readFileSync(filePath, 'utf-8');
const insolvencyData = JSON.parse(insolvencyContent);
const insolvency = InsolvencySchema.parse(insolvencyData);

/** TODO: Find a safer way to store and access these credentials. */
class UserCredentials {
  public static readonly email: string = env.get(`${wrapper}_EMAIL`).required().asEmailString();
  public static readonly password: string = env.get(`${wrapper}_PASSWORD`).required().asString();
  private constructor() {}
}

export { insolvency, UserCredentials };
