import z from 'zod';
import { AttachableSchema } from '../attachable.js';
import { NaturalPersonIdDocumentSchema } from '../enums/natural-person-id-documents.js';
import { PersonNamePartsSchema } from '../person-name-parts.js';
import { NonNegativeIntegerSchema } from '../utils/numbers.js';

const SpouseIdDocSchema = AttachableSchema.extend({
  type: NaturalPersonIdDocumentSchema,
  number: NonNegativeIntegerSchema,
});

const SpouseSchema = PersonNamePartsSchema.extend({
  idDoc: SpouseIdDocSchema,
});
type SpouseType = z.infer<typeof SpouseSchema>;

export default SpouseSchema;
export { SpouseSchema };
export type { SpouseType };
