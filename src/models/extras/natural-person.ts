import z from 'zod';
import { sentenceEnum, uppercaseEnum } from '../utils/enums.js';

const GenderSchema = uppercaseEnum(['FEMENINO', 'MASCULINO', 'NO APLICA']);
type GenderType = z.infer<typeof GenderSchema>;

const CivilStatusSchema = sentenceEnum(['Casado(a)', 'Soltero(a)', 'No informa']);
type CivilStatusType = z.infer<typeof CivilStatusSchema>;

const EtnicitySchema = sentenceEnum(['Ninguna', 'Indigena', 'Afro', 'Room']);
type EtnicityType = z.infer<typeof EtnicitySchema>;

export { CivilStatusSchema, EtnicitySchema, GenderSchema };
export type { CivilStatusType, EtnicityType, GenderType };
