// src/app/(sistema)/ventas/_domain/types/shared.types.ts

// ============================================================================
// 1. TIPOS ENUMERADOS COMUNES (BASADOS EN LOS VALORES DE TUS FORMULARIOS)
// ============================================================================

export type DocumentoTipo = 'cotizacion' | 'cotizacion_manual' | 'nota_venta';

    // Estado comercial del documento, determina su validez  legal/contable y bloquea la edicion en la vista de Detalles.
    export type DocumentoEstado = 'Pendiente' | 'Emitida' | 'Aceptada' | 'Anulada';
    export type MonedaTipo = 'soles' | 'dolares';
    export type FormaPagoTipo = 'Contado' | 'Credito';
    export type DocumentoTipoComprobante = 'Factura' | 'Boleta';


// ============================================================================
// 2. CONFIGURACIÓN BASE DE PERSISTENCIA (LO QUE SE GUARDA EN FIREBASE)
// ============================================================================

export interface RenovacionConfig {
  isActive: boolean;
  fechaRenovacion: string | null; // Formato YYYY-MM-DD
}
