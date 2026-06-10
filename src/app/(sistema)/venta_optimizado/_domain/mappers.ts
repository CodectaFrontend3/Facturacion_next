// src/app/(sistema)/ventas/_domain/mappers.ts

import { 
  CotizacionDetalle, 
  CotizacionManualDetalle, 
  NotaVentaDetalle,
  DocumentoFilaLista,
  RenovacionFilaLista
} from './types/documento.types';
import { ClienteDetalle, ClienteFilaLista } from './types/cliente.types';
import { 
  calcularTotalesCotizacion, 
  calcularTotalesCotizacionManual, 
  calcularTotalesNotaVenta,
  calcularDiasRestantes 
} from '../_utils/calculations';
import { ArticuloDetalle } from './types/catalogo.types';
import { areIdsEqual } from '../_utils/idNormalizer'; // <-- Importamos nuestro normalizador seguro

/**
 * HELPER INTERNO: Busca un cliente de forma segura y maneja logs de advertencia.
 * Evita la duplicación de código .find() en cada uno de los mappers.
 */
const encontrarClienteSeguro = (
  clienteId: string,
  clientes: ClienteDetalle[],
  documentoNumero: string
): ClienteDetalle | undefined => {
  const cliente = clientes.find((c) => areIdsEqual(c.id, clienteId));

  if (!cliente) {
    // -------------------------------------------------------------------------
    // TODO / PENDIENTE: INTEGRACIÓN CON MODAL O NOTIFICACIÓN DE ADVERTENCIA
    // -------------------------------------------------------------------------
    console.error(
      `[❌ Error de Integridad] El clienteId "${clienteId}" del documento N° ${documentoNumero} no existe en la base de datos.`
    );
  }

  return cliente;
};

/**
 * 1. MAPPER: COTIZACIONES TRADICIONALES
 * Transforma una Cotización Cruda a la estructura plana de la interfaz de usuario.
 * Se eliminó el parámetro 'comisionistas' por no ser utilizado en este flujo.
 */
export const mapCotizacionToFilaLista = (
  cotizacion: CotizacionDetalle,
  clientes: ClienteDetalle[],
  articulosMaster: ArticuloDetalle[] // 👈 Agregamos el catálogo maestro aquí
): DocumentoFilaLista => {
  const cliente = encontrarClienteSeguro(cotizacion.clienteId, clientes, cotizacion.numero);
  const financieros = calcularTotalesCotizacion(cotizacion.items, articulosMaster);

  return {
    id: cotizacion.id,
    tipo: cotizacion.tipo,
    numero: cotizacion.numero,
    clienteDocumento: cliente ? cliente.numeroDocumento : '---',
    clienteNombre: cliente ? cliente.nombre : '⚠️ Cliente no encontrado',
    clienteCelular: cliente ? cliente.celular : null, // 👈 Inyectamos celular de la entidad Cliente
    clienteCorreo: cliente ? cliente.correo : null,   // 👈 Inyectamos correo de la entidad Cliente
    fechaEmision: cotizacion.fechaEmision,
    formaPago: cotizacion.formaPago,
    total: financieros.total,
    estado: cotizacion.estado,
  };
};

/**
 * 2. MAPPER: COTIZACIONES MANUALES
 * Transforma una Cotización Manual Cruda a la estructura plana de la interfaz de usuario.
 */
export const mapCotizacionManualToFilaLista = (
  cotizacionManual: CotizacionManualDetalle,
  clientes: ClienteDetalle[]
  
): DocumentoFilaLista => {
  const cliente = encontrarClienteSeguro(cotizacionManual.clienteId, clientes, cotizacionManual.numero);
  const financieros = calcularTotalesCotizacionManual(cotizacionManual.items);

  return {
    id: cotizacionManual.id,
    tipo: cotizacionManual.tipo,
    numero: cotizacionManual.numero,
    clienteDocumento: cliente ? cliente.numeroDocumento : '---',
    clienteNombre: cliente ? cliente.nombre : '⚠️ Cliente no encontrado',
    clienteCelular: cliente ? cliente.celular : null, // 👈 Inyectamos celular de la entidad Cliente
    clienteCorreo: cliente ? cliente.correo : null,   // 👈 Inyectamos correo de la entidad Cliente
    fechaEmision: cotizacionManual.fechaEmision,
    formaPago: cotizacionManual.formaPago,
    total: financieros.total,
    estado: cotizacionManual.estado,
  };
};

