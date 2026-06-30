// _hooks/ventas/useVentasSummary.ts
import { useMemo } from "react"
import { DocumentoFilaLista, RenovacionFilaLista } from "../../_domain/types/documento.types"
import { ClienteFilaLista } from "../../_domain/types/cliente.types"

interface SummaryResult {
  cotizacion: { documents: number; amount: number }
  cotizacionManual: { documents: number; amount: number }
  notaVenta: { documents: number; amount: number }
  clientes: { documents: number; amount: number }
  renovacion: { documents: number; amount: number }
}

export const useVentasSummary = (
  docs: DocumentoFilaLista[],
  clientes: ClienteFilaLista[] = [],
  renovaciones: RenovacionFilaLista[] = []
): SummaryResult => {
  return useMemo(() => {
    // Agrupa por tipo sin filtrar fechas
    // (cuando se conecte a una API real, el backend filtrará por período)
    const cotizacion = docs.filter((x) => x.tipo === "cotizacion")
    const cotizacionManual = docs.filter((x) => x.tipo === "cotizacion_manual")
    const notaVenta = docs.filter((x) => x.tipo === "nota_venta")

    const sumar = (arr: DocumentoFilaLista[]) =>
      arr.reduce((acc, x) => acc + (x.total ?? 0), 0)

    return {
      cotizacion: {
        documents: cotizacion.length,
        amount: sumar(cotizacion),
      },
      cotizacionManual: {
        documents: cotizacionManual.length,
        amount: sumar(cotizacionManual),
      },
      notaVenta: {
        documents: notaVenta.length,
        amount: sumar(notaVenta),
      },
      clientes: {
        documents: clientes.length,
        amount: 0,
      },
      renovacion: {
        documents: renovaciones.length,
        amount: renovaciones.reduce((acc, x) => acc + (x.total ?? 0), 0),
      },
    }
  }, [docs, clientes, renovaciones])
}
