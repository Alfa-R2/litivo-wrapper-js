import z from 'zod';
import CausesSchema from './causes.js';
import { CreditorsSchema } from './creditor.js';
import DebtorSchema from './debtor.js';
import SiteSchema from './site.js';

// TODO: Add progressively the needed validations.
// TODO: Add strict validations after completing the form. this is due to time constraints.

const InsolvencySchema = z.object({
  site: SiteSchema,
  debtor: DebtorSchema,
  causes: CausesSchema,
  creditors: CreditorsSchema,
  assets: z.unknown(),
  jaopp: z.unknown(),
  childSupportObligations: z.unknown(),
  availableResources: z.unknown(),
  debtNegotiation: z.unknown(),
  attachedDocuments: z.unknown(),
  applicationSubmission: z.unknown(),
});

type InsolvencyType = z.infer<typeof InsolvencySchema>;

export default InsolvencySchema;
export { InsolvencySchema };
export type { InsolvencyType };
