import { readFileSync, writeFileSync } from 'fs';
// TODO: Check if the next import may be useful: "import fs from "fs/promises" // Async fs operations".
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

class Paths {
  // Directories
  private readonly rootDir = resolve(__dirname, '..', '..', '..');
  private readonly secretsDir = resolve(this.rootDir, 'secrets');

  // Files
  public readonly insolvencyFile = join(this.secretsDir, 'insolvency.json');

  // Helpers  NOTE: Idk if these are responsability of this class.
  // public exists(filePath: string): boolean { return existsSync(filePath); }

  public readJSON<T = any>(filePath: string): T {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  /*
  public readJSONOptional<T = any>(filePath: string): T | null {
    if (!this.exists(filePath)) {
      return null;
    }
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  }
  */

  public writeJSON(filePath: string, data: any): void {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /*
  public ensureDir(dirPath: string): void {
    if (!this.exists(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  }
  */

  // Custom paths
  // public secret(filename: string): string { return join(this.secretsDir, filename); }
}

export const paths = new Paths();
