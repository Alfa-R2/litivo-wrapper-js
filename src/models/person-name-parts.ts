import z from 'zod';
import { NonEmptyTrimmedStringSchema, TrimmedStringSchema } from './utils/strings.js';

const PersonNamePartsSchema = z.object({
  firstName: NonEmptyTrimmedStringSchema,
  middleName: TrimmedStringSchema.optional(),
  lastName: NonEmptyTrimmedStringSchema,
  secondLastName: TrimmedStringSchema.optional(),
});
type PersonNamePartsType = z.infer<typeof PersonNamePartsSchema>;

export { PersonNamePartsSchema };
export type { PersonNamePartsType };
