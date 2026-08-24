import { z } from "zod";

export const familiaSchema = z.object({
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
  ubicacion: z.string().trim().min(1, "La ubicación es obligatoria."),
});

export type FamiliaFormValues = z.infer<typeof familiaSchema>;
