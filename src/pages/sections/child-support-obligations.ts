import type { Locator, Page } from 'playwright';
import BaseSection from '../bases/section.js';

/** TODO: Child Support Obligations (feat: extend create insolvency method with child support obligations section) */
class ChildSupportObligationsSection extends BaseSection<[unknown]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  public async send(childSupportObligations: unknown): Promise<void> {
    const page = this.page;

    const addChildSupportObligationButton = page.locator('button', {
      hasText: 'AGREGAR OBLIGACIÓN ALIMENTARIA',
    });
    // await addChildSupportObligationButton.click();

    // TODO: Add child support obligations

    await this.submitButton.click();
    await page.locator('h2', { hasText: 'RECURSOS DISPONIBLES' }).waitFor();
  }
}

export default ChildSupportObligationsSection;
