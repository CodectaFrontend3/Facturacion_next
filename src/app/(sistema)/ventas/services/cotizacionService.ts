import { CotizacionRow } from "../types"
import mockData from "../data/cotizaciones-mock.json"

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

  // Filtramos la data mockeada por pestaña o por renovación activa
  let filteredData = []

  if (filters.tab === "renovacion") {
    filteredData = mockData.filter((row: any) => row.renovacion?.isActive === true)
  } else {
    filteredData = mockData.filter((row: any) => row.tab === filters.tab)
  }

  return filteredData
}
