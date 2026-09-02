// Utilidades de formato compartidas del módulo Caja Chica

export function formatMoney(value: number): string {
  return `S/ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
