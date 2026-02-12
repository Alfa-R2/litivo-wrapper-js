import { z } from 'zod';

const IdentificationDocumentSchema = z.object({
  type: z.string().trim().min(1), // Known fixed options.
  number: z.string().trim().min(1), // TODO: Make number.
  issueCity: z.string().trim().min(1),
  filePath: z.string().trim().min(1), // TODO: Has to exist or has to be bytes.
});

type IdentificationDocumentType = z.infer<typeof IdentificationDocumentSchema>;

const IdDocSchema = IdentificationDocumentSchema;
type IdDocType = IdentificationDocumentType;

export { IdDocSchema, type IdDocType };
