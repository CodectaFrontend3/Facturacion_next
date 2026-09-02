import { z } from "zod";

export const motivoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio."),
  tipo: z.string().trim().min(1, "El tipo es obligatorio."),
});

export type MotivoFormValues = z.infer<typeof motivoSchema>;
