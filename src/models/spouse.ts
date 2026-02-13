import { z } from 'zod';
import { IdDocSchema, type IdDocType } from './identification-document.js';

const SpouseSchema = z.object({
  idDoc: IdDocSchema,
  firstName: z.string().trim().min(1),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1),
  secondLastName: z.string().trim().optional(),
});

type SpouseType = z.infer<typeof SpouseSchema>;

export { IdDocSchema, SpouseSchema };
export type { IdDocType, SpouseType };