/**
 * 3. MAPPER: NOTAS DE VENTA
 * Transforma una Nota de Venta Cruda a la estructura plana de la interfaz de usuario.
 */
export const mapNotaVentaToFilaLista = (
  notaVenta: NotaVentaDetalle,
  clientes: ClienteDetalle[]
): DocumentoFilaLista => {
  const cliente = encontrarClienteSeguro(notaVenta.clienteId, clientes, notaVenta.numero);
  const financieros = calcularTotalesNotaVenta(notaVenta.items);

  return {
    id: notaVenta.id,
    tipo: notaVenta.tipo,
    numero: notaVenta.numero,
    clienteDocumento: cliente ? cliente.numeroDocumento : '---',
    clienteNombre: cliente ? cliente.nombre : '⚠️ Cliente no encontrado',
    clienteCelular: cliente ? cliente.celular : null, // 👈 Inyectamos celular de la entidad Cliente
    clienteCorreo: cliente ? cliente.correo : null,   // 👈 Inyectamos correo de la entidad Cliente
    fechaEmision: notaVenta.fechaEmision,
    formaPago: notaVenta.formaPago,
    total: financieros.total,
    estado: notaVenta.estado,
  };
};

/**
 * 4. MAPPER GENERAL: MÓDULO DE RENOVACIONES
 * Procesa Cotizaciones Tradicionales y Manuales resolviendo el semáforo de alertas.
 * Sigue la interfaz estricta de RenovacionFilaLista (con propiedades en la raíz).
 */
export const mapToRenovacionFilaLista = (
  documento: CotizacionDetalle | CotizacionManualDetalle,
  clientes: ClienteDetalle[],
  articulosMaster?: ArticuloDetalle[]
): RenovacionFilaLista => {
  const cliente = encontrarClienteSeguro(documento.clienteId, clientes, documento.numero);
  
  // 1. Determinar los totales financieros según el origen
  let totalCalculado = 0;
  if (documento.tipo === 'cotizacion') {
    totalCalculado = calcularTotalesCotizacion((documento as CotizacionDetalle).items, articulosMaster || []).total;
  } else if (documento.tipo === 'cotizacion_manual') {
    totalCalculado = calcularTotalesCotizacionManual((documento as CotizacionManualDetalle).items).total;
  } 

  // 2. Lógica del semáforo temporal (Leemos del objeto 'renovacion' de la base de datos)
  const dias = calcularDiasRestantes(documento.renovacion.fechaRenovacion);
  let alerta: 'activo' | 'por_vencer' | 'vencido' = 'activo';

  if (dias <= 0) {
    alerta = 'vencido';
  } else if (dias <= 7) {
    alerta = 'por_vencer';
  }

  // 3. Retornamos la estructura plana exacta que requiere RenovacionFilaLista
  return {
    id: documento.id,
    tipo: documento.tipo,
    numero: documento.numero,
    clienteDocumento: cliente ? cliente.numeroDocumento : '---',
    clienteNombre: cliente ? cliente.nombre : '⚠️ Cliente no encontrado',
    clienteCelular: cliente ? cliente.celular : null, // 👈 Inyectamos celular de la entidad Cliente
    clienteCorreo: cliente ? cliente.correo : null,   // 👈 Inyectamos correo de la entidad Cliente
    fechaEmision: documento.fechaEmision,
    formaPago: documento.formaPago,
    total: totalCalculado,
    estado: documento.estado,

    fechaRenovacion: documento.renovacion.fechaRenovacion || '---',
    diasRestantes: dias,
    alertaVisual: alerta,
  };
};

/**
 * 5. MAPPER: CLIENTES
 * Limpia el JSON crudo del cliente para adaptarlo a las columnas de la tabla de clientes.
 */
export const mapToClienteFilaLista = (
  cliente: ClienteDetalle
): ClienteFilaLista => {
  return {
    id: cliente.id,
    tipoDocumento: cliente.tipoDocumento,
    numeroDocumento: cliente.numeroDocumento,
    nombre: cliente.nombre,
    celular: cliente.celular,
    correo: cliente.correo,
    fechaRegistro: cliente.fechaRegistro // 👈 2. Corregido: Propiedad requerida añadida
  };
};