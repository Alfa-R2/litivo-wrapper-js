import { z } from 'zod';

const SiteSchema = z.object({
  department: z.string().min(1), // TODO: Enum (Known fixed options)
  city: z.string().min(1), // TODO: Enum (Known fixed options)
  sponsorEntity: z.string().min(1), // // TODO: Enum (Unknown fixed options)
  branchCenter: z.string().min(1), // branch / center. TODO: Enum (Unknown fixed options)
});

type SiteType = z.infer<typeof SiteSchema>;

export default SiteSchema;
export { SiteSchema };
export type { SiteType };
