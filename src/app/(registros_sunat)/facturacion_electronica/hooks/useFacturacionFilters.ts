import { useTableData } from "@/hooks/useTableData"
import { FacturacionRow, FacturacionData } from "../types"
import mockDataRaw from "../data/facturacion.json"
import { parse, isValid, isWithinInterval } from "date-fns"

const mockData: FacturacionData = mockDataRaw as FacturacionData

const DATE_FORMAT_INPUT = "dd/MM/yyyy"
const DATE_FORMAT_DATA = "dd/MM/yyyy"

const filterFn = (data: FacturacionRow[], values: Record<string, string>) => {
  return data.filter((row) => {
    const matchSearch =
      !values.searchValue ||
      row.codigo.toLowerCase().includes(values.searchValue.toLowerCase()) ||
      row.cliente.toLowerCase().includes(values.searchValue.toLowerCase()) ||
      row.rucDni.toLowerCase().includes(values.searchValue.toLowerCase())

    let matchFecha = true
    if (values.dateFrom || values.dateTo) {
      const dateC = parse(row.fechaCreacion, DATE_FORMAT_DATA, new Date())
      const dateFrom = values.dateFrom ? parse(values.dateFrom, DATE_FORMAT_INPUT, new Date()) : null
      const dateTo = values.dateTo ? parse(values.dateTo, DATE_FORMAT_INPUT, new Date()) : null

      if (isValid(dateC)) {
        if (dateFrom && isValid(dateFrom) && dateTo && isValid(dateTo)) {
          matchFecha = isWithinInterval(dateC, { start: dateFrom, end: dateTo })
        } else if (dateFrom && isValid(dateFrom)) {
          matchFecha = dateC >= dateFrom
        } else if (dateTo && isValid(dateTo)) {
          matchFecha = dateC <= dateTo
        }
      }
    }

    return matchSearch && matchFecha
  })
}

export function useFacturacionFilters(activeTab: string) {
  let tabKey: keyof FacturacionData = "facturas"
  if (activeTab === "enviados_facturas") tabKey = "enviados_facturas"
  else if (activeTab === "factura_manual") tabKey = "factura_manual"
  else if (activeTab === "enviados_manual") tabKey = "enviados_manual"
  else if (activeTab === "detracciones") tabKey = "detracciones"

  const tabData = mockData[tabKey] || []

  const counts = {
    facturas: mockData.facturas.length,
    facturacionManual: mockData.factura_manual.length,
    detracciones: mockData.detracciones.length,
  }

  const tableDataState = useTableData({
    data: tabData,
    filterFn,
    initialFilters: {
      searchValue: "",
      dateFrom: "05/01/2026",
      dateTo: "05/31/2026",
    },
    pageSize: 10,
  })

  return {
    ...tableDataState,
    counts,
  }
}
