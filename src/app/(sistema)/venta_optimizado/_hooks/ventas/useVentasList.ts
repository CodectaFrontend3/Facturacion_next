// _hooks/ventas/useVentasList.ts
"use client"

import { useMemo } from "react"
import { VentasFilters } from "./useVentasFilters"
import { DocumentoFilaLista, RenovacionFilaLista } from "../../_domain/types/documento.types"
import { ClienteFilaLista } from "../../_domain/types/cliente.types"
import { areIdsEqual } from "../../_utils/idNormalizer"


// Unión de los tipos que pueden ir en tabla
type FilaTabla = DocumentoFilaLista | RenovacionFilaLista | ClienteFilaLista

/**
 * Convierte una fecha en formato "DD/MM/YYYY" (la que entrega FilterDateRange)
 * a "YYYY-MM-DD" (la que usan fechaEmision / fechaRegistro en los datos).
 * Si ya viene en YYYY-MM-DD o está vacía, la devuelve tal cual.
 */
const normalizarFecha = (fecha: string): string => {
  if (!fecha) return ""
  // Ya está en formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha

  // Viene en formato DD/MM/YYYY
  const match = fecha.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (match) {
    const [, day, month, year] = match
    return `${year}-${month}-${day}`
  }

  return fecha
}


/**
 * Filtra un array de filas según los filtros activos.
 * Aplica: rango de fechas (fechaEmision / fechaRegistro), tipo de comprobante,
 * estado, cliente específico (clienteId, usado por el CboData de Nota de Venta) y búsqueda libre.
 */
export const useVentasList = <T extends FilaTabla>(
  data: T[],
  filters: VentasFilters
): T[] => {
  return useMemo(() => {
    let result = [...data]

    const dateFrom = normalizarFecha(filters.dateFrom)
    const dateTo = normalizarFecha(filters.dateTo)

    // 1. Filtro por rango de fechas
    //    Documentos usan fechaEmision; Clientes usan fechaRegistro.
    if (dateFrom) {
      result = result.filter((row) => {
        const fecha =
          (row as DocumentoFilaLista).fechaEmision ??
          (row as ClienteFilaLista).fechaRegistro
        return fecha ? fecha >= dateFrom : true
      })
    }

    if (dateTo) {
      result = result.filter((row) => {
        const fecha =
          (row as DocumentoFilaLista).fechaEmision ??
          (row as ClienteFilaLista).fechaRegistro
        return fecha ? fecha <= dateTo : true
      })
    }

    // 2. Filtro por tipo de comprobante (Factura/Boleta/Nota de Venta) o tipo de documento (DNI/RUC)
    //    El campo del filtro se llama "tipoDocumento" en VentasFilters por compatibilidad.
    if (filters.tipoDocumento && filters.tipoDocumento !== "todos") {
      result = result.filter((row) => {
        const doc = row as DocumentoFilaLista
        const cliente = row as ClienteFilaLista
        return (
          doc.tipoComprobante === filters.tipoDocumento ||
          cliente.tipoDocumento === filters.tipoDocumento
        )
      })
    }

    // 3. Filtro por estado (cards de Renovación: activo / por_vencer / vencido)
    if (filters.estado && filters.estado !== "todos") {
      result = result.filter((row) => {
        const fila = row as DocumentoFilaLista & RenovacionFilaLista
        return fila.alertaVisual === filters.estado || fila.estado === filters.estado
      })
    }

    // 4. Filtro por cliente específico (usado en Nota de Venta vía CboData)
    if (filters.clienteId && filters.clienteId !== "todos" && filters.clienteId !== "") {
      result = result.filter((row) => {
        const doc = row as DocumentoFilaLista
        const cliente = row as ClienteFilaLista
        return areIdsEqual(doc.clienteId, filters.clienteId) || areIdsEqual(cliente.id, filters.clienteId)
      })
    }

    // 5. Búsqueda libre: busca en número, nombre de cliente y documento
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
