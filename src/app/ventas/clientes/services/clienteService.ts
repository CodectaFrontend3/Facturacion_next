import { ClienteRow } from "../../types/cliente.types"
import mockData from "../../data/cliente-mock.json"

export interface FetchClientesFilters {
  search: string
  documento: string
  dateRange: { start: Date | null; end: Date | null }
}

export async function fetchClientes(filters: FetchClientesFilters): Promise<ClienteRow[]> {
  // Simulación de delay de red (500ms)
  await new Promise(resolve => setTimeout(resolve, 500))

  // 1. Filtrar los clientes
  let filteredData = mockData.filter((row: any) => {
    // Filtro por Buscador
    if (filters.search) {
      const term = filters.search.toLowerCase()
      const matchesSearch = row.nombre.toLowerCase().includes(term) ||
                            row.numeroDocumento.includes(term) ||
                            row.correo?.toLowerCase().includes(term)
      if (!matchesSearch) return false
    }

    // Filtro por Documento (DNI, RUC)
    if (filters.documento && filters.documento !== "Todos los Documentos") {
      if (row.tipoDocumento !== filters.documento) return false
    }

    // Filtro por Rango de Fechas (fechaRegistro: "YYYY-MM-DD" en el mock)
    if (filters.dateRange.start && filters.dateRange.end && row.fechaRegistro) {
      const start = filters.dateRange.start.getTime()
      const end = filters.dateRange.end.getTime()
      const rowDate = new Date(row.fechaRegistro).getTime() // En el mock está como "2024-01-20"
      
      if (rowDate < start || rowDate > end) return false
    }

    return true
  })

  // 2. Mapear el JSON (ClienteFormData) al formato que necesita la tabla (ClienteRow)
  const mappedData: ClienteRow[] = filteredData.map((row: any) => ({
    id: row.id,
    nombre: row.nombre,
    tipoDoc: row.tipoDocumento, 
    nroDoc: row.numeroDocumento, 
    correo: row.correo || "-", 
    celular: row.celular || "-",
    fechaRegistro: row.fechaRegistro || "-", // Idealmente formatearlo a DD-MM-YYYY si se desea
    acciones: ["eye"]
  }))

  return mappedData
}