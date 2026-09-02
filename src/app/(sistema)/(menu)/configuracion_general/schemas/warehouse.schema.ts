import { z } from "zod";

export const sunatDocumentConfigSchema = z.object({
  series: z.string(),
  correlativo: z.string(),
});

export const warehouseSunatConfigSchema = z.object({
  factura: sunatDocumentConfigSchema,
  boleta: sunatDocumentConfigSchema,
  guiaRemision: sunatDocumentConfigSchema,
  facturaManual: sunatDocumentConfigSchema,
  boletaManual: sunatDocumentConfigSchema,
  guiaRemisionManual: sunatDocumentConfigSchema,
  notaCreditoFactura: sunatDocumentConfigSchema,
  notaCreditoBoleta: sunatDocumentConfigSchema,
  notaDebito: sunatDocumentConfigSchema,
});

export const warehouseSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio."),
  abreviatura: z.string().trim().min(1, "La abreviatura es obligatoria."),
  direccion: z.string().trim().min(1, "La dirección es obligatoria."),
  responsableId: z.string().min(1, "Debe seleccionar un responsable."),
  codigoUbigeo: z.string().trim().min(1, "El código ubigeo es obligatorio."),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria."),
  codigoSunat: z.string().trim().min(1, "El código SUNAT es obligatorio."),
  sunat: warehouseSunatConfigSchema,
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
export type WarehouseSunatConfigValues = z.infer<
  typeof warehouseSunatConfigSchema
>;
