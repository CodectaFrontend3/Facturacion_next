// src/app/(sistema)/ventas/_services/clienteService.ts

import { ClienteDetalle } from '../_domain/types/cliente.types';
import clientesMock from '../data/cliente-mock.json';
import { normalizeId } from '../_utils/idNormalizer';

// Forzamos el tipado del JSON mock al tipo estricto del dominio
const listaClientes: ClienteDetalle[] = clientesMock as ClienteDetalle[];

/**
 * SERVICIO MAESTRO DE CLIENTES
 * Centraliza la lectura y gestión del catálogo de clientes.
 */
export const clienteService = {
  /**
   * Obtiene la lista completa de clientes registrados.
   * Simula un retraso de red de 300ms para preparar la UI a flujos asíncronos (Firebase).
   */
  getAll: async (): Promise<ClienteDetalle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listaClientes);
      }, 300);
    });
  },

  /**
   * Busca un cliente específico por su ID único.
   * @param id Identificador del cliente (string o number)
   */
  getById: async (id: string | number | null | undefined): Promise<ClienteDetalle | undefined> => {
    return new Promise((resolve) => {
      const cleanId = normalizeId(id);
      setTimeout(() => {
        const cliente = listaClientes.find((c) => normalizeId(c.id) === cleanId);
        resolve(cliente);
      }, 150);
    });
  }
};