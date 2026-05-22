export interface ClienteFormData {
  id?: string | number
  tipoDocumento: "DNI" | "RUC" | "PASAPORTE"
  numeroDocumento: string
  nombre: string
  direccion?: string | null
  distrito?: string | null
  correo?: string | null
  telefono?: string | null
  celular?: string | null
  codUbigeo?: string | null
  departamento?: string | null
  pais?: string | null
  aniversario?: string | null
  fechaRegistro?: string | null
  tipoCliente: "Cliente Frecuente" | "Nuevo" | "Otro"
  vendedorAsignado: "Sin Vendedor fijo" | "Vendedor A" | "Vendedor B"
  formaPagoAut: "Sin forma de pago fija" | "Contado" | "Crédito"
  contactoNombre?: string | null
  contactoCargo?: string | null
  contactoTelefono?: string | null
  contactoCelular?: string | null
  contactoCorreo?: string | null
}

export interface ClienteRow {
  id: string | number
  nombre: string
  tipoDoc: string
  nroDoc: string
  correo: string
  celular: string
  fechaRegistro: string
  acciones: string[]
}
