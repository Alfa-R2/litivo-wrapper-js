import z from 'zod';
import { uppercaseEnum } from '../utils/enums.js';

const OrganizationSchema = uppercaseEnum(['ORGANIZACIÓN PRIVADA', 'ORGANIZACIÓN PÚBLICA']);
type OrganizationType = z.infer<typeof OrganizationSchema>;

export { OrganizationSchema };
export type { OrganizationType };
