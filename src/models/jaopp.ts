import z from 'zod';
import { JaoppAddressSchema } from './base.js';
const processTypeEnum = z.enum([
  'PROCESO COBRO DE OBLIGACIONES DINERARIAS',
  'PROCESO DE JURISDICCIÓN COACTIVA',
  'PROCESO EJECUCIÓN ESPECIAL',
  'PROCESO EJECUTIVO',
  'PROCESO RESTITUCIÓN DE BIENES POR MORA EN EL PAGO DE LOS CÁNONES',
]);

const JaoppBaseSchema = z
  .object({
    // Beneficiary information
    department: z.string().trim().min(1),
    city: z.string().trim().min(1),
    email: z.email(),
    plaintiffsAreCreditors: z.boolean().optional(), // NOTE: If true, all plaintiffs must be creditors, this is not checked by the schema.
    plaintiffs: z.array(z.string().trim().min(1)).min(1).optional(),
    defendant: z.string().trim().min(1).optional(),
    value: z.number().nonnegative(),
    // Unique field of the suport file section
    suportFile: z
      .object({
        name: z.string().trim().min(1),
        path: z.string().trim().min(1).optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.plaintiffsAreCreditors === true && data.plaintiffs === undefined) {
        return false;
      }
      return true;
    },
    {
      message: 'If plaintiffsAreCreditors is true, plaintiffs must be defined.',
    },
  )
  .refine(
    (data) => {
      if (data.defendant !== undefined && data.plaintiffs !== undefined) {
        return false;
      }
      if (data.defendant === undefined && data.plaintiffs === undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        'Just one of the following fields is required: Defendant required if in favor or plaintiffs if against. Cannot be both.',
    },
  );

const JaoppJudicialSchema = JaoppBaseSchema.extend({
  jaoppType: z.literal('Judicial'),
  processType: z.enum([
    ...processTypeEnum.options,
    'PROCESO DECLARATIVO',
    'PROCESO DE FAMILIA',
    'PROCESO DE JURISDICCIÓN VOLUNTARIA',
    'PROCESO DE LIQUIDACIÓN',
    'PROCESO DE TIPO LABORAL',
    'PROCESO DE TIPO PENAL',
    'PROCESO EJECUTIVO DE ALIMENTOS',
  ]),
  radicationNumber: z.string().trim().min(1),
  fullCourtNumberAndCourtType: z.string().trim().min(1), // NOTE: Input begins with "juez ".
  courtAddress: JaoppAddressSchema.optional(),
  processStatus: z.enum(['Admitido', 'Con Sentencia', 'En Ejecución']),
});

const JaoppPrivateSchema = JaoppBaseSchema.extend({
  jaoppType: z.literal('Privado'),
  processType: processTypeEnum,
  entityNameOrPersonInCharge: z.string().trim().min(1),
  description: z.string().trim().min(1).optional(),
  radicationNumber: z.string().trim().min(1).optional(),
  address: JaoppAddressSchema.optional(),
  processStatus: z.string().trim().min(1).optional(),
});

const JaoppAdministrativeSchema = JaoppBaseSchema.extend({
  jaoppType: z.literal('Administrativo'),
  processType: processTypeEnum,
  entityNameOrPersonInCharge: z.string().trim().min(1),
  description: z.string().trim().min(1).optional(),
  radicationNumber: z.string().trim().min(1).optional(),
  address: JaoppAddressSchema.optional(),
  processStatus: z.string().trim().min(1).optional(),
});

const JaoppSchema = z.array(
  z.union([JaoppJudicialSchema, JaoppPrivateSchema, JaoppAdministrativeSchema]),
);

type JaoppType = z.infer<typeof JaoppSchema>;
type JaoppAddressType = z.infer<typeof JaoppAddressSchema>;
export default JaoppSchema;
export { JaoppAdministrativeSchema, JaoppJudicialSchema, JaoppPrivateSchema, JaoppSchema };
export type { JaoppAddressType, JaoppType };
