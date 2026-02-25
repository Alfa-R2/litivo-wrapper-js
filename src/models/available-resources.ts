import z from "zod";

const AvailableResourceSchema = z.object({
    name: z.string().trim().min(1),
    amount: z.number().nonnegative(),
});

const AvailableResourceDefinedSchema = AvailableResourceSchema.extend({
    name: z.enum([
        "Cuota De Leasing Habitacional",
        "Arriendo Oficina/consultorio",
        "Arriendo Vivienda",
        "Cuota De Seguridad Social",
        "Cuota De Administración Propiedad Horintozal",
        "Cuota De Leasing Vehículo",
        "Cuota De Leasing Oficina/consultorio",
        "Alimentación",
        "Colegios",
        "Salud",
        "Seguros",
        "Vestuario",
        "Recreación",
        "Gastos Para La Subsistencia De Las Personas A Su Cargo",
        "Gastos Para La Conservación De Los Bienes"
    ]),
});

const AvailableResourcesSchema = z.array(z.union([AvailableResourceSchema, AvailableResourceDefinedSchema]));
type AvailableResourceBaseType = z.infer<typeof AvailableResourceSchema>;
type AvailableResourceType = z.infer<typeof AvailableResourceSchema>;

export { AvailableResourcesSchema };
export type { AvailableResourceBaseType, AvailableResourceType };

