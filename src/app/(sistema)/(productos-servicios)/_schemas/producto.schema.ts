import { z } from "zod"

export const productoSchema = z.object({
  codigo: z.string().min(1, "El código es obligatorio"),
  codOrig: z.string().default(""),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().default(""),
  marca: z.string().min(1, "La marca es obligatoria"),
  peso: z.number().default(0),
  pesoUnidad: z.string().default("Miligramos"),
  familia: z.string().refine((val) => val !== "Seleccionar", {
    message: "Debe seleccionar una familia",
  }),
  subFamilia: z.string().default("Seleccionar"),
  stockMin: z.number().default(0),
  stockMax: z.number().default(0),
  desc1: z.number().default(0),
  desc2: z.number().default(0),
  descMax: z.number().default(0),
  origen: z.string().default("Producto Nacional"),
  utilidad: z.number().min(0, "La utilidad debe ser mayor o igual a 0"),
  garantia: z.string().default("12 meses"),
  afectacion: z.string().default("Gravado - Operación Onerosa"),
  unidad: z.string().default("Bolsa"),
  fechaRegistro: z.string(),
  fichaTecnicaUrl: z.string().nullable().default(null),
  imagen: z.string().default(""),
  detalle: z.string().default(""),
  estado: z.enum(["Activo", "Inactivo"]).default("Activo"),
  precioNacional: z.number().default(0),
  stock: z.number().default(0),
})

export type ProductoFormData = z.infer<typeof productoSchema>
