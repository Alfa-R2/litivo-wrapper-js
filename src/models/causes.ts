import z from 'zod';

const CauseSchema = z.object({
  // "Calamidad familiar", "Incapacidad física o mental", "Pérdida de empleo"
  // "Divorcio o separación", "Inadecuados hábitos financieros", "Otros".
  type: z.string().min(1),
  description: z.string().min(1), // Free text
});

const CausesSchema = z.object({
  department: z.string().min(1), // Known fixed options
  city: z.string().min(1), // Known fixed options
  causes: z.array(CauseSchema).min(1),
});
type CausesType = z.infer<typeof CausesSchema>;

export default CausesSchema;
export { CausesSchema };
export type { CausesType };
