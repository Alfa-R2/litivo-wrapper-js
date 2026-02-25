import z from 'zod';
import { NaturalPersonIdDocumentSchema } from './enums/natural-person-id-documents.js';

const IdentificationDocumentBaseSchema = z.object({
    type: NaturalPersonIdDocumentSchema,
    value: z.string().trim().min(1),
    issueCity: z.string().trim().min(1).optional(),
});

const IdentificationDocumentSchema = IdentificationDocumentBaseSchema.superRefine((data, ctx) => {
    if (
      data.type === 'CÉDULA DE CIUDADANÍA' &&
      (!data.issueCity || data.issueCity.trim().length === 0)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['issueCity'],
        message: 'issueCity is required for CÉDULA DE CIUDADANÍA',
      });
    }
  });

type IdentificationDocumentType = z.infer<typeof IdentificationDocumentSchema>;

const IdDocSchema = IdentificationDocumentSchema;
type IdDocType = IdentificationDocumentType;

export { IdDocSchema, IdentificationDocumentBaseSchema };
export type { IdDocType };

