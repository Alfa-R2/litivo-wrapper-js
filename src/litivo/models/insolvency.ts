import { z } from 'zod';
import { SiteSchema, type SiteType } from './site.js';

const InsolvencySchema = z.object({
  site: SiteSchema,
});

type InsolvencyType = z.infer<typeof InsolvencySchema>;

export { InsolvencySchema };
export type { InsolvencyType, SiteType };
