import { 
  DocumentoTipo, 
  DocumentoEstado, 
  MonedaTipo, 
  FormaPagoTipo, 
  DocumentoTipoComprobante,
  RenovacionConfig 
} from './shared.types';

// ============================================================================
// PERSPECTIVA DE ÍTEMS INTERNOS (SUB-ESTRUCTURAS)
// ============================================================================

export interface ItemNotaVenta {
  id: string;
  articuloId: string;
  descripcion: string;
  cantidad: number;
  precioAsignado: number;
}

export interface ItemCotizacionManual {
  id: string;
  articuloId: string; // Null para servicios o descripciones libres escritas a mano
  descripcion: string;       // Propiedad corregida y validada sin typos
  cantidad: number;
  precioAsignado: number;    // Precio neto s/IGV ingresado
}

export interface ItemCotizacion {
  id: string;
  articuloId: string;
  descripcion: string;
  cantidad: number;
  descuentoPorcentajeAplicado: boolean; // Gatillo lógico para reactivar logic de _utils/calculations.ts
}


// ============================================================================
// VISTA: DETALLES (ESTRUCTURA DE CONSULTA COMPLETA)
// ============================================================================

export interface NotaVentaDetalle {
  id: string;
  tipo: 'nota_venta';
  numero: string;

  fechaEmision: string;
  estado: DocumentoEstado;
  observacion: string;
  
  // Relaciones por ID
  clienteId: string;
  almacenId: string;
  
  // Parámetros Comerciales
  moneda: MonedaTipo;
  formaPago: FormaPagoTipo;
  garantia: string;
  
  // Colección Dinámica de Cierre de Venta
  items: ItemNotaVenta[];
}

export interface CotizacionManualDetalle {
  id: string;
  tipo: 'cotizacion_manual';
  numero: string;
  fechaEmision: string;
  estado: DocumentoEstado;
  validez: string;
  observacion: string;
  
  // Relaciones por ID (Cotización manual asocia el almacén de despacho)
  clienteId: string;
  almacenId: string;
  tipoOperacionId: string;
  
  // Parámetros Comerciales
  moneda: MonedaTipo;
  formaPago: FormaPagoTipo;
  garantia: string;
  tipoDocumento: DocumentoTipoComprobante;
  
  // Seguimiento Temporal
  renovacion: RenovacionConfig;
  
  // Colección Dinámica Manual
  items: ItemCotizacionManual[];
}

export interface CotizacionDetalle {
  id: string;
  tipo: 'cotizacion';
  numero: string;             // Código correlativo (ej. "COTF 001-00000001")
  fechaEmision: string;       // Formato YYYY-MM-DD
  estado: DocumentoEstado;    // 'Pendiente' | 'Emitida' | 'Aceptada' | 'Anulada'
  validez: string;            // Entrada libre de texto (ej. "1 DIA", "15 DIAS")
  observacion: string;        // Comentario o glosa administrativa inferior
  
  // Relaciones por ID a Catálogos y Clientes
  clienteId: string;
  comisionistaId: string;
  tipoOperacionId: string;
  
  // Parámetros Comerciales del Formulario
  moneda: MonedaTipo;         // 'soles' | 'dolares'
  formaPago: FormaPagoTipo;   // 'Contado' | 'Credito'
  garantia: string;           // Entrada libre de texto (ej. "6 MESES", "1 AÑO")
  tipoDocumento: DocumentoTipoComprobante; // 'Factura' | 'Boleta'
  
  // Seguimiento Temporal
  renovacion: RenovacionConfig;
  
  // Colección Dinámica de Productos
  items: ItemCotizacion[];
}

export type DocumentoDetalleCompleto = NotaVentaDetalle | CotizacionManualDetalle | CotizacionDetalle;

// ============================================================================
// VISTA: CREACIÓN (PAYLOADS PARA FORMULARIOS)
// ============================================================================
export type CrearNotaVentaPayload = Omit<NotaVentaDetalle, 'id' | 'numero'>;
export type CrearCotizacionManualPayload = Omit<CotizacionManualDetalle, 'id' | 'numero'>;
export type CrearCotizacionPayload = Omit<CotizacionDetalle, 'id' | 'numero'>;


// ============================================================================
// VISTA: LISTAS (ESTRUCTURAS EMPAREJADAS CON TUS IMÁGENES DE COLUMNAS)
// ============================================================================

export interface DocumentoFilaLista {
  id: string;
  tipo: DocumentoTipo;
  numero: string;             // Columna: "N°"
  clienteDocumento: string;   // Columna: "RUC-DNI" (Inyectado por mapper al cruzar clienteId)
  clienteNombre: string;      // Columna: "Cliente" (Inyectado por mapper al cruzar clienteId)
  clienteCelular?: string | null; // 👈 AGREGO: Opcional para el Popover de WhatsApp
  clienteCorreo?: string | null;  // 👈 AGREGO: Opcional para el Popover de Correo
  fechaEmision: string;       // Columna: "Emisión" / "Fecha Emisión"
  formaPago: FormaPagoTipo;   // Columna: "Forma" ('Contado' | 'Credito')
  total: number;              // Columna: "Importe T." (Calculado por _utils/calculations.ts)
  estado: DocumentoEstado;    // Necesario para los filtros comerciales por Tabs
}

// Extrae los campos de renovación y añade el cálculo de días y alertas visuales.
export interface RenovacionFilaLista extends DocumentoFilaLista {
  // Solo se listarán aquí si renovacion.isActive === true
  fechaRenovacion: string; 
  diasRestantes: number;   // Operación matemática: fechaRenovacion - hoy
  alertaVisual: 'activo' | 'por_vencer' | 'vencido'; // Control de colores en UI
}


