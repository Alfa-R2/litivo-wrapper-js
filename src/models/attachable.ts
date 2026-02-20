import { z } from 'zod';

const AttachableSchema = z.object({
  filePath: z.string().trim().min(1).optional(), // TODO: If given, filePath must be a valid path to a file.
});

type AttachableType = z.infer<typeof AttachableSchema>;

export { AttachableSchema };
export type { AttachableType };
