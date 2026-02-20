import z from 'zod';

// TODO: May be better to put this into a json file.
// TODO: Find an easy way to update this list if in-page list changes.
const creditNatures: [string, ...string[]] = [
  'Primera Clase: Alimentos de Menores',
  'Primera Clase: Obligaciones Laborales',
  'Primera Clase: Obligaciones con el Fisco',
  'Segunda Clase: Prendario',
  'Segunda Clase: (Artículo 539 No. 3) Las obligaciones amparadas con garantía mobiliaria constituidas a favor de las empresas vigiladas por la Superintendencia de la Economía Solidaria',
  'Tercera Clase: Hipotecarios - Escritura',
  'Cuarta Clase: Proveedores Estratégicos',
  'Quinta clase: Quirografarios - Letras',
  'Quinta clase: Quirografarios - Pagaré',
  'Quinta clase: Quirografarios - Cheque',
  'Quinta clase: Quirografarios - Factura',
  'Quinta clase: Quirografarios - Sentencia Judicial',
  'Quinta clase: Quirografarios - Leasing',
  'Quinta clase: Quirografarios - Leasing - Vehículo',
  'Quinta clase: Quirografarios - Leasing - Maquinaria',
  'Quinta clase: Sin Documento',
  'Quinta clase: Cánones Vencidos de los Contratos de Leasing',
];

const CreditNatureSchema = z.enum(creditNatures);
type CreditNatureType = z.infer<typeof CreditNatureSchema>;

export default CreditNatureSchema;
export { CreditNatureSchema };
export type { CreditNatureType };
