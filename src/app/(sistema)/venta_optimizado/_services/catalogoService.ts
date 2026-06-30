// src/app/(sistema)/venta_optimizado/_services/catalogoService.ts

import { ArticuloDetalle, AlmacenDetalle, ComisionistaDetalle, TipoOperacionDetalle } from '../_domain/types/catalogo.types';

// Importación de los Mocks JSON
import articulosMock from '../data/catalogo/articulo-mock.json';
import almacenesMock from '../data/catalogo/almacenes-mock.json';
import comisionistasMock from '../data/catalogo/comisionista-mock.json';
import tipoOperacionMock from '../data/catalogo/tipo-operacion-mock.json';

// Casteo de datos crudos a interfaces estrictas del Dominio
const listaArticulos = articulosMock as ArticuloDetalle[];
const listaAlmacenes = almacenesMock as AlmacenDetalle[];
const listaComisionistas = comisionistasMock as ComisionistaDetalle[];
const listaTiposOperacion = tipoOperacionMock as TipoOperacionDetalle[];

/**
 * SERVICIO MAESTRO DE CATÁLOGOS
 * Abstrae el acceso a los maestros de artículos, almacenes, comisionistas y tipos de operación.
 */
export const catalogoService = {
  /**
   * Obtiene la lista completa de artículos del catálogo.
   */
  getArticulos: async (): Promise<ArticuloDetalle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listaArticulos);
      }, 300);
    });
  },

  /**
   * Obtiene la lista completa de almacenes.
   */
  getAlmacenes: async (): Promise<AlmacenDetalle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listaAlmacenes);
      }, 300);
    });
  },

  /**
   * Obtiene la lista completa de comisionistas.
   */
  getComisionistas: async (): Promise<ComisionistaDetalle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listaComisionistas);
      }, 300);
    });
  },

  /**
   * Obtiene la lista completa de tipos de operación (SUNAT compliant).
   */
  getTiposOperacion: async (): Promise<TipoOperacionDetalle[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listaTiposOperacion);
      }, 300);
    });
  },
};
