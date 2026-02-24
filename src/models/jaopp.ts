import z from "zod";
import { JudicialNotificationAddressRequiredSchema } from "./base.js";



const processTypeEnum = z.enum([
    "PROCESO COBRO DE OBLIGACIONES DINERARIAS",
    "PROCESO DE JURISDICCIÓN COACTIVA",
    "PROCESO EJECUCIÓN ESPECIAL",
    "PROCESO EJECUTIVO",
    "PROCESO RESTITUCIÓN DE BIENES POR MORA EN EL PAGO DE LOS CÁNONES",
]);


const JaoppBaseSchema = z.object({
    inFavor: z.boolean(),
    department: z.string().trim().min(1),
    city: z.string().trim().min(1),
    judicialNotificationAddress: JudicialNotificationAddressRequiredSchema,
    email: z.string().min(1),
    creditorName: z.array(z.string().trim().min(1)).min(1),
    value: z.number().nonnegative(),
});

const JaoppJudicialSchema = JaoppBaseSchema.extend({
    jaoppType: z.literal("Judicial"),
    processType: z.enum([
        ...processTypeEnum.options,
        "PROCESO DECLARATIVO",
        "PROCESO DE FAMILIA",
        "PROCESO DE JURISDICCIÓN VOLUNTARIA",
        "PROCESO DE LIQUIDACIÓN",
        "PROCESO DE TIPO LABORAL",
        "PROCESO DE TIPO PENAL",
        "PROCESO EJECUTIVO DE ALIMENTOS",
    ]),
    court: z.string().trim().min(1),
    radicationNumber: z.string().trim().min(1),
    processStatus: z.enum(["Admitido", "Con Sentencia", "En Ejecución"]),
});

const JaoppPrivadoSchema = JaoppBaseSchema.extend({
    jaoppType: z.literal("Privado"),
    processType: processTypeEnum,
    entityName: z.string().trim().min(1),
});

const JaoppAdministrativoSchema = JaoppBaseSchema.extend({
    jaoppType: z.literal("Administrativo"),
    processType: processTypeEnum,
    entityName: z.string().trim().min(1),
});

const JaoppSchema = z.array(
    z.union([JaoppJudicialSchema, JaoppPrivadoSchema, JaoppAdministrativoSchema])
);

type JaoppType = z.infer<typeof JaoppSchema>;

export { JaoppSchema };
export type { JaoppType };










































































