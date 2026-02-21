import z from 'zod';

const DebtNegotiationSchema = z.object({
  installments: z.number().int().min(1),
});
type DebtNegotiationType = z.infer<typeof DebtNegotiationSchema>;

export default DebtNegotiationSchema;
export { DebtNegotiationSchema };
export type { DebtNegotiationType };
