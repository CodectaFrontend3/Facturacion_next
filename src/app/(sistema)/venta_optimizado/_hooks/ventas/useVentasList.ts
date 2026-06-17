// _hooks/ventas/useVentasList.ts
"use client"

import { useMemo } from "react"
import { VentasFilters } from "./useVentasFilters"
import { DocumentoFilaLista, RenovacionFilaLista } from "../../_domain/types/documento.types"
import { ClienteFilaLista } from "../../_domain/types/cliente.types"

// Unión de los tipos que pueden ir en tabla
type FilaTabla = DocumentoFilaLista | RenovacionFilaLista | ClienteFilaLista

/**
 * Filtra un array de filas según los filtros activos.
 * Aplica: rango de fechas (fechaEmision), búsqueda libre en texto y formaPago.
 */
export const useVentasList = <T extends FilaTabla>(
  data: T[],
  filters: VentasFilters
): T[] => {
  return useMemo(() => {
    let result = [...data]

    // 1. Filtro por rango de fechas (solo documentos tienen fechaEmision)
    if (filters.dateFrom) {
      result = result.filter((row) => {
        const fecha = (row as DocumentoFilaLista).fechaEmision
        return fecha ? fecha >= filters.dateFrom : true
      })
    }

    if (filters.dateTo) {
      result = result.filter((row) => {
        const fecha = (row as DocumentoFilaLista).fechaEmision
        return fecha ? fecha <= filters.dateTo : true
      })
    }

    // 2. Filtro por forma de pago (tipoDocumento en el filtro actúa como selector)
    if (filters.tipoDocumento && filters.tipoDocumento !== "todos") {
      result = result.filter((row) => {
        const forma = (row as DocumentoFilaLista).formaPago
        return forma === filters.tipoDocumento
      })
    }

    // 3. Filtro por estado
    if (filters.estado && filters.estado !== "todos") {
      result = result.filter((row) => {
        const estado = (row as DocumentoFilaLista).estado
        return estado === filters.estado
      })
    }

    // 4. Búsqueda libre: busca en número, nombre de cliente y documento
    if (filters.searchValue.trim()) {
      const query = filters.searchValue.trim().toLowerCase()
      result = result.filter((row) => {
        const doc = row as DocumentoFilaLista
        const cliente = row as ClienteFilaLista

        return (
          doc.numero?.toLowerCase().includes(query) ||
          doc.clienteNombre?.toLowerCase().includes(query) ||
          doc.clienteDocumento?.toLowerCase().includes(query) ||
          cliente.nombre?.toLowerCase().includes(query) ||
          cliente.numeroDocumento?.toLowerCase().includes(query)
        )
      })
    }

    return result
  }, [data, filters])
}
