
import z from 'zod';

const DebtNegotiationSchema = z.object({
  installments: z.number().int().min(1),
  startDate: z.iso.date().default(() => new Date().toISOString()),
});
type DebtNegotiationType = z.infer<typeof DebtNegotiationSchema>;

export default DebtNegotiationSchema;
export { DebtNegotiationSchema };
export type { DebtNegotiationType };

