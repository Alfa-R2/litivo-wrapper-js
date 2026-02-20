import z from 'zod';

const NonEmptyTrimmedStringSchema = z.string().trim().min(1);
type NonEmptyTrimmedStringType = z.infer<typeof NonEmptyTrimmedStringSchema>;

const TrimmedStringSchema = z.string().trim();
type TrimmedStringType = z.infer<typeof TrimmedStringSchema>;

const DocumentNumberSchema = z
  .string()
  .trim()
  .min(2, 'Document number must be at least 2 characters long.')
  .regex(/^[+-]?\d+$/, "Document number must contain only digits and may start with '+' or '-'.");
type DocumentNumberType = z.infer<typeof DocumentNumberSchema>;

export { DocumentNumberSchema, NonEmptyTrimmedStringSchema, TrimmedStringSchema };
export type { DocumentNumberType, NonEmptyTrimmedStringType, TrimmedStringType };
