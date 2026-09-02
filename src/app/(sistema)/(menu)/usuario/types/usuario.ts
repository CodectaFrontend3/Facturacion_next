export type RolTipo = "Administrador" | "Vendedor" | "Personalizado";

export interface Usuario {
  id: string;
  nombresApellidos: string;
  dni: string;
  rol: RolTipo;
  correo: string;
  celular: string;
  almacen: string;
  activo: boolean;
  fechaCreacion: string;
  avatarUrl?: string;
  // Detail data
  nombreUsuario?: string;
  nombreLegal?: string;
  correoAcceso?: string;
  correoLegal?: string;
  // Personal data
  tipoDocumento?: string;
  fechaNacimiento?: string;
  genero?: string;
  telefonoFijo?: string;
  direccion?: string;
  nivelEducativo?: string;
  carreraProfesional?: string;
  estadoCivil?: string;
  licenciaConducir?: string;
  // Labor data
  area?: string;
  cargo?: string;
  tipoTrabajador?: string;
  sede?: string;
  turno?: string;
  salario?: number;
  fechaVinculacion?: string;
  fechaRetiro?: string;
  bancoAbonado?: string;
  numeroCuenta?: string;
  seguroSalud?: string;
  tipoContrato?: string;
  regimenPensionario?: string;
}

export interface Rol {
  id: string;
  nombre: string;
  usuariosAsignados: number;
  descripcion: string;
  activo: boolean;
}

export interface UsuarioFilterState {
  fechaDesde: string;
  fechaHasta: string;
  search: string;
  rol: string;
}

export type ActiveTab = "usuarios" | "roles";

export interface UsuarioFormValues {
  nombresApellidos: string;
  dni: string;
  rol: RolTipo;
  correo: string;
  celular: string;
  almacen: string;
}

export interface RolFormValues {
  nombre: string;
  descripcion: string;
}

export interface ChangePasswordFormValues {
  password: string;
  confirmPassword: string;
  sendEmail: boolean;
}
