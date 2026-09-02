import { z } from "zod";

export const usuarioSchema = z.object({
  nombresApellidos: z
    .string()
    .trim()
    .min(1, "El nombre y apellido es obligatorio."),
  dni: z.string().trim().min(8, "El DNI debe tener al menos 8 dígitos."),
  rol: z.enum(["Administrador", "Vendedor", "Personalizado"]),
  correo: z.string().trim().email("Ingresa un correo electrónico válido."),
  celular: z.string().trim().min(9, "El celular debe tener al menos 9 dígitos."),
  almacen: z.string().trim().min(1, "El almacén es obligatorio."),
});

export type UsuarioFormValues = z.infer<typeof usuarioSchema>;
