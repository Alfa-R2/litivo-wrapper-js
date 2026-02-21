import type { Locator, Page } from 'playwright';
import type { DebtNegotiationType } from '../../models/debt-negotiation.js';
import BaseSection from '../bases/section.js';

/** TODO: Debt Negotiation (feat: extend create insolvency method with debt negotiation section) */
class DebtNegotiationSection extends BaseSection<[DebtNegotiationType]> {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button.btn-guardar:not([disabled])', {
      hasText: 'Siguiente',
    });
  }

  public async send(debtNegotiation: DebtNegotiationType): Promise<void> {
    const page = this.page;

    // TODO: Complete form

    const installments = debtNegotiation.installments;
    const installmentsInput = page.locator('nz-input-number[formcontrolname="cuotas"] input');
    await installmentsInput.fill(installments.toString());

    // TODO: Complete form

    const recalculateProjectionButton = page.locator(
      'button:has-text("Guardar datos y calcular proyección"), button:has-text("Recalcular proyección")',
    );
    await recalculateProjectionButton.click();

    // TODO: Complete form

    await this.submitButton.click();

    const confirmButton = page.locator('button', { hasText: 'Confirmar' });
    await confirmButton.click();

    await page.locator('h2', { hasText: 'DOCUMENTOS ANEXOS' }).waitFor();
  }
}

export default DebtNegotiationSection;
