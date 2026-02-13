import type { Locator, Page } from 'playwright';
import { getDateInputSelector, getInputSelector } from '../../helpers.js';
import type { DebtorType, ExIdDocType, ProfessionType } from '../../models/debtor.js';
import type { IdDocType, SpouseType } from '../../models/spouse.js';
import BaseSection from '../bases/section.js';

const plusSpanSelector: string = '+ span.ant-input-suffix';

/**
 * TODO: check the next BUSINESS LOGIC: Debtors can have just one insolvency application at a time.
 * TODO: Check if it is possible to used a tuple instead of an array.
 * NOTE: Once a debtor in linked, page will always remember the debtor. If you want to modify their info, you'll need to work over it.
 * TODO: Eliminate any saved draft when a new debtor is already added because cannot use an already used debtor.
 */
class DebtorSection extends BaseSection<[DebtorType[]]> {
  private readonly addDebtorButton: Locator;
  private readonly idTypeInput: Locator;
  private readonly idNumberInput: Locator;
  private readonly searchButton: Locator;
  private readonly documentIssueCityInput: Locator;
  private readonly originCountryInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly middleNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly secondLastNameInput: Locator;
  private readonly addIdDocFileButton: Locator;
  private readonly fileInput: Locator;
  private readonly uploadFileButton: Locator;
  private readonly genderInput: Locator;
  private readonly civilStatusInput: Locator;
  private readonly birthDateInput: Locator;
  private readonly ethnicityInput: Locator;
  private readonly disabilityInput: Locator;
  private readonly residenceCountryInput: Locator;
  private readonly departmentInput: Locator;
  private readonly cityInput: Locator;
  private readonly roadTypeInput: Locator;
  private readonly roadNameInput: Locator;
  private readonly roadNumberInput: Locator;
  private readonly roadSubNumberInput: Locator;
  private readonly roadDetailsInput: Locator;
  private readonly roadStratumInput: Locator;

