// _hooks/useDocumentoForm.ts
"use client"

import { useState, useCallback, useMemo } from "react"
import {
  ItemCotizacion,
  ItemCotizacionManual,
  ItemNotaVenta
} from "../_domain/types/documento.types"
import {DocumentoTipo} from "../_domain/types/shared.types"
import { RenovacionConfig } from "../_domain/types/shared.types"
import { ArticuloDetalle } from "../_domain/types/catalogo.types"
import {
  calcularTotalesCotizacion,
  calcularTotalesCotizacionManual,
  calcularTotalesNotaVenta,
  TotalesFinancieros,
} from "../_utils/calculations"
import { areIdsEqual } from "../_utils/idNormalizer"

// Unión de los 3 tipos de item según el documento que se está creando
export type DocumentoItem = ItemCotizacion | ItemCotizacionManual | ItemNotaVenta

const crearItemVacio = (tipo: DocumentoTipo): DocumentoItem => {
  const base = {
    id: Math.random().toString(36).substring(2, 9),
    articuloId: "",
    descripcion: "",
    cantidad: 0,
  }

  if (tipo === "cotizacion") {
    return { ...base, descuentoPorcentajeAplicado: false } as ItemCotizacion
  }
  // cotizacion_manual y nota_venta comparten la misma forma (precioAsignado)
  return { ...base, precioAsignado: 0 } as ItemCotizacionManual | ItemNotaVenta
}

interface UseDocumentoFormOptions {
  tipo: DocumentoTipo
  articulosMaster: ArticuloDetalle[]
  /** % del comisionista seleccionado (solo aplica a cotización), afecta el Total general */
  porcentajeComision?: number
}

export function useDocumentoForm({ tipo, articulosMaster, porcentajeComision = 0 }: UseDocumentoFormOptions) {
  // Inicia con una fila vacía para que el usuario vea la tabla lista de inmediato
  const [items, setItems] = useState<DocumentoItem[]>([crearItemVacio(tipo)])

  const [renovacion, setRenovacion] = useState<RenovacionConfig>({
    isActive: false,
    fechaRenovacion: null,
  })

  // --- ACCIONES SOBRE LAS FILAS ---

  const addItem = useCallback(
    (articuloId?: string, cantidad: number = 1) => {
      const articulo = articuloId
        ? articulosMaster.find((a) => areIdsEqual(a.id, articuloId))
        : undefined

      const nuevoItem: DocumentoItem = {
        id: Math.random().toString(36).substring(2, 9),
        articuloId: articuloId ?? "",
        descripcion: articulo?.nombre ?? "",
        cantidad,
        ...(tipo === "cotizacion"
          ? { descuentoPorcentajeAplicado: false }
          : { precioAsignado: articulo?.precio ?? 0 }),
      } as DocumentoItem

      setItems((prev) => [...prev, nuevoItem])
    },
    [tipo, articulosMaster]
  )

  const updateItem = useCallback(
    (id: string, field: string, value: any) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item

          const updated: any = { ...item, [field]: value }

          // Si cambia el artículo seleccionado, autocompleta descripción
          // y, para manual/nota de venta, sugiere el precio de catálogo.
          if (field === "articuloId") {
            const articulo = articulosMaster.find((a) => areIdsEqual(a.id, value))
            if (articulo) {
              updated.descripcion = articulo.nombre
              if (tipo !== "cotizacion") {
                updated.precioAsignado = articulo.precio
              }
              if (tipo === "cotizacion") {
                updated.descuentoPorcentajeAplicado = false
              }
            }
          }

          return updated
        })
      )
    },
    [tipo, articulosMaster]
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        if (prev.length <= 1) {
          // No se permite dejar la tabla sin filas: se limpia la única fila restante
          return [crearItemVacio(tipo)]
        }
        return prev.filter((item) => item.id !== id)
      })
    },
    [tipo]
  )

  // --- TOTALES (según la regla de negocio real de cada tipo de documento) ---

  const totals: TotalesFinancieros = useMemo(() => {
    // Solo calculamos sobre items que ya tienen un artículo seleccionado
    const itemsValidos = items.filter((item) => item.articuloId)

    switch (tipo) {
      case "cotizacion":
        return calcularTotalesCotizacion(itemsValidos as ItemCotizacion[], articulosMaster, porcentajeComision)
      case "cotizacion_manual":
        return calcularTotalesCotizacionManual(itemsValidos as ItemCotizacionManual[])
      case "nota_venta":
        return calcularTotalesNotaVenta(itemsValidos as ItemNotaVenta[])
    }
  }, [tipo, items, articulosMaster, porcentajeComision])
  
  return {
    items,
    renovacion,
    totals,
    actions: {
      addItem,
      updateItem,
      removeItem,
      setRenovacion,
      setItems,
    },
  }
}
