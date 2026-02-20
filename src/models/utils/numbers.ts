import z from 'zod';

const NonNegativeIntegerSchema = z.number().int().nonnegative();
type NonNegativeIntegerType = z.infer<typeof NonNegativeIntegerSchema>;

export { NonNegativeIntegerSchema };
export type { NonNegativeIntegerType };
