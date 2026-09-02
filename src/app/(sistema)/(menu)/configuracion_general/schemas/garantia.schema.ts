import { z } from "zod";

export const garantiaSchema = z.object({
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
});

export type GarantiaFormValues = z.infer<typeof garantiaSchema>;
