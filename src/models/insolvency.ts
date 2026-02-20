import { z } from 'zod';
import { CausesSchema } from './causes.js';

import { AssetsSchema } from './assets.js';
import { CreditorJuridicaSchema, CreditorNaturalSchema } from './creditor.js';
import type { DebtorType, ExIdDocType, ProfessionType } from './debtor.js';
import { DebtorSchema, ExIdDocSchema, ProfessionSchema } from './debtor.js';
import { SiteSchema, type SiteType } from './site.js';

// TODO: Add progressively the needed validations.
// TODO: Add strict validations after completing the form. this is due to time constraints.

const InsolvencySchema = z.object({
  site: SiteSchema,
  debtors: z.array(DebtorSchema).min(1), // Idk the maximum number of debtors. TODO: Investigate if .min(1) and .nonempty() is the same for this case. Check if asking for a tuple instead breaks something.
  causes: CausesSchema,
  creditors: z.array(z.union([CreditorNaturalSchema, CreditorJuridicaSchema])).min(2),
  assets: AssetsSchema.optional(), 
  jaopp: z.unknown(),
  childSupportObligations: z.unknown(),
  availableResources: z.unknown(),
  debtNegotiation: z.unknown(),
  attachedDocuments: z.unknown(),
  applicationSubmission: z.unknown(),
});

type InsolvencyType = z.infer<typeof InsolvencySchema>;

export { DebtorSchema, ExIdDocSchema, InsolvencySchema, ProfessionSchema, SiteSchema };
export type { DebtorType, ExIdDocType, InsolvencyType, ProfessionType, SiteType };

