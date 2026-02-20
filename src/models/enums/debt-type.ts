import z from 'zod';
import { sentenceEnum } from '../utils/enums.js';

// TODO: May be better to put this into a json file.
// TODO: Find an easy way to update this list if in-page list changes.
const debts: [string, ...string[]] = [
  'Deudor',
  'Codeudor',
  'Avalista',
  'Fiador',
  // 'Otro', // A super type.
  'Desconozco esta información',
];

const DebtSchema = sentenceEnum(debts);
type DebtType = z.infer<typeof DebtSchema>;

export default DebtSchema;
export { DebtSchema };
export type { DebtType };
