import { CotizacionRow } from "../../types/cotizacion.types"
import mockData from "../../data/cotizaciones-mock.json"

export interface FetchCotizacionesFilters {
  tab: string
  search: string
  comprobante: string
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
  let filteredData = mockData.filter((row: any) => row.tab === filters.tab)

  // 1. Filtro por Buscador
  if (filters.search) {
    const term = filters.search.toLowerCase()
    filteredData = filteredData.filter((row: any) => 
      row.cliente.toLowerCase().includes(term) ||
      row.numero.toLowerCase().includes(term) ||
      row.rucDni.includes(term)
    )
  }

  // 2. Filtro por Comprobante
  if (filters.comprobante && filters.comprobante !== "Todos los comprobantes") {
    // Si tu mockData tuviera un campo comprobante (ej. Factura, Boleta), se filtraría aquí
    // filteredData = filteredData.filter(row => row.comprobante === filters.comprobante)
  }

  // 3. Filtro por Fechas (emision: "18/04/2026")
  if (filters.dateRange.start && filters.dateRange.end) {
    const start = filters.dateRange.start.getTime()
    const end = filters.dateRange.end.getTime()
    
    filteredData = filteredData.filter((row: any) => {
      if (!row.emision) return false
      const [day, month, year] = row.emision.split("/")
      const rowDate = new Date(`${year}-${month}-${day}`).getTime()
      return rowDate >= start && rowDate <= end
    })
  }

  return filteredData
}
