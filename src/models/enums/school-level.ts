import z from 'zod';
import { uppercaseEnum } from '../utils/enums.js';

// TODO: May be better to put this into a json file.
// TODO: Find an easy way to update this list if in-page list changes.
const schoolLevels: [string, ...string[]] = [
  'EDUCACIÓN DE LA PRIMERA INFANCIA',
  'EDUCACIÓN BÁSICA PRIMARIA',
  'EDUCACIÓN BÁSICA SECUNDARIA O SECUNDARIA BAJA',
  'EDUCACIÓN MEDIA O SECUNDARIA ALTA',
  'EDUCACIÓN POSTSECUNDARIA NO SUPERIOR',
  'EDUCACIÓN TÉCNICA PROFESIONAL Y TECNOLÓGICA',
  'UNIVERSITARIO O EQUIVALENTE',
  'ESPECIALIZACIÓN, MAESTRÍA O EQUIVALENTE',
  'DOCTORADO O EQUIVALENTE',
  'NO INFORMA',
  'NINGUNA',
];

const SchoolLevelSchema = uppercaseEnum(schoolLevels);
type SchoolLevelType = z.infer<typeof SchoolLevelSchema>;

export default SchoolLevelSchema;
export { SchoolLevelSchema };
export type { SchoolLevelType };
