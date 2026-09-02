// src/app/(sistema)/ventas/_utils/validations.ts

/**
 * Valida si un número de DNI cumple con las reglas oficiales de la RENIEC.
 * Debe contener exactamente 8 dígitos puramente numéricos.
 * * @param dni Cadena de texto con el DNI ingresado
 */
export const isValidDNI = (dni: string): boolean => {
  // TODO: Implementar expresión regular /^\d{8}$/ para evaluar la consistencia
  return false;
};

/**
 * Valida si un número de RUC cumple con la estructura requerida por la SUNAT.
 * Debe tener 11 dígitos numéricos y comenzar obligatoriamente con los prefijos 10, 20, 15 o 17.
 * * @param ruc Cadena de texto con el RUC ingresado
 */
export const isValidRUC = (ruc: string): boolean => {
  // TODO: Validar longitud de 11 dígitos, que sea numérico y verificar los prefijos iniciales oficiales
  return false;
};