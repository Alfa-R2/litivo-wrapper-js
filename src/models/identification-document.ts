import { z } from 'zod';

const IdentificationDocumentSchema = z.object({
  type: z.string().trim().min(1), // TODO: "CÉDULA DE CIUDADANÍA", "CÉDULA DE EXTRANJERÍA", "NÚMERO DE IDENTIFICACIÓN DE EXTRANJERO", "PASAPORTE", "REGISTRO CIVIL", "TARJETA DE IDENTIDAD".
  number: z.string().trim().min(1), // TODO: Make number.
  filePath: z.string().trim().min(1), // TODO: Has to exist or has to be bytes.
});

type IdentificationDocumentType = z.infer<typeof IdentificationDocumentSchema>;

const IdDocSchema = IdentificationDocumentSchema;
type IdDocType = IdentificationDocumentType;

const ExtendedIdentificationDocumentSchema = IdentificationDocumentSchema.extend({
  issueCity: z.string().trim().min(1),
});

type ExtendedIdentificationDocumentType = z.infer<typeof ExtendedIdentificationDocumentSchema>;

const ExIdDocSchema = ExtendedIdentificationDocumentSchema;
type ExIdDocType = ExtendedIdentificationDocumentType;

export { ExIdDocSchema, IdDocSchema };
export type { ExIdDocType, IdDocType };
