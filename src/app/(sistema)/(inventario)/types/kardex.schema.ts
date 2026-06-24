import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Utilidades                                                         */
/* ------------------------------------------------------------------ */

// dd/mm/aaaa
const FECHA_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

const fechaSchema = z
  .string()
  .min(1, "La fecha es requerida")
  .regex(FECHA_REGEX, "Formato inválido, usa dd/mm/aaaa");

// Acepta inputs de texto (string) y los convierte a número validado.
// Útil porque los <input> de las tablas guardan el valor como string.
const cantidadPositivaSchema = z.coerce
  .number()
  .refine((v) => !isNaN(v), "Ingresa un número válido")
  .positive("Debe ser mayor a 0");

const numeroNoNegativoSchema = z.coerce
  .number()
  .refine((v) => !isNaN(v), "Ingresa un número válido")
  .nonnegative("No puede ser negativo");

/* ------------------------------------------------------------------ */
/*  1. KARDEX DE ENTRADA                                               */
/* ------------------------------------------------------------------ */

export const kardexEntradaItemSchema = z.object({
  idProducto: z.string().min(1, "Selecciona un producto"),
  unidad: z.string().min(1, "La unidad es requerida"),
  cantidad: cantidadPositivaSchema,
  precio: cantidadPositivaSchema,
  // Total se calcula automáticamente (cantidad * precio), por eso es opcional/solo-lectura
  total: numeroNoNegativoSchema.optional(),
});

export const kardexEntradaSchema = z.object({
  motivo: z.string().min(1, "Selecciona un motivo"),
  tipoComprobante: z.string().min(1, "Selecciona un tipo de comprobante"),
  numeroComprobante: z.string().optional(),
  fechaComprobante: z
    .string()
    .optional()
    .refine((v) => !v || FECHA_REGEX.test(v), {
      message: "Formato inválido, usa dd/mm/aaaa",
    }),
  tipoTransporte: z.string().min(1, "Selecciona un tipo de transporte"),
  categoria: z.string().default("PRODUCTOS"),
  fechaCompra: fechaSchema,
  proveedor: z.string().min(1, "Selecciona un proveedor"),
  moneda: z.string().min(1, "Selecciona una moneda"),
  informacion: z.string().optional(),
  guiaRemision: z.string().optional(),
  archivo: z.instanceof(File).optional().nullable().or(z.literal(undefined)),
  productos: z
    .array(kardexEntradaItemSchema)
    .min(1, "Agrega al menos un producto"),
});

export type KardexEntradaItem = z.infer<typeof kardexEntradaItemSchema>;
export type KardexEntradaFormValues = z.infer<typeof kardexEntradaSchema>;

/* ------------------------------------------------------------------ */
/*  2. KARDEX DE DISTRIBUCIÓN                                          */
/* ------------------------------------------------------------------ */

export const kardexDistribucionItemSchema = z.object({
  idProducto: z.string().min(1, "Selecciona un producto"),
  // Stock viene bloqueado / lo trae el backend al elegir el producto
  stock: numeroNoNegativoSchema.optional(),
  unidades: cantidadPositivaSchema,
  cantidad: cantidadPositivaSchema,
  total: numeroNoNegativoSchema.optional(),
});

export const kardexDistribucionSchema = z.object({
  motivo: z.string().min(1, "Selecciona un motivo"),
  puntoPartida: z.string().min(1, "El punto de partida es requerido"),
  categoria: z.string().min(1, "Selecciona una categoría"),
  almacen: z.string().min(1, "Selecciona un almacén"),
  puntoLlegada: z.string().min(1, "El punto de llegada es requerido"),
  observaciones: z.string().optional(),
  generarGuia: z.boolean().default(false),
  productos: z
    .array(kardexDistribucionItemSchema)
    .min(1, "Agrega al menos un producto"),
});

export type KardexDistribucionItem = z.infer<
  typeof kardexDistribucionItemSchema
>;
export type KardexDistribucionFormValues = z.infer<
  typeof kardexDistribucionSchema
>;

/* ------------------------------------------------------------------ */
/*  3. KARDEX TRASLADO                                                 */
/* ------------------------------------------------------------------ */

// Mismo shape de fila que distribución, se reutiliza el schema de item
export const kardexTrasladoItemSchema = kardexDistribucionItemSchema;

export const kardexTrasladoSchema = z
  .object({
    // Viene bloqueado desde la URL (?emisor=), pero igual se valida
    almacenEmisor: z.string().min(1, "El almacén emisor es requerido"),
    categoria: z.string().default("PRODUCTOS"),
    almacen: z.string().min(1, "Selecciona un almacén destino"),
    motivo: z.string().default("Traslado de almacen"),
    generarGuia: z.boolean().default(true),
    productos: z
      .array(kardexTrasladoItemSchema)
      .min(1, "Agrega al menos un producto"),
  })
  .refine((data) => data.almacenEmisor !== data.almacen, {
    message: "El almacén destino debe ser distinto al almacén emisor",
    path: ["almacen"],
  });

export type KardexTrasladoItem = z.infer<typeof kardexTrasladoItemSchema>;
export type KardexTrasladoFormValues = z.infer<typeof kardexTrasladoSchema>;
