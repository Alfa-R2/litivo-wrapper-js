import z from "zod";
import { IdentificationDocumentBaseSchema } from "./identification-document.js";
import { NaturalPersonIdDataSchema } from "./natural-person.js";

const BeneficiarySchema = NaturalPersonIdDataSchema.extend({
    birthDate: NaturalPersonIdDataSchema.shape.birthDate.optional(),
    idDoc: IdentificationDocumentBaseSchema

});

const childSupportObligationSchema = z.object({
    amount: z.number().nonnegative(),
    paymentFrequency: z.enum(["DIARIOS", "SEMANAL", "QUINCENAL", "MENSUAL"]),
    redamFilePath: z.string().trim().min(1),
    parentalRelationship: z.enum(["Cónyuge", "Padres", "Hijos", "Hermanos", "Otros"]),
    isSued: z.boolean().optional(),
    beneficiary: BeneficiarySchema
});

const childSupportObligationsSchema = z.array(childSupportObligationSchema);
type ChildSupportObligationType = z.infer<typeof childSupportObligationSchema>;
type ChildSupportObligationsType = z.infer<typeof childSupportObligationsSchema>;

export { childSupportObligationSchema, childSupportObligationsSchema };
export type { ChildSupportObligationsType, ChildSupportObligationType };

