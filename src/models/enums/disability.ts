import z from 'zod';
import { sentenceEnum } from '../utils/enums.js';

const DisabilitySchema = sentenceEnum([
  'Ninguna',
  'Fisica', // NOTE: También conocida como discapacidad motora que le impide su movilidad funcional  y habitual.
  'Sensorial', // NOTE: Hace relación a la existencia de limitaciones producidas por deficiencias en alguno de los sentidos, especialmente el visual y auditivo.
  'Intelectual', // NOTE: Es la limitación que impide la participación social natural del ser humano o el desarrollo de la autonomía en los espacios académicos o el laborales.
  'Psiquica', // NOTE: Altera el tipo conductual y el comportamiento adaptativo producidas por un tipo de trastorno mental.
  'Visceral', // NOTE: Afecta a alguno de los órganos y genera limitaciones en la vida y a la participación en comunidad de la persona que lo sufre. Es el caso de las que pueden generar la diabetes o los problemas cardíacos.
  'Multiple', // NOTE: Se produce por la combinación de varias limitaciones.
  'Otra', // NOTE: Otra.
]);
type DisabilityType = z.infer<typeof DisabilitySchema>;

export { DisabilitySchema };
export type { DisabilityType };
