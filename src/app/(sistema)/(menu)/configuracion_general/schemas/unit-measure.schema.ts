import { z } from "zod";

export const unitMeasureSchema = z.object({
  medida: z.string().trim().min(1, "El nombre es obligatorio."),
  simbolo: z.string().trim().min(1, "El símbolo es obligatorio."),
  unidad: z.string().trim().min(1, "La unidad es obligatoria."),
});

export type UnitMeasureFormValues = z.infer<typeof unitMeasureSchema>;
