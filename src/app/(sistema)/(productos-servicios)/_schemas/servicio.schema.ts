import { z } from "zod"

export const servicioSchema = z.object({
  codigoServicio: z.string().min(1, "El código es obligatorio"),
  codigoOriginal: z.string().default(""),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().default(""),
  familia: z.string().refine((val) => val !== "Seleccionar", {
    message: "Debe seleccionar una familia",
  }),
  subfamilia: z.string().default("Seleccionar"),
  marca: z.string().default("EXAMPLE01"),
  descuento: z.number().default(0),
  precioVentaPen: z.number().default(0),
  precioVentaUsd: z.number().default(0),
  utilidad: z.number().default(0),
  fechaRegistro: z.string().default("07-07-2026"),
  afectacion: z.string().default("Gravado - Operación Onerosa"),
  estado: z.enum(["Activo", "Anulado"]).default("Activo"),
  fichaTecnicaUrl: z.string().nullable().default(null),
  imagenUrl: z.string().nullable().default(null),
})

export type ServicioFormData = z.infer<typeof servicioSchema>
