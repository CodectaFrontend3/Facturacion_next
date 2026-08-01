// src/app/(sistema)/ventas/_domain/types/cliente.types.ts

// ============================================================================
// 1. TIPOS ENUMERADOS FIJOS DE LA INTERFAZ DE USUARIO (UI SELECTORS)
// ============================================================================
export type ClienteTipoDocumento = 'DNI' | 'RUC' | 'Pasaporte';
export type ClienteTipoCategoria = 'Cliente Frecuente' | 'Cliente Revendedor' | 'Cliente Vip' | 'Cliente Nuevo' | 'Cliente Inactivo';
export type ClienteFormaPagoAutorizada = 'Contado' | 'Crédito' | 'Sin forma de pago fija';
export type VendedorAsignado = 'Demo Demo' | 'María Gómez' | 'Carlos Sánchez' | 'Ana Rodríguez' | 'Sin vendedor fijo'; 

// ============================================================================
// 2. VISTA: DETALLES / PERSISTENCIA (ESTRUCTURA EXACTA DE TU JSON MOCK)
// ============================================================================
/**
 * Estructura de persistencia plana para Clientes, mapeada directamente de cliente-mock.json.
 * Representa los datos consolidados que alimentan tanto a las listas como al detalle.
 */
export interface ClienteDetalle {
  id: string;
  
  // Pestaña 1: Datos Personales 
  tipoDocumento: ClienteTipoDocumento; // Selector: DNI, RUC, Otros
  numeroDocumento: string;
  nombre: string;                      // Razón Social o Nombre Completo
  direccion: string | null;            // Dirección física principal
  distrito: string | null;
  correo: string | null;               // Correo general de la empresa/persona
  telefono: string | null;             // Teléfono fijo
  celular: string | null;              // Teléfono móvil principal
  
  // Ubicación Geográfica 
  codUbigeo: string | null;            // Código de 6 dígitos
  departamento: string | null;
  pais: string;                        // Por defecto "Perú"
  
  // Pestaña 2: Información Comercial 
  aniversario: string | null;          // Fecha especial / Aniversario (YYYY-MM-DD)
  fechaRegistro: string;               // Fecha de alta en el sistema (YYYY-MM-DD)
  tipoCliente: ClienteTipoCategoria;   // Selector: Cliente Frecuente, Nuevo, Inactivo
  vendedorAsignado: VendedorAsignado;            // Selector: Vendedor asignado para seguimiento comercial
  formaPagoAut: ClienteFormaPagoAutorizada; // Selector: Contado, Crédito, etc.
  
  // Pestaña 3: Persona de Contacto 
  contactoNombre: string | null;       // Campos de texto libre para rellenar
  contactoCargo: string | null;        // Cargo libre (Administrador, Jefe, etc.)
  contactoTelefono: string | null;
  contactoCelular: string | null;
  contactoCorreo: string | null;
}

// ============================================================================
// 3. VISTA: CREACIÓN (PAYLOADS EXACTOS PARA EL FORMULARIO MODULAR)
// ============================================================================

//Payload procesado por el hook del formulario al registrar un nuevo cliente. Se omite el 'id' debido a que Firebase se encargará de autogenerarlo.
export type CrearClientePayload = Omit<ClienteDetalle, 'id'>;

// ============================================================================
// 4. VISTA: LISTAS (COLUMNAS EXACTAS DE TU DATATABLE DE CLIENTES)
// ============================================================================

// Representa la fila de la tabla principal de administración de clientes.Mapea perfectamente las columnas que renderiza tu vista principal.
export interface ClienteFilaLista {
  id: string;
  tipoDocumento: ClienteTipoDocumento; // Columna: "T. Doc"
  numeroDocumento: string;             // Columna: "N° Documento"
  nombre: string;                      // Columna: "Nombres y Apellidos / Razón Social"
  celular: string | null;              // Columna: "Celular"
  correo: string | null;               // Columna: "Correo"
  fechaRegistro: string;               // Columna: "Fecha Registro"
}   