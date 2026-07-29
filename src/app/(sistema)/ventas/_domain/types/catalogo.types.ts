// src/app/(sistema)/ventas/_domain/types/catalogos.types.ts

// ============================================================================\
// 1. MAESTRO: ARTÍCULOS Y SERVICIOS
// ============================================================================\
export interface ArticuloDetalle {
  id: string | number;         // Soportando la transición de number (mock) a string (Firebase)
  codigo: string;              // Ejemplo: "SERV-0000001" o "LN-000002"
  nombre: string;              // Nombre comercial del artículo o servicio
  stock: number;
  precio: number;              // Precio base sugerido de catálogo (S/ o $ según flujo)
  descuentoPorDefecto: number; // Porcentaje entero (0 a 100)
}

export type CrearArticuloPayload = Omit<ArticuloDetalle, 'id'>;

// ============================================================================\
// 2. MAESTRO: COMISIONISTAS / VENDEDORES
// ============================================================================\
export interface ComisionistaDetalle {
  id: string;
  codigo: string;              // Ejemplo: "VE001"
  nombre: string;
  porcentajeComision: number;  // Porcentaje asignado (0, 50, 100)
}

export type CrearComisionistaPayload = Omit<ComisionistaDetalle, 'id'>;

// ============================================================================\
// 3. MAESTRO: ALMACENES
// ============================================================================\
export interface AlmacenDetalle {
  id: string;
  codigo: string;              // Ejemplo: "ALM-001"
  nombre: string;              // Ejemplo: "Almacén Principal"
  ubicacion: string;           // Dirección física
}

export type CrearAlmacenPayload = Omit<AlmacenDetalle, 'id'>;

// ============================================================================\
// 4. MAESTRO: TIPO DE OPERACIÓN (SUNAT COMPLIANT)
// ============================================================================\
export interface TipoOperacionDetalle {
  id: string;
  codigo: string;              // Código SUNAT (Ejemplo: "0101" - Venta de bienes)
  nombre: string;
}

export type CrearTipoOperacionPayload = Omit<TipoOperacionDetalle, 'id'>;