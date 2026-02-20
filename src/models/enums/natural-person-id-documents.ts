import z from 'zod';
import { uppercaseEnum } from '../utils/enums.js';

// TODO: May be better to put this into a json file.
// TODO: Find an easy way to update this list if in-page list changes.
const naturalPersonIdDocuments: [string, ...string[]] = [
  'CÉDULA DE CIUDADANÍA', // TODO: If debtor, this is the unique number field, others are strings.
  'CÉDULA DE EXTRANJERÍA',
  'NÚMERO DE IDENTIFICACIÓN DE EXTRANJERO',
  'PASAPORTE', //  If creditor, this is the unique string field, others are number fields.
  'REGISTRO CIVIL',
  'TARJETA DE IDENTIDAD',
];

const NaturalPersonIdDocumentSchema = uppercaseEnum(naturalPersonIdDocuments);
type NaturalPersonIdDocumentType = z.infer<typeof NaturalPersonIdDocumentSchema>;

export { NaturalPersonIdDocumentSchema };
export type { NaturalPersonIdDocumentType };
