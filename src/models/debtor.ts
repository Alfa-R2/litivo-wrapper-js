import { z } from 'zod';
import { ExIdDocSchema, type ExIdDocType } from './identification-document.js';
import { ProfessionSchema, type ProfessionType } from './profession.js';
import { SpouseSchema } from './spouse.js';

const PhoneSchema = z.string().min(1, 'Phone number is required');

// TODO: Create a debtor class to contain custom debtor logic.

const DebtorSchema = z.object({
  // === Identification Data === // NOTE: from originCountry to birthDate may be part of the idDoc as well.
  idDoc: ExIdDocSchema,
  // NOTE: This info can be found in in a excel file with "Formato de Radicación" in its name.
  originCountry: z.string().trim().min(1),
  firstName: z.string().trim().min(1),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1),
  secondLastName: z.string().trim().optional(),
  gender: z.string().trim().min(8), // TODO: "FEMENINO", "MASCULINO", "NO APLICA".
  // NOTE: civilStatus May appear in a excel file with "Formato de Radicación" in its name.
  civilStatus: z.string().trim().min(9).optional(), // TODO: "Casado(a)", "Soltero(a)", "No informa".
  birthDate: z.iso.date(), // TODO: Check if use ISO date or a Date object.
  // NOTE: Idk where to find this information.
  ethnicity: z.string().trim().min(4).optional(), // TODO: "Ninguna", "Indigena", "Afro", "Room".
  disability: z.string().trim().min(4).optional(), // TODO: "Ninguna", "Física", "Sensorial", "Intelectual", "Psíquica", "Visceral", "Múltiple", "Otra".

  // === Contact Information ===
  residenceCountry: z.string().trim().min(1), // Known fixed options
  department: z.string().trim().min(1), // Known fixed options
  city: z.string().trim().min(1), // Known fixed options
  // judicialNotificationAddress
  roadType: z.string().trim().min(1).optional(), // TODO: "Calle", "Carrera", "Avenida", "Avenida carrera", "Avenida calle", "Circular", "Circunvalar", "Diagonal", "Manzana", "Transversal", "Vía".
  roadName: z.string().trim().optional(),
  roadNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
  roadSubNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
  roadDetails: z.string().trim().trim().optional(), // TODO: Examples: "apto", "casa", "referencia".
  roadStratum: z.string().trim().min(1).optional(), // TODO: "ESTRATO 1", "ESTRATO 2", ..., "ESTRATO 6", "NO INFORMA".

  telephones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
  cellphones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
  emailsOrReason: z.union([z.array(z.email()).min(1).max(3), z.string().trim().min(1)]),
  webPages: z.array(z.url()).max(3).optional(),
  // Natural person type
  isMerchant: z.boolean(),
  hasMultipleDebtCollectionProcedures: z.boolean(), // ¿En contra de usted se han iniciado dos (2) o más procedimientos públicos o privados de cobro de obligaciones dinerarias, de ejecución especial o de restitución de bienes por mora en el pago de cánones?

  // Employment Data
  economicActivity: z.string().trim().min(11), // TODO: "Empleo Formal", "Empleo Informal", "Trabajador Independiente", "Desempleado".
  economicActivityDescription: z.string().trim().min(1),

  totalMonthlyIncome: z.number().nonnegative().optional(), // Employment income in COP
  employmentOrIncomeCertificationFilePath: z.string().min(1).optional(),

  totalMonthlyIncomeFromOtherActivities: z.number().nonnegative().optional(), // Other activities income in COP
  totalMonthlyIncomeFromOtherActivitiesDescription: z.string().trim().min(1).optional(), // TODO: Mandatory if totalMonthlyIncomeFromOtherActivities is truthy.

  // Marital or Patrimonial Partnership:

  spouse: SpouseSchema.optional(), // TODO: If set, publicDeedOrJudgmentFilePath and assetsListFilePath will be ignore.
  // NOTE: Partnership Dissolved Within Last Two Years
  // Copia de la escritura pública o de la sentencia por medio de la cual esta se haya liquidado, o de la sentencia que haya declarado la separación de bienes:
  //  ANEXAR ESCRITURA PÚBLICA O SENTENCIA
  publicDeedOrJudgmentFilePath: z.string().trim().min(1).optional(), // . TODO: Has to exist or has to be bytes. OR JUDGMENT.
  // Relación de bienes con el valor comercial estimado que fueron objeto de entrega:
  //  ANEXAR COPIA DE LA RELACIÓN DE BIENES
  assetsListFilePath: z.string().trim().min(1).optional(), // TODO: Has to exist or has to be bytes.

  // Study Data

  schoolLevel: z.string().trim().min(10), // TODO: "DOCTORADO O EQUIVALENTE", "EDUCACIÓN BÁSICA PRIMARIA", "EDUCACIÓN BÁSICA SECUNDARIA O SECUNDARIA BAJA", "EDUCACIÓN DE LA PRIMERA INFANCIA", "EDUCACIÓN MEDIA O SECUNDARIA ALTA", "EDUCACIÓN POSTSECUNDARIA NO SUPERIOR", "EDUCACIÓN TÉCNICA PROFESIONAL Y TECNOLÓGICA", "ESPECIALIZACIÓN, MAESTRÍA O EQUIVALENTE", "NINGUNA", "NO INFORMA", "UNIVERSITARIO O EQUIVALENTE".

  // Profession Details

  professions: z.array(ProfessionSchema).optional(), // TODO: Check if there are a limit.

  // TODO: Add representatives, an optional array of RepresentativeSchema.
});

type DebtorType = z.infer<typeof DebtorSchema>;

export { DebtorSchema, ExIdDocSchema, ProfessionSchema };
export type { DebtorType, ExIdDocType, ProfessionType };
