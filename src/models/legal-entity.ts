import z from 'zod';
import { AttachableSchema } from './attachable.js';
import { CountrySchema } from './enums/country.js';
import { EconomicSectorSchema } from './enums/economic-sector.js';
import { OrganizationSchema } from './extras/legal-entity.js';
import { DocumentNumberSchema, NonEmptyTrimmedStringSchema } from './utils/strings.js';

/** attachable: Existence and legal representation certificate. */
const LegalEntityIdentificationDataSchema = AttachableSchema.extend({
  nit: DocumentNumberSchema, // min length 2, only digits, but can start with + or - TODO: Check because the 2 inputs are diff
  name: NonEmptyTrimmedStringSchema,
  economicSector: EconomicSectorSchema,
  organizationType: OrganizationSchema,
  originCountry: CountrySchema,
});

const LegalEntitySchema = z.object({
  identificationData: LegalEntityIdentificationDataSchema,
});

type LegalEntityType = z.infer<typeof LegalEntitySchema>;

export default LegalEntitySchema;
export { LegalEntitySchema };
export type { LegalEntityType };
