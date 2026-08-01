// _hooks/ventas/useVentasData.ts
"use client"

import { useState, useEffect } from "react"

import { documentoService } from "../../_services/documentoService"
import { clienteService } from "../../_services/clienteService"
import { catalogoService } from "../../_services/catalogoService"

import {
  mapCotizacionToFilaLista,
  mapCotizacionManualToFilaLista,
  mapNotaVentaToFilaLista,
  mapToRenovacionFilaLista,
  mapToClienteFilaLista,
} from "../../_domain/mappers"

import { DocumentoFilaLista, RenovacionFilaLista } from "../../_domain/types/documento.types"
import { ClienteFilaLista } from "../../_domain/types/cliente.types"

export interface VentasDataState {
  cotizaciones: DocumentoFilaLista[]
  cotizacionesManuales: DocumentoFilaLista[]
  notasVenta: DocumentoFilaLista[]
  renovaciones: RenovacionFilaLista[]
  clientes: ClienteFilaLista[]
  isLoading: boolean
  error: string | null
}

const INITIAL_STATE: VentasDataState = {
  cotizaciones: [],
  cotizacionesManuales: [],
  notasVenta: [],
  renovaciones: [],
  clientes: [],
  isLoading: true,
  error: null,
}

export const useVentasData = (): VentasDataState => {
  const [state, setState] = useState<VentasDataState>(INITIAL_STATE)

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      try {
        // Carga paralela de todas las fuentes de datos
        const [
          { cotizaciones, manuales, notas },
          clientesRaw,
          articulosMaster,
          renovacionesRaw,
        ] = await Promise.all([
          documentoService.getAllCombined(),
          clienteService.getAll(),
          catalogoService.getArticulos(),
          documentoService.getRenovaciones(),
        ])

        if (!isMounted) return

        // Mapeo de cada colección a su vista plana de lista
        const cotizacionesMapped = cotizaciones.map((c) =>
          mapCotizacionToFilaLista(c, clientesRaw, articulosMaster)
        )

        const manualesMapped = manuales.map((m) =>
          mapCotizacionManualToFilaLista(m, clientesRaw)
        )

        const notasMapped = notas.map((n) =>
          mapNotaVentaToFilaLista(n, clientesRaw)
        )

        const renovacionesMapped = renovacionesRaw.map((r) =>
          mapToRenovacionFilaLista(r, clientesRaw, articulosMaster)
        )

        const clientesMapped = clientesRaw.map(mapToClienteFilaLista)

        setState({
          cotizaciones: cotizacionesMapped,
          cotizacionesManuales: manualesMapped,
          notasVenta: notasMapped,
          renovaciones: renovacionesMapped,
          clientes: clientesMapped,
          isLoading: false,
          error: null,
        })
      } catch (err) {
        if (!isMounted) return
        console.error("[useVentasData] Error al cargar datos:", err)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "No se pudieron cargar los datos. Intente nuevamente.",
        }))
      }
    }

    fetchAll()
    return () => { isMounted = false }
  }, [])

  return state
}
