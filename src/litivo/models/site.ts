import { z } from 'zod';

const SiteSchema = z.object({
  department: z.string().min(1),
  city: z.string().min(1),
  sponsorEntity: z.string().min(1),
  branchCenter: z.string().min(1), // branch / center.
});

type SiteType = z.infer<typeof SiteSchema>;

export { SiteSchema, type SiteType };
