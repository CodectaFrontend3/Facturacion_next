import { z } from "zod";

export const validezSchema = z.object({
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
});

export type ValidezFormValues = z.infer<typeof validezSchema>;
