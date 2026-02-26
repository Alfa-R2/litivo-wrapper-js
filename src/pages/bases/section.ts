import type { Locator, Page } from 'playwright';
import { z } from 'zod';
import { strongOptionDivSelector } from '../../constants.js';
import Paged from './paged.js';

const isoDateSchema = z.iso.date();

const BASE_DRAFT_URL = 'https://www.litivo.com/insolvencia/crear/';
const DRAFT_URL_PATTERN = new RegExp(`^${BASE_DRAFT_URL.replace(/\//g, '\\/')}\\d+$`);

// TODO: Do not fill if already selected

abstract class BaseSection<T extends unknown[]> extends Paged {
  public constructor(page: Page) {
    super(page);
  }

  protected async uploadFile(uploadTextButton: string, filePath: string): Promise<void> {
    const page = this.page;
    const uploadButton = page.locator("span", {hasText: uploadTextButton});
    const fileInput = page.locator('input[type="file"]#undefined');
    const uploadFileButton = page.locator('button:not([disabled])', { hasText: 'Subir' });

    await uploadButton.click();
    await fileInput.setInputFiles(filePath);
    await uploadFileButton.click();
  }

  private getOptionDiv(title: string): Locator {
    return this.page.locator(`nz-option-item[title="${title}"]`);
  }

  protected async goToDraft(): Promise<void> {
    const page: Page = this.page;

    if (DRAFT_URL_PATTERN.test(page.url())) {
      await page.reload();
    } else {
      const shareLink = page.locator('a', { hasText: 'Compartir expediente digital' });
      const copyLinkButton = page.locator('span[nz-tooltip="Click para copiar enlace"]');

      await page.keyboard.press('Escape'); // Close modal if open
      await shareLink.click();
      await copyLinkButton.click();
      const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

      // TODO: Find why this fails sometimes giving urls like notFoundUrl
      // const notFoundUrl = 'https://www.litivo.com/auth/404';
      if (clipboardContent.includes('auth/404')) {
        await page.waitForTimeout(1_000); // TODO: Find a better way to wait for the page to load
        await copyLinkButton.click();
        const clipboardContent2 = await page.evaluate(() => navigator.clipboard.readText());
        if (clipboardContent2.includes('auth/404')) {
          throw new Error('Failed to copy draft link to clipboard');
        }
      }

      const currentUrl = page.url();
      const url = new URL(clipboardContent);
      const segments = url.pathname.split('/').filter(Boolean);
      const code = segments[segments.length - 1] || ''; // Never ''

      console.log(`Draft ${code} loaded`);

      const newUrl = `${currentUrl}/${code}`;

      await page.goto(newUrl);
    }
    await page.locator('h2').waitFor(); // NOTE: Section title

    await page.waitForTimeout(1_000); // TODO: Find a better way to wait for the page to load
  }

  protected async deleteDraft(code: string): Promise<void> {
    // TODO
  }

  /** Fills the input with the provided value selecting the first option. */
  protected async fillInput(nzSelect: Locator, value: string): Promise<void> {
    const input: Locator = nzSelect.locator('input');
    await nzSelect.click();
    await input.evaluate((el:HTMLInputElement)=>{el.removeAttribute('readonly')});
    await input.fill(value);

    const optionDiv: Locator = this.getOptionDiv(value);
    await optionDiv.click();
    await this.page.waitForTimeout(500); // TODO: find a better way to wait for the input to be filled.
  }

  /** date value should be in YYYY-MM-DD format. Fill in "yyyy/mm/dd" format.
   */
  protected async fillDateInput(nzDatePicker: Locator, value: string): Promise<void> {
    const input: Locator = nzDatePicker.locator('input');
    const date: string = isoDateSchema.parse(value);
    const slashedDate: string = date.replace(/-/g, '/');

    await input.click();
    await input.fill(slashedDate);
    await input.press('Tab'); // NOTE: Close calendar.
    await this.page.waitForTimeout(500); // TODO: find a better way to wait for the input to be filled.
  }

  protected async selectOption(nzSelect: Locator, value: string): Promise<void> {
    await nzSelect.click();
    const optionDiv: Locator = this.getOptionDiv(value);
    await optionDiv.click();
  }

  /**
   * TODO: Do not fill if the value is already selected
   */
  protected async selectDescriptedOption(input: Locator, value: string): Promise<void> {
    await input.click();
    const optionDiv: Locator = this.page.locator(strongOptionDivSelector, { hasText: value });
    await optionDiv.click();
  }

  abstract send(...params: T): Promise<void>;
}

export default BaseSection;
