import { z } from 'zod';

const PhoneSchema = z.string().min(1, 'Phone number is required');

type PhoneType = z.infer<typeof PhoneSchema>;

export { PhoneSchema };
export type { PhoneType };
