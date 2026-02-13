import { z } from 'zod';
const RoadTypeEnum = z.enum([
    "Calle", "Carrera", "Avenida", "Avenida carrera", "Avenida calle", "Circular", 
    "Circunvalar", "Diagonal", "Manzana", "Transversal", "Vía"
]);
const GenderEnum = z.enum(["FEMENINO", "MASCULINO", "NO APLICA"]);

const StudyDataEnum = z.enum([
    "EDUCACIÓN DE LA PRIMERA INFANCIA",
    "EDUCACIÓN BÁSICA PRIMARIA",
    "EDUCACIÓN BÁSICA SECUNDARIA O SECUNDARIA BAJA",
    "EDUCACIÓN MEDIA O SECUNDARIA ALTA",
    "EDUCACIÓN POSTSECUNDARIA NO SUPERIOR",
    "EDUCACIÓN TÉCNICA PROFESIONAL Y TECNOLÓGICA",
    "UNIVERSITARIO O EQUIVALENTE",
    "ESPECIALIZACIÓN, MAESTRÍA O EQUIVALENTE",
    "DOCTORADO O EQUIVALENTE",
    "NO INFORMA",
    "NINGUNA"
]);

const IdentificationDocumentSchema = z.object({
    type: z.string().trim().min(1), // Known fixed options.
    number: z.string().trim().min(1), // TODO: Make number.
});

const JudicialNotificationAddressSchema = z.object({
    roadType: RoadTypeEnum.optional(), 
    roadName: z.string().trim().optional(),
    roadNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
    roadSubNumber: z.string().trim().min(1).optional(), // Mandatory if roadType, roadName, roadDetail or roadStratum is present.
    roadDetails: z.string().trim().trim().optional(), // TODO: Examples: "apto", "casa", "referencia".
    roadStratum: z.string().trim().min(1).optional(), // TODO: "ESTRATO 1", "ESTRATO 2", ..., "ESTRATO 6", "NO INFORMA".
});

const ContactInformationSchema = z.object({
    residenceCountry: z.string().trim().min(1), // Known fixed options
    department: z.string().trim().min(1), // Known fixed options
    city: z.string().trim().min(1), // Known fixed options
    judicialNotificationAddress: JudicialNotificationAddressSchema.optional(),
    emailsOrReason: z.union([z.array(z.email()).min(1).max(3), z.string().trim().min(1)]),
});

const IdenticationDataSchema = z.object({
    idDoc: IdentificationDocumentSchema.optional(),
    originCountry: z.string().trim().min(1),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    gender: GenderEnum,
});

type IdenticationDataType = z.infer<typeof IdenticationDataSchema>;
type ContactInformationType = z.infer<typeof ContactInformationSchema>;

export { ContactInformationSchema, IdenticationDataSchema, StudyDataEnum };
export type { ContactInformationType, IdenticationDataType };



