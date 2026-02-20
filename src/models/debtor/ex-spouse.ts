import z from 'zod';

const ExSpouseSchema = z.object({
  // TODO: Optional: ¿Tuvo sociedad conyugal o patrimonial liquidada?
  // TODO: Optional: ¿La liquidación se realizó dentro de los dos años anteriores a la presentación de esta solicitud? This needs the forme question to be true to be set

  // TODO: To attach the following documents, both former boolean questions must be true:

  // NOTE: Partnership Dissolved Within Last Two Years
  // Copia de la escritura pública o de la sentencia por medio de la cual esta se haya liquidado, o de la sentencia que haya declarado la separación de bienes:
  //  ANEXAR ESCRITURA PÚBLICA O SENTENCIA
  publicDeedOrJudgmentFilePath: z.string().trim().min(1).optional(), // . TODO: Has to exist or has to be bytes. OR JUDGMENT.
  // Relación de bienes con el valor comercial estimado que fueron objeto de entrega:
  //  ANEXAR COPIA DE LA RELACIÓN DE BIENES
  assetsListFilePath: z.string().trim().min(1).optional(), // TODO: Has to exist or has to be bytes.
});
type ExSpouseType = z.infer<typeof ExSpouseSchema>;

export default ExSpouseSchema;
export { ExSpouseSchema };
export type { ExSpouseType };
