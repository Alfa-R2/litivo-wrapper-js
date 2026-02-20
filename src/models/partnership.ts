import { z } from 'zod';
import SpouseSchema from './debtor/spouse.js';
import { NonEmptyTrimmedStringSchema } from './utils/strings.js';

// TODO: Check how to mark this without adding any document file path.
const OptionalDocumentsSchema = z
  .object({
    publicDeedOrJudgmentFilePath: NonEmptyTrimmedStringSchema.optional(),
    assetsListFilePath: NonEmptyTrimmedStringSchema.optional(),
  })
  .refine(
    (data) => data.publicDeedOrJudgmentFilePath || data.assetsListFilePath,
    'At least one document must be provided if spouse is not present.',
  );

const PartnershipSectionSchema = z.union([SpouseSchema, OptionalDocumentsSchema]).optional();

export default PartnershipSectionSchema;