  public constructor(page: Page) {
    super(page);
    this.addDebtorButton = page.locator('app-insolvencia-deudor button.btn-guardar');
    this.idTypeInput = page.locator(getInputSelector('tipoDocumento'));
    this.idNumberInput = page.locator('input[formcontrolname="numeroIdentificacion"]');
    this.searchButton = page.locator('span', { hasText: 'Buscar' }); // TODO: Find a better way to get the locator.
    this.documentIssueCityInput = page.locator(getInputSelector('ciudadExpedicion'));
    this.originCountryInput = page.locator(getInputSelector('paisOrigen'));
    this.firstNameInput = page.locator('input[formcontrolname="nombre1"]');
    this.middleNameInput = page.locator('input[formcontrolname="nombre2"]');
    this.lastNameInput = page.locator('input[formcontrolname="apellido1"]');
    this.secondLastNameInput = page.locator('input[formcontrolname="apellido2"]');
    this.addIdDocFileButton = page.locator('span', { hasText: 'ANEXAR COPIA DE LA CÉDULA' }); // TODO: Find a better way to get the locator.
    this.fileInput = page.locator('input[type="file"]#undefined');
    this.uploadFileButton = page.locator('button:not([disabled])', { hasText: 'Subir' }); // TODO: Find a better way to get the locator.
    this.genderInput = page.locator(getInputSelector('genero'));
    this.civilStatusInput = page.locator(getInputSelector('estadoCivil'));
    this.birthDateInput = page.locator(getDateInputSelector('fechaNacimiento'));
    this.ethnicityInput = page.locator(getInputSelector('etnia'));
    this.disabilityInput = page.locator(getInputSelector('discapacidad'));
    this.residenceCountryInput = page.locator(getInputSelector('paisResidencia'));
    this.departmentInput = page.locator(getInputSelector('departamento'));
    this.cityInput = page.locator(getInputSelector('ciudad'));
    this.roadTypeInput = page.locator(getInputSelector('razonSocial'));
    this.roadNameInput = page.locator('input[formcontrolname="a1"]');
    this.roadNumberInput = page.locator('input[formcontrolname="a2"]');
    this.roadSubNumberInput = page.locator('input[formcontrolname="a3"]');
    this.roadDetailsInput = page.locator('input[formcontrolname="detalleDireccion"]');
    this.roadStratumInput = page.locator(getInputSelector('estrato'));
  }
  public async send(debtors: DebtorType[]): Promise<void> {
    const page = this.page;

    for (const debtor of debtors) {
      const idDoc: ExIdDocType = debtor.idDoc;
      const docType: string = idDoc.type;
      const docNumber: string = idDoc.number;
      const docFilePath: string = idDoc.filePath;
      const middleName: string = debtor.middleName || '';
      const secondLastName: string = debtor.secondLastName || '';
      const civilStatus: string | undefined = debtor.civilStatus;
      const ethnicity: string | undefined = debtor.ethnicity;
      const disability: string | undefined = debtor.disability;
      const residenceCountry: string = debtor.residenceCountry;
      const roadType: string | undefined = debtor.roadType;
      const roadName: string = debtor.roadName || '';
      const roadNumber: string | undefined = debtor.roadNumber;
      const roadSubNumber: string | undefined = debtor.roadSubNumber;
      const roadDetails: string = debtor.roadDetails || '';
      const roadStratum: string | undefined = debtor.roadStratum;

      const hasJudicialNotificationAddress: boolean =
        roadType !== undefined ||
        roadName !== '' ||
        roadDetails !== '' ||
        roadStratum !== undefined;
      if (hasJudicialNotificationAddress) {
        if (roadNumber === undefined) {
          throw new Error('roadNumber is required when hasJudicialNotificationAddress is true');
        }
        if (roadSubNumber === undefined) {
          throw new Error('subNumber is required when hasJudicialNotificationAddress is true');
        }
      }
      const telephones: string[] = debtor.telephones || [];
      const cellphones: string[] = debtor.cellphones || [];
      const emailsOrReason: string | string[] = debtor.emailsOrReason;
      const webPages: string[] = debtor.webPages || [];

      // NOTE: Other consts may be refactored here.

      const incomeInput = page.locator('input[formcontrolname="montoIngresosMensuales"]');
      const hasMonthlyIncomeButton: Locator = page.locator(
        'label[formcontrolname="poseeIngresosMensuales"]',
      );
      const totalMonthlyIncomeFromOtherActivities: number =
        debtor.totalMonthlyIncomeFromOtherActivities || 0;
      const hasOtherActivitiesIncomeButton = page.locator(
        'label[formcontrolname="swOtraActividad"]',
      );
      const otherActivitiesIncomeInput: Locator = page.locator(
        'input[formcontrolname="montoIngresoOtraActividad"]',
      );
      const totalMonthlyIncomeFromOtherActivitiesDescription: string =
        debtor.totalMonthlyIncomeFromOtherActivitiesDescription || '';
      const otherActivitiesIncomeTextarea: Locator = page.locator(
        'textarea[formcontrolname="descripcionOtraActividad"]',
      );

      await this.addDebtorButton.click();

      // Identification Data

      await this.selectOption(this.idTypeInput, docType);
      await this.idNumberInput.fill(docNumber);
      await this.searchButton.click();

      await this.fillInput(this.documentIssueCityInput, idDoc.issueCity);
      await this.fillInput(this.originCountryInput, debtor.originCountry);

      await this.firstNameInput.fill(debtor.firstName);
      if (middleName !== '') {
        await this.middleNameInput.fill(middleName);
      }
      await this.lastNameInput.fill(debtor.lastName);
      if (secondLastName !== '') {
        await this.secondLastNameInput.fill(secondLastName);
      }

      // NOTE: Delete all previous uploaded things, like docs or certain info with delete buttons.
      // NOTE: This is because once debtor is linked, page will always remember the debtor.
      const deleteButtons = await page.locator('i[nztype="delete"]').all();
      for (const deleteButton of deleteButtons) {
        await deleteButton.click();
      }

      await this.addIdDocFileButton.click();
      await this.fileInput.setInputFiles(docFilePath);
      await this.uploadFileButton.click();

      await this.selectOption(this.genderInput, debtor.gender);
      if (civilStatus !== undefined) {
        await this.selectOption(this.civilStatusInput, civilStatus);
      }
      await this.fillDateInput(this.birthDateInput, debtor.birthDate);
      if (ethnicity !== undefined) {
        await this.selectOption(this.ethnicityInput, ethnicity);
      }
      if (disability !== undefined) {
        await this.selectDescriptedOption(this.disabilityInput, disability);
      }

      // Contact Information

      const residenceCountryInputValue = await this.residenceCountryInput.innerText();
      if (residenceCountryInputValue !== residenceCountry) {
        await this.fillInput(this.residenceCountryInput, residenceCountry);
      }
      await this.fillInput(this.departmentInput, debtor.department);
      await this.fillInput(this.cityInput, debtor.city);

      if (roadType !== undefined) {
        await this.selectOption(this.roadTypeInput, roadType);
      }
      if (roadName !== '') {
        await this.roadNameInput.fill(roadName);
      }
      if (roadNumber !== undefined) {
        await this.roadNumberInput.fill(roadNumber);
      }
      if (roadSubNumber !== undefined) {
        await this.roadSubNumberInput.fill(roadSubNumber);
      }
      if (roadStratum !== '') {
        await this.roadDetailsInput.fill(roadDetails);
      }
      if (roadStratum !== undefined) {
        await this.selectOption(this.roadStratumInput, roadStratum);
      }
      let telephoneIndex: number = 0; // TODO: Up to 3.
      for (const telephone of telephones) {
        telephoneIndex++;
        const telephoneInput: Locator = page.locator(
          `[formcontrolname="telefono${telephoneIndex}"]`,
        );
        await telephoneInput.fill(telephone);
        if (telephoneIndex === 1) {
          await telephoneInput.locator(plusSpanSelector).click();
        }
      }
      let cellphoneIndex: number = 0; // TODO: Up to 3.
      for (const cellphone of cellphones) {
        cellphoneIndex++;
        const cellphoneInput: Locator = page.locator(
          `[formcontrolname="celular${cellphoneIndex}"]`,
        );
        await cellphoneInput.fill(cellphone);
        if (cellphoneIndex === 1) {
          await cellphoneInput.locator(plusSpanSelector).click();
        }
      }
      if (Array.isArray(emailsOrReason)) {
        // value is string[]
        let emailIndex: number = 0; // TODO: Up to 3.
        for (const email of emailsOrReason) {
          emailIndex++;
          const emailInput: Locator = page.locator(`[formcontrolname="email${emailIndex}"]`);
          await emailInput.fill(email);
          if (emailIndex === 1) {
            await emailInput.locator(plusSpanSelector).click();
          }
        }
      } else {
        // value is string
        const unknownEmailButton: Locator = page.locator('label[formcontrolname="conoceEmail"]');
        const reasonIsChecked: boolean = await unknownEmailButton.locator('input').isChecked();
        if (!reasonIsChecked) {
          await unknownEmailButton.click();
          const textareaReason = page.locator('textarea[formcontrolname="razonDesconoceEmail"]');
          await textareaReason.fill(emailsOrReason);
        }
      }
      let webPageIndex: number = 0;
      for (const webPage of webPages) {
        webPageIndex++;
        const webPageInput: Locator = page.locator(`[formcontrolname="paginaWeb${webPageIndex}"]`);
        await webPageInput.fill(webPage);
        if (webPageIndex === 1) {
          await webPageInput.locator(plusSpanSelector).click();
        }
      }

      const merchantNzText: string = 'Seleccione el tipo de persona natural:';
      const merchantNzFormItem: Locator = page.locator('nz-form-item', { hasText: merchantNzText });
      const merchantText: string = `${debtor.isMerchant ? '' : 'NO '}Comerciante`;
      const merchantRadio: Locator = merchantNzFormItem.locator('label', { hasText: merchantText });
      const merchantRadioIsChecked: boolean = await merchantRadio.isChecked();
      if (!merchantRadioIsChecked) {
        await merchantRadio.click();
      }

      const hasProceduresNzRadioGroup: Locator = page.locator(
        'nz-radio-group[formcontrolname="tiene_procedimientos"]',
      );
      const hasProceduresLabel: Locator = hasProceduresNzRadioGroup.locator('label', {
        hasText: debtor.hasMultipleDebtCollectionProcedures ? 'Si' : 'No',
      });
      await hasProceduresLabel.click();

      // Employment Data

      const hasEmployment: boolean = debtor.economicActivity.includes('Empleo ');
      const economicActivity: string = debtor.economicActivity.replace('Empleo ', '');

      if (hasEmployment) {
        const hasEmploymentButton = page.locator('label[formcontrolname="tieneEmpleo"]');
        const hasEmploymentButtonIsChecked: boolean = await hasEmploymentButton.isChecked();
        if (!hasEmploymentButtonIsChecked) {
          await hasEmploymentButton.click();
        }
      }
      const activityPart = hasEmployment ? 'Empleo' : 'Actividad';
      const ActivityTypeInput = page.locator(getInputSelector(`tipo${activityPart}`));
      await this.selectOption(ActivityTypeInput, economicActivity);

      const activityDescriptionTextarea = page.locator('textarea[formcontrolname="descripcion"]');
      await activityDescriptionTextarea.fill(debtor.economicActivityDescription);

      const totalMonthlyIncome = debtor.totalMonthlyIncome || 0;
      if (totalMonthlyIncome > 0) {
        await incomeInput.fill(totalMonthlyIncome.toString());
        const addEmploymentOrIncomeCertificationButton = page.locator('button', {
          hasText: 'ANEXAR CERTIFICACIÓN LABORAL O DE INGRESOS',
        });
        await addEmploymentOrIncomeCertificationButton.click();
        const employmentOrIncomeCertificationFilePath =
          debtor.employmentOrIncomeCertificationFilePath || '';
        if (employmentOrIncomeCertificationFilePath === '') {
          throw new Error(
            'employmentOrIncomeCertificationFilePath is Mandatory when totalMonthlyIncome > 0.',
          );
        }
        await this.fileInput.setInputFiles(employmentOrIncomeCertificationFilePath);
        await this.uploadFileButton.click();
      } else {
        const hasMonthlyIncomeButtonIsChecked: boolean = await hasMonthlyIncomeButton
          .locator('input')
          .isChecked();
        if (!hasMonthlyIncomeButtonIsChecked) {
          await hasMonthlyIncomeButton.click();
        }
      }

      if (totalMonthlyIncomeFromOtherActivities > 0) {
        const hasOtherActivitiesIncomeButtonIsChecked: boolean =
          await hasOtherActivitiesIncomeButton.locator('input').isChecked();
        if (!hasOtherActivitiesIncomeButtonIsChecked) {
          await hasOtherActivitiesIncomeButton.click();
        }
        await otherActivitiesIncomeInput.fill(totalMonthlyIncomeFromOtherActivities.toString());
        if (totalMonthlyIncomeFromOtherActivitiesDescription === '') {
          throw new Error(
            'totalMonthlyIncomeFromOtherActivitiesDescription is Mandatory when totalMonthlyIncomeFromOtherActivities > 0.',
          );
        }
        await otherActivitiesIncomeTextarea.fill(totalMonthlyIncomeFromOtherActivitiesDescription);
      }

      // Marital or Patrimonial Partnership:

      const hadPartnershipButton = page.locator(
        'label[formcontrolname="tieneSociedadPatrimonial"]',
      );
      const hasSpouseButton = page.locator('label[formcontrolname="tieneConyugue"]');

      const spouse: SpouseType | undefined = debtor.spouse;
      const publicDeedOrJudgmentFilePath: string | undefined = debtor.publicDeedOrJudgmentFilePath;
      const assetsListFilePath: string | undefined = debtor.assetsListFilePath;
      const hadMaritalOrPatrimonialPartnership: boolean =
        spouse !== undefined ||
        publicDeedOrJudgmentFilePath !== undefined ||
        assetsListFilePath !== undefined;

      if (hadMaritalOrPatrimonialPartnership) {
        const hadPartnershipButtonIsChecked: boolean = await hadPartnershipButton
          .locator('input')
          .isChecked();
        if (!hadPartnershipButtonIsChecked) {
          await hadPartnershipButton.click();
        }
        if (spouse !== undefined) {
          const hasSpouseButtonIsChecked: boolean = await hasSpouseButton
            .locator('input')
            .isChecked();
          if (!hasSpouseButtonIsChecked) {
            await hasSpouseButton.click();
          }

          const spouseIdDoc: IdDocType = spouse.idDoc;
          const spouseIdTypeInput = page.locator(getInputSelector('conyugueTipoIdentificacion'));
          const spouseIdNumberInput = page.locator(
            'input[formcontrolname="conyugueIdentificacion"]',
          );
          const spouseFirstNameInput = page.locator('input[formcontrolname="conyugueNombre1"]');
          const spouseMiddleNameInput = page.locator('input[formcontrolname="conyugueNombre2"]');
          const spouseLastNameInput = page.locator('input[formcontrolname="conyugueApellido1"]');
          const spouseSecondLastNameInput = page.locator(
            'input[formcontrolname="conyugueApellido2"]',
          );
          const spouseMiddleName: string = spouse.middleName || '';
          const spouseSecondLastName: string = spouse.secondLastName || '';

          await this.selectOption(spouseIdTypeInput, spouseIdDoc.type);
          await spouseIdNumberInput.fill(spouseIdDoc.number);

          await spouseFirstNameInput.fill(spouse.firstName);
          if (spouseMiddleName !== '') {
            await spouseMiddleNameInput.fill(spouseMiddleName);
          }
          await spouseLastNameInput.fill(spouse.lastName);
          if (spouseSecondLastName !== '') {
            await spouseSecondLastNameInput.fill(spouseSecondLastName);
          }

          const addSpouseIdDocButton = page.locator('button', {
            hasText: 'ANEXAR DOCUMENTO DE IDENTIDAD DEL CÓNYUGE',
          });

          await addSpouseIdDocButton.click();
          await this.fileInput.setInputFiles(spouse.idDoc.filePath);
          await this.uploadFileButton.click();
        } else if (publicDeedOrJudgmentFilePath !== undefined || assetsListFilePath !== undefined) {
          // sociedadLiquidada
          const partnershipEndedButton = page.locator('label[formcontrolname="sociedadLiquidada"]');
          const endedWithinLastTwoYearsButton = page.locator(
            'label[formcontrolname="fechaLiquidacion"]',
          );
          const hasPartnershipEndedButtonIsChecked: boolean = await partnershipEndedButton
            .locator('input')
            .isChecked();
          if (!hasPartnershipEndedButtonIsChecked) {
            await partnershipEndedButton.click();
          }
          const hasEndedWithinLastTwoYearsButtonIsChecked: boolean =
            await endedWithinLastTwoYearsButton.locator('input').isChecked();
          if (!hasEndedWithinLastTwoYearsButtonIsChecked) {
            await endedWithinLastTwoYearsButton.click();
          }
          if (publicDeedOrJudgmentFilePath !== undefined) {
            const addPublicDeedOrJudgmentButton = page.locator('button', {
              hasText: 'ANEXAR ESCRITURA PÚBLICA O SENTENCIA',
            });
            await addPublicDeedOrJudgmentButton.click();
            await this.fileInput.setInputFiles(publicDeedOrJudgmentFilePath);
            await this.uploadFileButton.click();
          }
          if (assetsListFilePath !== undefined) {
            const addAssetsListButton = page.locator('button', {
              hasText: 'ANEXAR COPIA DE LA RELACIÓN DE BIENES',
            });
            await addAssetsListButton.click();
            await this.fileInput.setInputFiles(assetsListFilePath);
            await this.uploadFileButton.click();
          }
        }
      }

      // Study Data

      const schoolLevelInput: Locator = page.locator(getInputSelector('nivelEscolar'));
      await this.selectOption(schoolLevelInput, debtor.schoolLevel);

      // Profession Details

      const professionNameInput: Locator = page.locator(getInputSelector('nombreProfesion'));
      const institutionInput: Locator = page.locator(getInputSelector('institucion'));
      const professionalCardNumberInput: Locator = page.locator(
        'input[formcontrolname="tarjetaProfesional"]',
      );
      const degreeIssuingEntityInput: Locator = page.locator(
        'input[formcontrolname="entidadEmisoraTitulo"]',
      );
      const graduationDateInput: Locator = page.locator(getDateInputSelector('fechaGraduacion'));
      const addProfessionButton: Locator = page.locator('button', {
        hasText: 'AGREGAR PROFESIÓN',
      });
      const professions: ProfessionType[] = debtor.professions || [];

      for (const profession of professions) {
        await this.fillInput(professionNameInput, profession.name);
        await this.fillInput(institutionInput, profession.institution);
        await professionalCardNumberInput.fill(profession.professionalCardNumber.toString());
        await degreeIssuingEntityInput.fill(profession.degreeIssuingEntity);
        await this.fillDateInput(graduationDateInput, profession.graduationDate);
        await addProfessionButton.click();
        await page.waitForTimeout(500); // TODO: find a better way to wait for profession to be added.
      }

      const linkButton: Locator = page.locator('button', { hasText: 'Vincular' });
      await linkButton.click();
      await graduationDateInput.waitFor({ state: 'detached' });

      // TODO: Select postulant (when more than one debtor is in the application)
      // NOTE: Idk which one is the selected one when there is more than one debtor in the application.
      // NOTE: I suggest to select the first debtor of the array.

      // TODO: Add an option to add representatives to debtors
    }
    const nextButton = page.locator('button', { hasText: 'Siguiente' }); // TODO: Find a better way to get the locator.
    await nextButton.click();

    await this.addDebtorButton.waitFor({ state: 'detached' });
  }
}

export default DebtorSection;
