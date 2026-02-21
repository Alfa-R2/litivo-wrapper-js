import type { Locator, Page } from 'playwright';
import BaseSection from '../bases/section.js';
/** TODO: Available Resources (feat: extend create insolvency method with available resources section) */
class AvailableResourcesSection extends BaseSection<[unknown]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  public async send(availableResources: unknown): Promise<void> {
    const page = this.page;

    // TODO: Add available resources

    const saveButton = page.locator('button', { hasText: 'Guardar' });
    await saveButton.click();

    await this.submitButton.click();
    await page.locator('h2', { hasText: 'NEGOCIACIÓN DE DEUDAS' }).waitFor();
  }
}

export default AvailableResourcesSection;
