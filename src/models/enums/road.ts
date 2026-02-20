import z from 'zod';

// TODO: May be better to put this into a json file.
// TODO: Find an easy way to update this list if in-page list changes.
const RoadSchema = z.enum([
  'Calle',
  'Carrera',
  'Avenida',
  'Avenida carrera',
  'Avenida calle',
  'Circular',
  'Circunvalar',
  'Diagonal',
  'Manzana',
  'Transversal',
  'Vía',
]);
type RoadType = z.infer<typeof RoadSchema>;

export default RoadSchema;
export { RoadSchema };
export type { RoadType };
