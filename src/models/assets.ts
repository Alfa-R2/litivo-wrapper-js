import z from "zod";
import { JudicialNotificationAddressSchema } from "./base.js";

const ClasificationEnum = z.enum([
    "Equipos Electrónicos",
    "Joyas",
    "Obras de Arte",
    "Artículos de Recreación",
    "Accesorios",
    "Prendas de Vestir",
    "Semovientes",
    "Muebles y Enseres",
    "Otros"
]);

const AssetSchema = z.object({
    description: z.string().trim().min(1),
    marca: z.string().trim().min(1),
    estimatedValue: z.number().nonnegative(),
});


const AssetVehicularSchema = AssetSchema.extend({
    type: z.literal("Vehícular"),
    model: z.string().trim().min(1),
    placa: z.string().trim().min(1),
    ownershipCardFilePath: z.string().trim().min(1) //Consultar si es obligatorio
});

const AssetOtrosMueblesSchema = AssetSchema.extend({
    type: z.literal("Otros muebles"),
    clasification: ClasificationEnum,
});

const AssetInmuebleSchema = z.object({
    description: z.string().trim().min(1),
    matricula_inmobiliaria: z.string().trim().min(1),
    country: z.string().trim().min(1),
    judicialNotificationAddress: JudicialNotificationAddressSchema,
    estimatedValue: z.number().nonnegative(),
    participationPercentage: z.number().min(0).max(100) //Consultar si es obligatorio agregar tarjeta de propiedad

});

type AssetVehicularType = z.infer<typeof AssetVehicularSchema>;
type AssetOtrosMueblesType = z.infer<typeof AssetOtrosMueblesSchema>;
type AssetInmuebleType = z.infer<typeof AssetInmuebleSchema>;

export { AssetInmuebleSchema, AssetOtrosMueblesSchema, AssetVehicularSchema };
export type { AssetInmuebleType, AssetOtrosMueblesType, AssetVehicularType };

