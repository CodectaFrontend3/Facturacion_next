// FormPagoSchema.ts
import { z } from "zod";

const BoletaPagoSchema = z.object({
  idBoleta: z.string(),
  numeroDocumento: z.string(),
  cuotasSeleccionadas: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos una cuota"),
  montoPagar: z.number().min(0.01, "El monto debe ser mayor a 0"),
});

const BaseMetodoPagoSchema = z.object({
  boletas: z.array(BoletaPagoSchema),
  montoTotal: z.number(),
  notasAdicionales: z.string().optional(),
});

const ChequeSchema = BaseMetodoPagoSchema.extend({
  metodoPago: z.literal("cheque"),
  numeroCheque: z.string().min(1, "N° de Cheque requerido"),
  fechaCobro: z.string().min(1, "Fecha de cobro requerida"),
  bancoEmisor: z.string().min(1, "Seleccione un banco"),
  beneficiario: z.string().min(1, "Beneficiario requerido"),
  moneda: z.string().default("S/"),
  tipoCambio: z.coerce.number().min(0.01),
  esDiferido: z.boolean().default(false),
  fechaEmisionCheque: z.string().min(1, "Fecha de emisión requerida"),
  bancoEmpresa: z.string().min(1, "Seleccione banco de la empresa"),
  numeroCuenta: z.string().min(1, "Seleccione cuenta"),
  comprobanteArchivo: z.any().optional(),
});

const TarjetaSchema = BaseMetodoPagoSchema.extend({
  metodoPago: z.literal("tarjeta"),
  titularTarjeta: z.string().min(1, "Titular de tarjeta requerido"),
  banco: z.string().min(1, "Seleccione un banco"),
  moneda: z.string().default("S/"),
  tipoCambio: z.coerce.number().min(0.01),
  fechaPago: z.string().min(1, "Fecha de pago requerida"),
  comprobanteArchivo: z.any().optional(),
});

const EfectivoSchema = BaseMetodoPagoSchema.extend({
  metodoPago: z.literal("efectivo"),
  personaCancela: z.string().min(1, "Nombre de quien cancela requerido"),
  fechaPago: z.string().min(1, "Fecha de pago requerida"),
  moneda: z.string().default("S/"),
  tipoCambio: z.coerce.number().min(0.01),
});

const TransferenciaSchema = BaseMetodoPagoSchema.extend({
  metodoPago: z.literal("transferencia"),
  titular: z.string().min(1, "Titular requerido"),
  fecha: z.string().min(1, "Fecha requerida"),
  moneda: z.string().default("S/"),
  tipoCambio: z.coerce.number().min(0.01),
  bancoEmpresa: z.string().min(1, "Seleccione banco"),
  cuentaBancaria: z.string().min(1, "Seleccione cuenta"),
  numeroOperacion: z.string().min(1, "N° de Operación requerido"),
  comprobanteArchivo: z.any().optional(),
});

const FormPagoBaseSchema = z.object({
  metodoPago: z.enum(["cheque", "tarjeta", "efectivo", "transferencia"]),
  boletas: z.array(BoletaPagoSchema),
  montoTotal: z.number().min(0, "El total no puede ser negativo"),
  notasAdicionales: z.string().default(""),
  moneda: z.string().default("S/"),
  tipoCambio: z.number().default(1),
  numeroCheque: z.string().optional(),
  fechaCobro: z.string().optional(),
  bancoEmisor: z.string().optional(),
  beneficiario: z.string().optional(),
  esDiferido: z.boolean().default(false),
  fechaEmisionCheque: z.string().optional(),
  bancoEmpresa: z.string().optional(),
  numeroCuenta: z.string().optional(),
  comprobanteArchivo: z.any().optional(),
  titularTarjeta: z.string().optional(),
  banco: z.string().optional(),
  fechaPago: z.string().optional(),
  personaCancela: z.string().optional(),
  titular: z.string().optional(),
  fecha: z.string().optional(),
  cuentaBancaria: z.string().optional(),
  numeroOperacion: z.string().optional(),
});

export const FormPagoSchema = FormPagoBaseSchema.superRefine((data, ctx) => {
  if (data.metodoPago === "cheque") {
    if (!data.numeroCheque)
      ctx.addIssue({
        code: "custom",
        path: ["numeroCheque"],
        message: "N° de Cheque requerido",
      });
    if (!data.fechaCobro)
      ctx.addIssue({
        code: "custom",
        path: ["fechaCobro"],
        message: "Fecha de cobro requerida",
      });
    if (!data.bancoEmisor)
      ctx.addIssue({
        code: "custom",
        path: ["bancoEmisor"],
        message: "Seleccione un banco",
      });
    if (!data.beneficiario)
      ctx.addIssue({
        code: "custom",
        path: ["beneficiario"],
        message: "Beneficiario requerido",
      });
    if (!data.fechaEmisionCheque)
      ctx.addIssue({
        code: "custom",
        path: ["fechaEmisionCheque"],
        message: "Fecha de emisión requerida",
      });
    if (!data.bancoEmpresa)
      ctx.addIssue({
        code: "custom",
        path: ["bancoEmpresa"],
        message: "Seleccione banco de la empresa",
      });
    if (!data.numeroCuenta)
      ctx.addIssue({
        code: "custom",
        path: ["numeroCuenta"],
        message: "Seleccione cuenta",
      });
  }

  if (data.metodoPago === "tarjeta") {
    if (!data.titularTarjeta)
      ctx.addIssue({
        code: "custom",
        path: ["titularTarjeta"],
        message: "Titular de tarjeta requerido",
      });
    if (!data.banco)
      ctx.addIssue({
        code: "custom",
        path: ["banco"],
        message: "Seleccione un banco",
      });
    if (!data.fechaPago)
      ctx.addIssue({
        code: "custom",
        path: ["fechaPago"],
        message: "Fecha de pago requerida",
      });
  }

  if (data.metodoPago === "efectivo") {
    if (!data.personaCancela)
      ctx.addIssue({
        code: "custom",
        path: ["personaCancela"],
        message: "Nombre de quien cancela requerido",
      });
    if (!data.fechaPago)
      ctx.addIssue({
        code: "custom",
        path: ["fechaPago"],
        message: "Fecha de pago requerida",
      });
  }

  if (data.metodoPago === "transferencia") {
    if (!data.titular)
      ctx.addIssue({
        code: "custom",
        path: ["titular"],
        message: "Titular requerido",
      });
    if (!data.bancoEmpresa)
      ctx.addIssue({
        code: "custom",
        path: ["bancoEmpresa"],
        message: "Seleccione banco",
      });
    if (!data.cuentaBancaria)
      ctx.addIssue({
        code: "custom",
        path: ["cuentaBancaria"],
        message: "Seleccione cuenta",
      });
    if (!data.numeroOperacion)
      ctx.addIssue({
        code: "custom",
        path: ["numeroOperacion"],
        message: "N° de Operación requerido",
      });
  }
});

// Exportamos el esquema principal que valida todos los métodos de pago
export type FormPagoValues = z.input<typeof FormPagoSchema>;
// Exportamos el tipo de salida del esquema para usarlo en la validación de formularios
export type FormPagoOutput = z.output<typeof FormPagoSchema>;
