// Validaciones compartidas del módulo Caja Chica

export interface FormErrors {
  date?: string
  nombre?: string
  dni?: string
  tipoTransaccion?: string
  monto?: string
  paymentMethod?: string
  nroOperacion?: string
}

export function isValidDate(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false
  const [d, m, y] = value.split("/").map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

export function isValidDni(value: string): boolean {
  return /^\d{8}$/.test(value.trim())
}

export function isValidMonto(value: string): boolean {
  const n = parseFloat(value.replace(",", "."))
  return !isNaN(n) && n > 0
}
