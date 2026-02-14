import { z } from 'zod';
import { ContactInformationSchema, IdenticationDataSchema, StudyDataEnum } from './base.js';

const CompanyTypeEnum = z.enum([
    "ORGANIZACIÓN PRIVADA",
    "ORGANIZACIÓN PÚBLICA"
]);
const DebtTypeEnum = z.enum([
    "Deudor",
    "Codeudor",
    "Avalista",
    "Fiador",
    "Otro",
    "Desconozco esta información"
]);

const IdentificationJuridicaDataSchema = z.object({
    idDoc: z.object({
        type: z.literal('NIT'),
        number: z.string().trim().min(1)
    }),
    companyName: z.string().trim().min(1),
    economicSector: z.string().trim().min(1), // Known fixed options.
    companyType: CompanyTypeEnum,
    originCountry: z.string().trim().min(1),
})
const CreditSchema = z.object({
    debtType: DebtTypeEnum,
    creditNature: z.string().trim().min(1), // Known fixed options.
    capital: z.number().nonnegative(),
    creditExpirationDate: z.iso.date().optional(), // TODO: Check if use ISO date or a Date object.
    delayForMoreThan90Days: z.literal(true)    
});

const CreditorNaturalSchema = z.object({
    type: z.literal('Persona Natural'),
    identificationData: IdenticationDataSchema,
    contactInformation: ContactInformationSchema,
    schoolLevel: StudyDataEnum,
    credits : z.array(CreditSchema).min(1)
});

const CreditorJuridicaSchema = z.object({
    type: z.literal('Persona Jurídica'),
    identificationData: IdentificationJuridicaDataSchema,
    contactInformation: ContactInformationSchema,
    credits : z.array(CreditSchema).min(1)
});



type CreditorNaturalType = z.infer<typeof CreditorNaturalSchema>;
type CreditorJuridicaType = z.infer<typeof CreditorJuridicaSchema>;


export { CreditorJuridicaSchema, CreditorNaturalSchema };
export type { CreditorJuridicaType, CreditorNaturalType };


