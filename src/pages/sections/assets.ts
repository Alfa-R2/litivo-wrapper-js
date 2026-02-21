import type { Locator, Page } from 'playwright';
import type { AssetsType } from '../../models/assets.js';
import BaseSection from '../bases/section.js';

/** TODO: Assets (feat: extend create insolvency method with assets section) */
class AssetsSection extends BaseSection<[AssetsType]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  // TODO: Check if it is ok to accept AssetsType or AssetsType.optional()

  public async send(assets: AssetsType): Promise<void> {
    const page = this.page;

    // const addMovableAssetButton = page.locator('button[nztooltiptitle="Agregar Bien Mueble"]');
    // await addMovableAssetButton.click();

    // const addRealEstateAssetButton = page.locator('button[nztooltiptitle="Agregar Bien Inmueble"]');
    // await addRealEstateAssetButton.click();

    /*
    for (const asset of assets) {
      continue; // TODO: Add assets
    }
    */

    await this.submitButton.click();
    await page
      .locator('h2', { hasText: 'PROCESOS JUDICIALES, ADMINISTRATIVOS O PRIVADOS' })
      .waitFor();
  }
}

export default AssetsSection;
