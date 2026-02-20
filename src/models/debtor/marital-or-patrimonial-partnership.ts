import z from 'zod';
import ExSpouseSchema from './ex-spouse.js';
import SpouseSchema from './spouse.js';

const MaritalOrPatrimonialPartnershipSchema = z.union([
  SpouseSchema, // NOTE: having spouse means that "¿Tiene sociedad conyugal o patrimonial vigente?" is true
  ExSpouseSchema,
]);

export default MaritalOrPatrimonialPartnershipSchema;
