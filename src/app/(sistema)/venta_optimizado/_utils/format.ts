// src/app/(sistema)/ventas/_utils/format.ts

/**
 * Formatea un número decimal a un formato de moneda comercial (ej. S/ 1,500.00 o $ 50.00).
 * Debe recibir el valor numérico y el tipo de moneda ('soles' | 'dolares').
 * * @param amount Valor numérico a formatear
 * @param currency Tipo de moneda del documento ('soles' | 'dolares')
 */
export const formatCurrency = (amount: number, currency: 'soles' | 'dolares'): string => {
  // TODO: Implementar Intl.NumberFormat para forzar 2 decimales y añadir el prefijo 'S/' o '$'
  return '';
};

/**
 * Convierte una fecha en formato ISO o YYYY-MM-DD a un formato visual peruano (DD/MM/YYYY).
 * * @param dateString Fecha en formato de persistencia (ej. "2026-06-05")
 */
export const formatDate = (dateString: string | null | undefined): string => {
  // TODO: Validar que el string no venga vacío y transformarlo usando métodos de Date o división de strings
  return '';
};