import { z } from 'zod';
import MaritalOrPatrimonialPartnershipSchema from './debtor/marital-or-patrimonial-partnership.js';
import SchoolLevelSchema from './enums/school-level.js';
import { NaturalPersonIdDataSchema } from './natural-person.js';
import { PhoneSchema } from './phone.js';
import { ProfessionSchema } from './profession.js';
// TODO: Create a debtor class to contain custom debtor logic.

const DebtorSchema = z.object({
  identificationData: NaturalPersonIdDataSchema,

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

  maritalOrPatrimonialPartnership: MaritalOrPatrimonialPartnershipSchema.optional(),

  // Study Data
  schoolLevel: SchoolLevelSchema,

  // Profession Details
  professions: z.array(ProfessionSchema).optional(), // TODO: Check if there are a limit.

  // TODO: Add representatives, an optional array of RepresentativeSchema.
});

type DebtorType = z.infer<typeof DebtorSchema>;

export default DebtorSchema;
export { DebtorSchema };
export type { DebtorType };
