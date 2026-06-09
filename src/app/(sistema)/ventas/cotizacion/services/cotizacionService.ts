import { CotizacionRow } from "../../types/cotizacion.types"
import { COMPROBANTE_TODOS_VALUES, rowMatchesComprobante } from "../../utils/comprobantePrefixes"
import { rowMatchesCliente } from "../../utils/clientesOptions"
import cotizacionData from "../../data/cotizacion.json"
import notaVentaData from "../../data/nota_venta.json"

const mockData = [
  ...cotizacionData,
  ...notaVentaData,
]

export interface FetchCotizacionesFilters {
  tab: string
  search: string
  comprobante: string
  estado?: string
  clienteId?: string
  dateRange: { start: Date | null; end: Date | null }
}

/**
 * Servicio simulado para obtener los datos de la tabla.
 */
export async function fetchCotizaciones(filters: FetchCotizacionesFilters): Promise<CotizacionRow[]> {
  // Simulación de delay de red (500ms)
  await new Promise(resolve => setTimeout(resolve, 500))

  // TODO: Implementar lógica de llamado al backend con los filtros
  // Ejemplo: return axios.get('/api/cotizaciones', { params: filters }).then(res => res.data)

  // Filtramos la data mockeada por pestaña
  let filteredData = mockData.filter((row: any) => {
    if (filters.tab === "renovacion") {
      return row.renovacion?.isActive === true
    }
    return row.tab === filters.tab
  })

  // 1. Filtro por Buscador
  if (filters.search) {
    const term = filters.search.toLowerCase()
    filteredData = filteredData.filter((row: any) => 
      row.cliente.toLowerCase().includes(term) ||
      row.numero.toLowerCase().includes(term) ||
      row.rucDni.includes(term)
    )
  }

  // 2. Filtro por Comprobante (prefijo en número: COTF/CMF, COTB/CMB, COTV/CMV)
  if (
    filters.comprobante &&
    !COMPROBANTE_TODOS_VALUES.includes(filters.comprobante as (typeof COMPROBANTE_TODOS_VALUES)[number])
  ) {
    filteredData = filteredData.filter((row: { numero: string }) =>
      rowMatchesComprobante(row.numero, filters.comprobante, filters.tab)
    )
  }

  // 2c. Filtro por Estado (solo renovación)
  if (filters.tab === "renovacion" && filters.estado && filters.estado !== "Estados") {
    const estadoFiltro = filters.estado.toLowerCase()
    filteredData = filteredData.filter(
      (row) => String((row as { estado?: string }).estado ?? "").toLowerCase() === estadoFiltro
    )
  }

  // 2b. Filtro por Cliente (solo nota de venta, datos desde cliente.json)
  if (filters.tab === "nota-venta" && filters.clienteId) {
    filteredData = filteredData.filter((row: any) =>
      rowMatchesCliente(row as { cliente?: string; rucDni?: string; clienteId?: string }, filters.clienteId!)
    )
  }

  // 3. Filtro por Fechas (emision: "18/04/2026" o "04-05-2026")
  if (filters.dateRange.start && filters.dateRange.end) {
    const start = filters.dateRange.start.getTime()
    const end = filters.dateRange.end.getTime()

    filteredData = filteredData.filter((row: any) => {
      if (!row.emision) return false
      const separator = row.emision.includes("/") ? "/" : "-"
      const [day, month, year] = row.emision.split(separator)
      const rowDate = new Date(`${year}-${month}-${day}`).getTime()
      if (Number.isNaN(rowDate)) return false
      return rowDate >= start && rowDate <= end
    })
  }

  // 4. Mapear campos del nuevo JSON al formato que espera CotizacionRow
  const mappedData: CotizacionRow[] = filteredData.map((row: any) => ({
    id: row.id,
    numero: row.numero,
    rucDni: row.rucDni,
    cliente: row.clienteNombre ?? row.cliente ?? "",
    emision: row.fechaEmision
      ? new Date(row.fechaEmision).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
      : (row.emision ?? ""),
    forma: row.formaPago ?? row.forma ?? "",
    importeT: row.totales?.total != null
      ? `S/ ${Number(row.totales.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : (row.importeT ?? ""),
    acciones: row.acciones ?? [],
    compartir: row.compartir ?? [],
    // Campos extra para renovacion
    vencimiento: row.fechaVencimiento
      ? new Date(row.fechaVencimiento).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
      : (row.vencimiento ?? ""),
    dias: row.validezDias != null ? String(row.validezDias) : (row.dias ?? ""),
    estado: row.estado ?? "",
    tab: row.tab,
  }))

  return mappedData
}