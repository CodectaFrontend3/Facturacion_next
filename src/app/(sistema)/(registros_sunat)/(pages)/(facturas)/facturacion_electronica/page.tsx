"use client"
import { RegistrosSunatTemplate } from "../../../_components/RegistrosSunatTemplate"
import { getFacturacionColumns } from "../config/columns"
import facturasData from "@/app/(sistema)/(registros_sunat)/data/facturacion/facturas.json"
import enviadasFacturasData from "@/app/(sistema)/(registros_sunat)/data/facturacion/enviadas_facturas.json"
import facturaManualData from "@/app/(sistema)/(registros_sunat)/data/facturacion/factura_manual.json"
import enviadasManualData from "@/app/(sistema)/(registros_sunat)/data/facturacion/enviadas_manual.json"
import detraccionesData from "@/app/(sistema)/(registros_sunat)/data/facturacion/detracciones.json"
import cardsRaw from "@/app/(sistema)/(registros_sunat)/data/facturacion/cards.json"
import tabsRaw from "@/app/(sistema)/(registros_sunat)/data/facturacion/tabs.json"
import { type FacturacionRow } from "@/app/(sistema)/(registros_sunat)/types/facturacion"
import { type CardConfig } from "@/app/(sistema)/(registros_sunat)/types/card"
import { type TabConfig } from "@/app/(sistema)/(registros_sunat)/types/tab"

const cardConfigs = cardsRaw as CardConfig[]
const tabConfigs = tabsRaw as TabConfig[]

export default function Page() {
  const columns = getFacturacionColumns()

  // Calcular conteos de tarjetas acumulando los datos de cada archivo json
  const cardCounts = {
    facturas: facturasData.length + enviadasFacturasData.length,
    facturacionManual: facturaManualData.length + enviadasManualData.length,
    detracciones: detraccionesData.length,
  }

  // Mapear los conteos en las pestañas
  const tabs = tabConfigs.map((tab) => {
    let count = 0
    if (tab.key === "facturas") {
      count = facturasData.length
    } else if (tab.key === "factura_manual") {
      count = facturaManualData.length
    } else if (tab.key === "detracciones") {
      count = detraccionesData.length
    }
    return {
      ...tab,
      count,
    }
  })

  const handleSend = (selectedRows: FacturacionRow[]) => {
    console.log("Enviar facturas seleccionadas a SUNAT:", selectedRows)
  }

  return (
    <RegistrosSunatTemplate<FacturacionRow>
      tabs={tabs}
      activeTab="facturas"
      cardConfigs={cardConfigs}
      cardCounts={cardCounts}
      cardPeriodLabel="Resumen de Mayo del 2026"
      columns={columns}
      data={facturasData as FacturacionRow[]}
      onSend={handleSend}
      sendButtonLabel="Enviar"
      searchFields={["cliente", "rucDni", "codigo"]}
      dateField="fechaEmision"
    />
  )
}
