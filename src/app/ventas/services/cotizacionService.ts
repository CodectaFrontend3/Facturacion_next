import { CotizacionRow } from "../types"
import cotizacionData from "../data/cotizacion.json"
import cotizacionManualData from "../data/cotizacion_manual.json"
import notaVentaData from "../data/nota_venta.json"
import clientesData from "../data/clientes.json"
import renovacionData from "../data/renovacion.json"

export interface FetchCotizacionesFilters {
  tab: string
  search: string
  comprobante: string
  estado?: string
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

  let dataToReturn: CotizacionRow[] = [];

  switch (filters.tab) {
    case "cotizacion":
      dataToReturn = cotizacionData as CotizacionRow[];
      break;
    case "cotizacion-manual":
      dataToReturn = cotizacionManualData as CotizacionRow[];
      break;
    case "nota-venta":
      dataToReturn = notaVentaData as CotizacionRow[];
      break;
    case "clientes":
      dataToReturn = clientesData as CotizacionRow[];
      break;
    case "renovacion":
      dataToReturn = renovacionData as CotizacionRow[];
      break;
    default:
      dataToReturn = [];
  }

  // Filtrado local
  if (filters.search) {
    const s = filters.search.toLowerCase();
    dataToReturn = dataToReturn.filter(row => 
      row.cliente?.toLowerCase().includes(s) ||
      row.nombre?.toLowerCase().includes(s) ||
      row.numero?.toLowerCase().includes(s) ||
      row.rucDni?.includes(s) ||
      row.nroDoc?.includes(s)
    );
  }

  if (filters.comprobante && !filters.comprobante.includes("Todos")) {
    const comp = filters.comprobante.toLowerCase();
    dataToReturn = dataToReturn.filter(row => {
      if (filters.tab === "clientes") {
        return row.tipoDoc?.toLowerCase() === comp;
      }
      
      // Si el JSON tiene el campo explícito, lo usamos
      if (row.comprobante) {
        return row.comprobante.toLowerCase() === comp;
      }
      // Extraemos el prefijo antes del espacio (ej: COTF, CMB, NV)
      const num = row.numero?.toUpperCase() || "";
      const prefix = num.split(' ')[0] || "";
      
      if (comp === "factura") return prefix.includes("F");
      if (comp === "boleta") return prefix.includes("B");
      if (comp === "nota de venta") return prefix.includes("V");
      
      return true;
    });
  }

  if (filters.tab === "renovacion" && filters.estado && filters.estado !== "Estados") {
    const est = filters.estado.toLowerCase();
    dataToReturn = dataToReturn.filter(row => {
      // Si el JSON tiene el campo explícito, lo usamos
      if (row.estado) {
        return row.estado.toLowerCase() === est;
      }
      
      // Fallback a la heurística antigua por si algunos no tienen el campo
      const diasStr = row.dias || "";
      const isVencida = diasStr.includes("-");
      const isPorVencer = !isVencida && diasStr.includes("días") && parseInt(diasStr) <= 5;
      
      if (est === "vencida") return isVencida;
      if (est === "por vencer") return isPorVencer;
      if (est === "activa") return !isVencida;
      return true;
    });
  }

  // Filtrado por Fechas
  const getRowDate = (row: any): Date | null => {
    const dateStr = row.emision || row.fechaRegistro;
    if (!dateStr) return null;
    
    const parts = dateStr.split(/[-/]/);
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    }
    return null;
  };

  if (filters.dateRange.start || filters.dateRange.end) {
    const start = filters.dateRange.start;
    const end = filters.dateRange.end;
    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    dataToReturn = dataToReturn.filter(row => {
      const rowDate = getRowDate(row);
      if (!rowDate) return true;
      
      if (start && rowDate < start) return false;
      if (end && rowDate > end) return false;
      return true;
    });
  }

  return dataToReturn;
}
