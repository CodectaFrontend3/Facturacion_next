import { z } from "zod";

export const tipoCambioSchema = z.object({
  compra: z.number().positive("El valor de compra debe ser un número positivo."),
  venta: z.number().positive("El valor de venta debe ser un número positivo."),
  paralelo: z.number().positive("El valor paralelo debe ser un número positivo."),
});

export type TipoCambioFormValues = z.infer<typeof tipoCambioSchema>;
