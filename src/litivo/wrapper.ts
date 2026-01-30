import type { BrowserContext, Locator, Page } from 'playwright';
import { wrapperUrl } from './constants.js';
import { InsolvencySchema, type InsolvencyType, type SiteType } from './models/insolvency.js';
import { AuthenticatedPage } from './pages/bases/authenticated.js';
import { DashboardPage } from './pages/dashboard.js';
import { LoginPage } from './pages/login.js';

/** Wrapper class for Litivo interactions using Playwright. */
export class Litivo {
  private authenticatedPage!: AuthenticatedPage; // TODO: Unknown loggin session time, in the future may need to handle re-login.
  private page!: Page;

  public constructor(private readonly context: BrowserContext) {}

  /** Logs into Litivo with the provided credentials.
   *
   * TODO: Throws an error if already logged in with this wrapper.
   */
  public async login(email: string, password: string): Promise<void> {
    const page: Page = await this.context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    this.authenticatedPage = dashboardPage;
    this.page = page;
  }

  /** Creates a new insolvency.
   *
   * TODO: Abstract some actions into their own page models if needed.
   * TODO: check if it is responsability to check insolvency object here.
   * TODO: Find a way to show input options.
   * TODO: Check bug where playwright vscode extension debugger does not raise timeout errors.
   */
  public async createInsolvency(data: unknown): Promise<void> {
    const insolvency: InsolvencyType = InsolvencySchema.parse(data);

    function getInputSelector(id: string): string {
      return `nz-select[formcontrolname="${id}"] input`;
    }

    const page: Page = this.page;
    const url = new URL('/insolvencia/crear', wrapperUrl);

    await page.goto(url.href);

    // Site

    const site: SiteType = insolvency.site;
    const departmentInput: Locator = page.locator(getInputSelector('departamento'));
    const cityInput: Locator = page.locator(getInputSelector('ciudad'));
    const sponsorEntityInput: Locator = page.locator(getInputSelector('entidad'));
    const branchCenterInput: Locator = page.locator(getInputSelector('sede'));
    const submitButton: Locator = page.locator('button.btn-guardar:not([disabled])');

    const optionDiv: Locator = page.locator('div.ant-select-item-option-content');
    const firstOptionDiv: Locator = optionDiv.first();

    await departmentInput.click();
    await departmentInput.fill(site.department);
    await firstOptionDiv.click();

    await cityInput.click();
    await cityInput.fill(site.city);
    await firstOptionDiv.click();

    await sponsorEntityInput.click();
    await sponsorEntityInput.fill(site.sponsorEntity);
    await firstOptionDiv.click();

    await branchCenterInput.click();
    await branchCenterInput.fill(site.branchCenter);
    await firstOptionDiv.click();

    await submitButton.click();

    // Debtor

    // Causes

    // Creditor

    // Assets

    // Judicial, Administrative, or Private Proceedings

    // Child Support Obligations

    // Available Resources

    // Debt Negotiation

    // Attached Documents

    // Application Submission

    await page.waitForTimeout(500); // Breakpoint line.
  }

  public async logout(): Promise<void> {
    await this.authenticatedPage.logout();
    await this.page.close();
  }

  /**
   * Checks if the Litivo session is logged in.
   *
   * Checked by verifying if cannot go to the dashboard page or login page or something like that.
   */
  public async isLoggedIn(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  /** Wait for a specific timeout in milliseconds. */
  public waitforTimeout(timeout: number): Promise<void> {
    return this.authenticatedPage.waitForTimeout(timeout);
  }

  // NOTE: May be useful in some cases to access the raw Playwright page.
  // public getPage(): Page { return this.page; }
}
