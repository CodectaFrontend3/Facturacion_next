"use client"

import { RegistrosSunatTemplate } from "../../../../_components/RegistrosSunatTemplate"
import { getEnviadasBoletasColumns } from "../../config/columns"
import boletasData from "@/app/(sistema)/(registros_sunat)/data/boletas/boletas.json"
import enviadasBoletasData from "@/app/(sistema)/(registros_sunat)/data/boletas/enviadas_boletas.json"
import boletasManualData from "@/app/(sistema)/(registros_sunat)/data/boletas/boletas_manuales.json"
import enviadasManualData from "@/app/(sistema)/(registros_sunat)/data/boletas/enviadas_boletas_manuales.json"
import cardsRaw from "@/app/(sistema)/(registros_sunat)/data/boletas/cards.json"
import tabsRaw from "@/app/(sistema)/(registros_sunat)/data/boletas/tabs.json"
import { type BoletaEnviadaRow } from "@/app/(sistema)/(registros_sunat)/types/boletas"
import { type CardConfig } from "@/app/(sistema)/(registros_sunat)/types/card"
import { type TabConfig } from "@/app/(sistema)/(registros_sunat)/types/tab"

const cardConfigs = cardsRaw as CardConfig[]
const tabConfigs = tabsRaw as TabConfig[]

export default function Page() {
  const columns = getEnviadasBoletasColumns()

  // Calcular conteos de tarjetas acumulando los datos de cada archivo json
  const cardCounts = {
    boletas: boletasData.length + enviadasBoletasData.length,
    boletasManuales: boletasManualData.length + enviadasManualData.length,
  }

  // Mapear los conteos en las pestañas
  const tabs = tabConfigs.map((tab) => {
    let count = 0
    if (tab.key === "boletas") {
      count = boletasData.length
    } else if (tab.key === "boletas_manuales") {
      count = boletasManualData.length
    }
    return {
      ...tab,
      count,
    }
  })

  return (
    <RegistrosSunatTemplate<BoletaEnviadaRow>
      tabs={tabs}
      activeTab="enviados_manual"
      cardConfigs={cardConfigs}
      cardCounts={cardCounts}
      cardPeriodLabel="Resumen de Mayo del 2026"
      columns={columns}
      data={enviadasManualData as BoletaEnviadaRow[]}
      searchFields={["cliente", "rucDni", "codigo"]}
      dateField="fechaEmision"
    />
  )
}
