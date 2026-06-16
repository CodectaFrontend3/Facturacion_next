"use client"

import { RegistrosSunatTemplate } from "../../../../_components/RegistrosSunatTemplate"
import { getEnviadasGuiasColumns, type GuiaRow } from "../../config/columns"
import guiasElectronicasData from "@/app/(sistema)/(registros_sunat)/data/guias/guias_electronicas.json"
import enviadasGuiasElectronicasData from "@/app/(sistema)/(registros_sunat)/data/guias/enviadas_guias_electronicas.json"
import guiasManualesData from "@/app/(sistema)/(registros_sunat)/data/guias/guias_m_electronicas.json"
import enviadasGuiasManualesData from "@/app/(sistema)/(registros_sunat)/data/guias/enviadas_guias_m_electronicas.json"
import cardsRaw from "@/app/(sistema)/(registros_sunat)/data/guias/cards.json"
import tabsRaw from "@/app/(sistema)/(registros_sunat)/data/guias/tabs.json"
import { type CardConfig } from "@/app/(sistema)/(registros_sunat)/types/card"
import { type TabConfig } from "@/app/(sistema)/(registros_sunat)/types/tab"

const cardConfigs = cardsRaw as CardConfig[]
const tabConfigs = tabsRaw as TabConfig[]

export default function Page() {
  const columns = getEnviadasGuiasColumns()

  const cardCounts = {
    guias_electronicas: guiasElectronicasData.length + enviadasGuiasElectronicasData.length,
    guias_m_electronicas: guiasManualesData.length + enviadasGuiasManualesData.length,
  }

  const tabs = tabConfigs.map((tab) => {
    let count = 0
    if (tab.key === "guias_electronicas") {
      count = guiasElectronicasData.length
    } else if (tab.key === "enviadas_guias_electronicas") {
      count = enviadasGuiasElectronicasData.length
    } else if (tab.key === "guias_m_electronicas") {
      count = guiasManualesData.length
    } else if (tab.key === "enviadas_guias_m_electronicas") {
      count = enviadasGuiasManualesData.length
    }
    return {
      ...tab,
      count,
    }
  })

  return (
    <RegistrosSunatTemplate<GuiaRow>
      tabs={tabs}
      activeTab="enviadas_guias_electronicas"
      cardConfigs={cardConfigs}
      cardCounts={cardCounts}
      cardPeriodLabel="Resumen de Mayo del 2026"
      columns={columns}
      data={enviadasGuiasElectronicasData as GuiaRow[]}
      searchFields={["cliente", "rucDni", "codigo"]}
      dateField="fechaEmision"
    />
  )
}
