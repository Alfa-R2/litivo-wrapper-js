import z from 'zod';
import { ContactInformationSchema, IdenticationDataSchema } from './base.js';
import { CountrySchema } from './enums/country.js';
import CreditNatureSchema from './enums/credit-nature.js';
import DebtSchema from './enums/debt-type.js';
import SchoolLevelSchema from './enums/school-level.js';
import LegalEntitySchema from './legal-entity.js';
import { PhoneSchema } from './phone.js';
import ProfessionSchema from './profession.js';
import { NonEmptyTrimmedStringSchema, TrimmedStringSchema } from './utils/strings.js';

const CreditSchema = z.object({
  debtType: z.union([DebtSchema, NonEmptyTrimmedStringSchema]),
  creditNature: CreditNatureSchema,
  capital: z.number().nonnegative(),
  creditExpirationDateOrDaysPastDue: z
    .union([z.iso.date(), z.number().int().nonnegative()])
    .optional(),
});

const BaseCreditorSchema = z.object({
  contactInformation: ContactInformationSchema,
  credits: z.array(CreditSchema).min(1),
});

const NaturalPersonCreditorSchema = BaseCreditorSchema.extend({
  identificationData: IdenticationDataSchema,
  schoolLevel: SchoolLevelSchema,
  professions: z.array(ProfessionSchema).optional(), // TODO: Check if there are a limit.
});
type NaturalPersonCreditorType = z.infer<typeof NaturalPersonCreditorSchema>;

const LegalEntityContactInformationSchema = z
  .object({
    residenceCountry: CountrySchema,
    department: NonEmptyTrimmedStringSchema, // Known fixed options
    city: NonEmptyTrimmedStringSchema, // Known fixed options
    judicialNotificationAddress: NonEmptyTrimmedStringSchema.optional(),
    unknownJudicialNotificationAddressReason: NonEmptyTrimmedStringSchema.optional(),
    telephones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
    cellphones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
    emailsOrReason: z.union([z.array(z.email()).max(3), TrimmedStringSchema]).optional(),
    webPages: z.array(z.url()).max(3).optional(),
  })
  .refine(
    (data) => {
      const hasAddress = !!data.judicialNotificationAddress?.trim();
      const hasReason = !!data.unknownJudicialNotificationAddressReason?.trim();
      return !(hasAddress && hasReason);
    },
    { message: 'You cannot provide both address and reason.' },
  );

const LegalEntityCreditorSchema = LegalEntitySchema.extend({
  contactInformation: LegalEntityContactInformationSchema,
  credits: z.array(CreditSchema).min(1),
});
type LegalEntityCreditorSchemaType = z.infer<typeof LegalEntityCreditorSchema>;

const CreditorSchema = z.union([NaturalPersonCreditorSchema, LegalEntityCreditorSchema]);
type CreditorType = z.infer<typeof CreditorSchema>;

const CreditorsSchema = z
  .array(CreditorSchema)
  .min(2)
  .refine(
    (creditors) => {
      const now = new Date();

      const qualifyingCreditors = creditors.filter((creditor) =>
        creditor.credits?.some((credit) => {
          const value = credit.creditExpirationDateOrDaysPastDue;

          if (typeof value === 'number') {
            return value > 90;
          }

          if (typeof value === 'string') {
            const expirationDate = new Date(value);
            const diffMs = now.getTime() - expirationDate.getTime();
            const diffDays = diffMs / (1000 * 60 * 60 * 24);

            return diffDays > 90;
          }

          return false;
        }),
      );

      return qualifyingCreditors.length >= 2;
    },
    {
      message:
        'At least two distinct creditors must each have at least one credit with more than 90 days past due.',
    },
  );
type CreditorsType = z.infer<typeof CreditorsSchema>;

export default CreditorSchema;
export { CreditorSchema, CreditorsSchema, LegalEntityCreditorSchema, NaturalPersonCreditorSchema };
export type {
  CreditorsType,
  CreditorType,
  LegalEntityCreditorSchemaType,
  NaturalPersonCreditorType,
};
