import { z } from "zod";

export const marcaSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio."),
  abreviatura: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().optional(),
  descripcion: z.string().optional(),
  foto: z.string().optional(),
});

export type MarcaFormValues = z.infer<typeof marcaSchema>;
