// src/app/(sistema)/ventas/_utils/idNormalizer.ts

/**
 * Normaliza cualquier ID (sea string o number) a una cadena de texto limpia.
 * Si el ID es inválido, nulo o indefinido, retorna una cadena vacía para evitar
 * colisiones de texto falsas como "undefined" o "null".
 * 
 * @param id Identificador proveniente de mocks (number) o Firebase (string)
 */
export const normalizeId = (id: string | number | null | undefined): string => {
  if (id === null || id === undefined) return '';
  
  // Eliminamos espacios en blanco vacíos por si vienen hashes con espacios desde Firebase
  return String(id).trim();
};

/**
 * Compara de forma estricta y segura dos identificadores de cualquier tipo.
 * Evita la coerción implícita de tipos de JavaScript y protege el sistema de datos sucios.
 * 
 * @param idA Primer identificador a comparar (ej. Catálogo Maestro)
 * @param idB Segundo identificador a comparar (ej. Ítem de Transacción)
 */
export const areIdsEqual = (
  idA: string | number | null | undefined,
  idB: string | number | null | undefined
): boolean => {
  const cleanIdA = normalizeId(idA);
  const cleanIdB = normalizeId(idB);

  // Si cualquiera de los dos IDs terminó vacío por invalidez, no los hacemos coincidir jamás
  if (cleanIdA === '' || cleanIdB === '') return false;

  return cleanIdA === cleanIdB;
};