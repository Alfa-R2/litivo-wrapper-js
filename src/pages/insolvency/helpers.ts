import type { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { listarInsolvenciesUrl } from "../../constants.js";
import { DraftDeletionException, MoreThanOneDraftWithTheSameDebtorException } from "../../exceptions.js";
import { getInputSelector } from "../../helpers.js";



function getOptionDiv(page: Page, title: string): Locator {
    return page.locator(`nz-option-item[title="${title}"]`);
}

/** Fills the input with the provided value selecting the first option. */
async function fillInput(page: Page, nzSelect: Locator, value: string): Promise<void> {
    const input: Locator = nzSelect.locator('input');
    await nzSelect.click();
    // NOTE: this allows to use thisf function like selectOption
    // NOTE: This may replace selectOption methods that may fails if too many options because does not scrolls to make options visible.
    await input.evaluate((el: HTMLInputElement) => {
        el.removeAttribute('readonly');
    });
    await input.fill(value);

    const optionDiv: Locator = getOptionDiv(page, value);
    await optionDiv.click();
    await page.waitForTimeout(500); // TODO: find a better way to wait for the input to be filled.
}

async function searchDraft(page:Page, by:"Código de Insolvencia"|"Nombre del Deudor"|"Identificación del Deudor", value:string):Promise<Locator> {
    await page.goto(listarInsolvenciesUrl.href  );
    await page.waitForURL(listarInsolvenciesUrl.href);

    const solicitudStateInput = page.locator(getInputSelector('estado_busqueda'));
    const searchFilterInput = page.locator(getInputSelector('filtrobusqueda'));
    const searchInput = page.locator('input[formcontrolname="search"]');
    const searchButton = page.locator('i[nztype="search"]');
    const rows = page.locator("tbody tr.ant-table-row")

    await fillInput(page, solicitudStateInput, 'BORRADORES');
    await fillInput(page, searchFilterInput, by);
    await searchInput.fill(value);
    await searchButton.click();
    await page.waitForURL(listarInsolvenciesUrl.href);

    return rows;
}

async function deleteDraft(page: Page): Promise<void> {
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

    const url = new URL(clipboardContent);
    const segments = url.pathname.split('/').filter(Boolean);
    const code = segments[segments.length - 1] || ''; // Never ''

    console.log(`Draft ${code} loaded`);

    let rows = await searchDraft(page, "Código de Insolvencia", code);
    try {
        await expect(rows).toHaveCount(1, { timeout: 10_000 });
    } catch (e) {
        throw new DraftDeletionException(`Failed to find 1 row in the table: ${e}`);
    }

    const lastRow = rows.last()
    const idCell = lastRow.locator('td').first();
    const trashButton = lastRow.locator('td').locator('a').last();
    const deleteButton = page.locator('button', { hasText: 'Eliminar' });

    if (await idCell.textContent() !== code) {
        throw new DraftDeletionException(`Failed to find the draft with code ${code}`);
    }

    await trashButton.click();
    await deleteButton.click();
    await deleteButton.waitFor({
        state: 'detached',
        timeout: 10_000,
    })

    rows = await searchDraft(page, "Código de Insolvencia", code);
    await expect(rows).toHaveCount(0, { timeout: 10_000 });
}
async function validateDraftHasOneDebtor(page: Page, fullName: string): Promise<void> {
    const rows = await searchDraft(page, "Nombre del Deudor", fullName);

    try {
        await expect(rows).toHaveCount(0, { timeout: 10_000 });
    } catch (e) {
        throw new MoreThanOneDraftWithTheSameDebtorException(`Exists more than one draft with this debtor ${fullName}, rows count: ${await rows.count()}`);
    }
}

export { deleteDraft, validateDraftHasOneDebtor };

