import z from 'zod';
import { CountrySchema } from './enums/country.js';
import RoadSchema from './enums/road.js';
import { NaturalPersonIdDataExtrasSchema } from './natural-person.js';
import { PersonNamePartsSchema } from './person-name-parts.js';
import { PhoneSchema } from './phone.js';
import { NonEmptyTrimmedStringSchema } from './utils/strings.js';

const IdentificationDocumentSchema = z.object({
  type: NonEmptyTrimmedStringSchema, // Known fixed options.
  number: NonEmptyTrimmedStringSchema, // TODO: Make number.
});

const BaseJudicialNotificationAddressSchema = z.object({
  roadType: RoadSchema.optional(),
  roadName: z.string().trim().optional(),
  roadNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
  roadSubNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
  roadDetails: z.string().trim().trim().optional(), // TODO: Examples: "apto", "casa", "referencia".
});
const JudicialNotificationAddressSchema = z.object({
  addressOrReason: z
    .union([BaseJudicialNotificationAddressSchema, NonEmptyTrimmedStringSchema])
    .optional(),
  roadStratum: z.string().trim().min(1).optional(), // TODO: "ESTRATO 1", "ESTRATO 2", ..., "ESTRATO 6", "NO INFORMA".
});

const JudicialNotificationAddressRequiredSchema = z.object({
    roadType: RoadTypeEnum, 
    roadName: z.string().trim(),
    roadNumber: z.string().trim().min(1), 
    roadSubNumber: z.string().trim().min(1),
    roadDetails: z.string().trim().trim().optional(), // TODO: Examples: "apto", "casa", "referencia".
    roadStratum: z.string().trim().min(1).optional(), // TODO: "ESTRATO 1", "ESTRATO 2", ..., "ESTRATO 6", "NO INFORMA".
});

const ContactInformationSchema = z.object({
  residenceCountry: CountrySchema,
  department: NonEmptyTrimmedStringSchema, // Known fixed options
  city: NonEmptyTrimmedStringSchema, // Known fixed options
  judicialNotificationAddress: JudicialNotificationAddressSchema.optional(),
  telephones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
  cellphones: z.array(PhoneSchema).max(3).optional(), // NOTE: Idk phone structure.
  emailsOrReason: z.union([z.array(z.email()).min(1).max(3), NonEmptyTrimmedStringSchema]),
  webPages: z.array(z.url()).max(3).optional(),
});

const IdenticationDataSchema = PersonNamePartsSchema.extend(
  NaturalPersonIdDataExtrasSchema.shape,
).extend({
  idDoc: IdentificationDocumentSchema.optional(),
});

type IdenticationDataType = z.infer<typeof IdenticationDataSchema>;
type ContactInformationType = z.infer<typeof ContactInformationSchema>;

export { ContactInformationSchema, IdenticationDataSchema, JudicialNotificationAddressRequiredSchema, JudicialNotificationAddressSchema };
export type { ContactInformationType, IdenticationDataType };
