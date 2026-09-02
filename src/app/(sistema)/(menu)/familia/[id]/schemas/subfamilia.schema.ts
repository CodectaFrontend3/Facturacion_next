import { z } from "zod";

export const addSubfamiliaSchema = z.object({
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
});

export type AddSubfamiliaFormValues = z.infer<typeof addSubfamiliaSchema>;
