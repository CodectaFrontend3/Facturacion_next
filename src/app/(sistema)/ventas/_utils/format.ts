// _utils/format.ts

/**
 * Formatea un número decimal a formato moneda comercial peruano.
 * @param amount Valor numérico a formatear
 * @param currency Tipo de moneda ('soles' | 'dolares'). Por defecto 'soles'.
 */
export const formatCurrency = (
  amount: number,
  currency: "soles" | "dolares" = "soles"
): string => {
  const prefix = currency === "dolares" ? "$ " : "S/ "
  const formatted = new Intl.NumberFormat("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return `${prefix}${formatted}`
}

/**
 * Convierte una fecha en formato ISO o YYYY-MM-DD al formato visual peruano DD/MM/YYYY.
 * @param dateString Fecha en formato de persistencia (ej. "2026-06-05")
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "---"

  // Soporte para formato YYYY-MM-DD sin conversión timezone
  const parts = dateString.split("T")[0].split("-")
  if (parts.length !== 3) return dateString

  const [year, month, day] = parts
  return `${day}-${month}-${year}`
}

/**
 * Devuelve el símbolo de moneda visible para mostrar junto a montos
 * en la vista de detalle (ej. "S/" o "$").
 */
export const simboloDesdeMoneda = (moneda: "soles" | "dolares"): string =>
  moneda === "soles" ? "S/" : "$"

/**
 * Objeto helper para uso idiomático en JSX y pages:
 * format.moneda(amount)  →  "S/ 1,500.00"
 * format.fecha(str)      →  "05-06-2026"
 */
export const format = {
  moneda: (amount: number, currency: "soles" | "dolares" = "soles") =>
    formatCurrency(amount, currency),
  fecha: (dateString: string | null | undefined) => formatDate(dateString),
  simbolo: (moneda: "soles" | "dolares") => simboloDesdeMoneda(moneda),
}
