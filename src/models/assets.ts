import z from 'zod';
import { JudicialNotificationAddressRequiredSchema } from './base.js';

const ClasificationEnum = z.enum([
  'Equipos Electrónicos',
  'Joyas',
  'Obras de Arte',
  'Artículos de Recreación',
  'Accesorios',
  'Prendas de Vestir',
  'Semovientes',
  'Muebles y Enseres',
  'Otros',
]);

const AssetBaseSchema = z.object({
  description: z.string().trim().min(1),
  marca: z.string().trim().min(1),
  estimatedValue: z.number().nonnegative(),
});

const AssetVehicularSchema = AssetBaseSchema.extend({
  type: z.literal('Vehícular'),
  model: z.string().trim().min(1),
  placa: z.string().trim().min(1),
  ownershipCardFilePath: z.string().trim().min(1), // TODO: check if mandatory
});

const AssetOtrosMueblesSchema = AssetBaseSchema.extend({
  type: z.literal('Otros muebles'),
  clasification: ClasificationEnum,
});

const AssetMuebleSchema = z.union([AssetVehicularSchema, AssetOtrosMueblesSchema]);

const AssetInmuebleSchema = z.object({
  description: z.string().trim().min(1),
  matricula_inmobiliaria: z.string().trim().min(1),
  country: z.string().trim().min(1),
  judicialNotificationAddress: JudicialNotificationAddressRequiredSchema,
  estimatedValue: z.number().nonnegative(),
  participationPercentage: z.number().min(0).max(100), // TODO: check if "tarjeta de propiedad" is needed.
});

const AssetsSchema = z.array(z.union([AssetMuebleSchema, AssetInmuebleSchema]));

type AssetVehicularType = z.infer<typeof AssetVehicularSchema>;
type AssetOtrosMueblesType = z.infer<typeof AssetOtrosMueblesSchema>;
type AssetInmuebleType = z.infer<typeof AssetInmuebleSchema>;
type AssetsType = z.infer<typeof AssetsSchema>;

export { AssetInmuebleSchema, AssetOtrosMueblesSchema, AssetsSchema, AssetVehicularSchema };
export type { AssetInmuebleType, AssetOtrosMueblesType, AssetsType, AssetVehicularType };
