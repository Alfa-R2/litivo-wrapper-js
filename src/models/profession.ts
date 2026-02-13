import { z } from 'zod';

const ProfessionSchema = z.object({
  name: z.string().trim().min(1), // There is a lot of known fixed options like "ABARROTERO", "ABOGADO", etc. TODO: List them all
  institution: z.string().trim().min(1), // There is a lot of known fixed options like "CENTRO DE EDUCACION MILITAR - CEMIL", "CENTRO EDUCACIONAL DE COMPUTOS Y SISTEMAS-CEDESISTEMAS-", etc. TODO: List them all
  professionalCardNumber: z.number().int().nonnegative(),
  degreeIssuingEntity: z.string().trim().min(1),
  graduationDate: z.iso.date(),
});

type ProfessionType = z.infer<typeof ProfessionSchema>;

export { ProfessionSchema, type ProfessionType };
