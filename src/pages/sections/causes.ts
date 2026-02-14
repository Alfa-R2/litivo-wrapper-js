import type { Locator, Page } from 'playwright';
import { getInputSelector } from '../../helpers.js';
import type { CausesType } from '../../models/causes.js';
import BaseSection from '../bases/section.js';


/** TODO: Causes (feat: extend create insolvency method with causes section) */
class CausesSection extends BaseSection<[CausesType]> {
  private readonly departmentInput: Locator;
  private readonly cityInput: Locator;
  private readonly addCauseButton: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.departmentInput = page.locator(getInputSelector('departamento'));
    this.cityInput = page.locator(getInputSelector('ciudad'));
    this.addCauseButton = page.locator('button:has-text("AGREGAR CAUSA")');
    this.submitButton = page.locator('button.btn-guardar:not([disabled]):has-text("Siguiente")');
  }



  public async send(causes: CausesType): Promise<void> {
    await this.fillInput(this.departmentInput, causes.department);
    await this.fillInput(this.cityInput, causes.city);
    for (const cause of causes.causes) {
      await this.addCauseButton.click();

      const CauseTypeInput: Locator = this.page.locator(getInputSelector('claseCausa'));
      const CauseDescriptionDiv: Locator = this.page.locator("div.fr-element.fr-view[aria-disabled='false']");
      const SaveCauseButton: Locator = this.page.locator('button:has-text("GUARDAR")');

      await this.fillInput(CauseTypeInput, cause.type);
      await CauseDescriptionDiv.fill(cause.description);

      await SaveCauseButton.click();
      await SaveCauseButton.waitFor({ state: 'detached' });
    }
    await this.submitButton.click();
    await this.submitButton.waitFor({ state: 'detached' });
  }
}

export default CausesSection;
