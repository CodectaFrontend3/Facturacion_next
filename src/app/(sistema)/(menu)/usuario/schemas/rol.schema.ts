import { z } from "zod";

export const rolSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre del rol es obligatorio."),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
});

export type RolFormValues = z.infer<typeof rolSchema>;
