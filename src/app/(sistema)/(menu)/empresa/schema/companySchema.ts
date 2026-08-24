import { z } from "zod";

export const companySchema = z.object({
  logoUrl: z.string().optional(),
  descripcion: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  movil: z.string().min(7, "Ingrese un número válido"),
  telefono: z.string().optional(),
  correo: z.string().email("Ingrese un correo válido"),
  pais: z.string().min(1, "Seleccione un país"),
  calle: z.string().min(3, "Ingrese la dirección/calle"),
  rubro: z.string().min(2, "Ingrese el rubro"),
  regionProvincia: z.string().min(2, "Ingrese la región/provincia"),
  ciudad: z.string().min(2, "Ingrese la ciudad"),
  codigoUbigeo: z.string().length(6, "El ubigeo debe tener 6 dígitos"),
  paginaWeb: z.string().url("Ingrese una URL válida").or(z.literal("")),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
