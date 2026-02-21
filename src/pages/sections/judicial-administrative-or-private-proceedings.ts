import type { Locator, Page } from 'playwright';
import BaseSection from '../bases/section.js';

/** TODO: Judicial, Administrative, or Private Proceedings (feat: extend create insolvency method with judicial, administrative, or private proceedings section) */
class JudicialAdministrativeOrPrivateProceedingsSection extends BaseSection<[unknown]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  public async send(judicialAdministrativeOrPrivateProceedings: unknown): Promise<void> {
    const page = this.page;

    const addNewProcessButton = page.locator('button', { hasText: 'AGREGAR NUEVO PROCESO' });
    // await addNewProcessButton.click();

    // TODO: Add  judicial, administrative, or private proceedings

    await this.submitButton.click();
    await page.locator('h2', { hasText: 'OBLIGACIONES ALIMENTARIAS' }).waitFor();
  }
}

class JAOPPSection extends JudicialAdministrativeOrPrivateProceedingsSection {}

export default JAOPPSection;
