// 1. Sub-interfaces base para mantener el orden
export interface Contacto {
  nombre: string;
  celular: string;
  correo_contacto: string;
}

export interface DatosProveedor {
  ruc: string;
  empresa: string;
  direccion: string;
  telefono: string;
  correo_empresa: string;
}

// 2. Interfaz Completa (Ideal para el Modal / Formulario de creación)
export interface ProveedorModal {
  proveedor: DatosProveedor;
  contacto: Contacto;
  observacion: string;
}

// 3. Interfaz para la Tabla (Habitualmente incluye un ID de la base de datos)
export interface ProveedorTabla extends ProveedorModal {
  id: number; // o string, dependiendo de tu base de datos
  acciones: string[];
}
