import type { Locator, Page } from '@playwright/test';
import BaseSection from '../bases/section.js';
/** TODO: Attached Documents (feat: extend create insolvency method with attached documents section) */
class AttachedDocumentsSection extends BaseSection<[unknown]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  public async send(AttachedDocuments: unknown): Promise<void> {
    const page = this.page;

    // TODO: Add attached documents

    // const addAttachedButton = page.locator('button', { hasText: 'AGREGAR ANEXO' });
    //await addAttachedButton.click();

    await this.submitButton.click();
    await page.locator('h2', { hasText: 'ENVÍO Y FIRMA DE LA SOLICITUD' }).waitFor();
  }
}

export default AttachedDocumentsSection;
