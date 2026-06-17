"use client"

import { RegistrosSunatTemplate } from "../../../../_components/RegistrosSunatTemplate"
import { getEnviadasNotaCreditoColumns } from "../../config/columns"
import { type NotaEnviadaRow } from "@/app/(sistema)/(registros_sunat)/types/notas"
import notasCreditoData from "@/app/(sistema)/(registros_sunat)/data/notas/notas_credito.json"
import enviadasNotasCreditoData from "@/app/(sistema)/(registros_sunat)/data/notas/enviadas_notas_credito.json"
import notasDebitoData from "@/app/(sistema)/(registros_sunat)/data/notas/notas_debito.json"
import enviadasNotasDebitoData from "@/app/(sistema)/(registros_sunat)/data/notas/enviadas_notas_debito.json"
import cardsRaw from "@/app/(sistema)/(registros_sunat)/data/notas/cards.json"
import tabsRaw from "@/app/(sistema)/(registros_sunat)/data/notas/tabs.json"
import { type CardConfig } from "@/app/(sistema)/(registros_sunat)/types/card"
import { type TabConfig } from "@/app/(sistema)/(registros_sunat)/types/tab"

const cardConfigs = cardsRaw as CardConfig[]
const tabConfigs = tabsRaw as TabConfig[]

export default function Page() {
  const columns = getEnviadasNotaCreditoColumns()

  const cardCounts = {
    nota_credito_electronica: notasCreditoData.length + enviadasNotasCreditoData.length,
    nota_debito_electronica: notasDebitoData.length + enviadasNotasDebitoData.length,
  }

  const tabs = tabConfigs.map((tab) => {
    let count = 0
    if (tab.key === "nota_credito_electronica") {
      count = notasCreditoData.length
    } else if (tab.key === "enviadas_nota_credito") {
      count = enviadasNotasCreditoData.length
    } else if (tab.key === "nota_debito_electronica") {
      count = notasDebitoData.length
    } else if (tab.key === "enviadas_nota_debito") {
      count = enviadasNotasDebitoData.length
    }
    return {
      ...tab,
      count,
    }
  })

  return (
    <RegistrosSunatTemplate<NotaEnviadaRow>
      tabs={tabs}
      activeTab="enviadas_nota_credito"
      cardConfigs={cardConfigs}
      cardCounts={cardCounts}
      cardPeriodLabel="Resumen de Mayo del 2026"
      columns={columns}
      data={enviadasNotasCreditoData as NotaEnviadaRow[]}
      searchFields={["cliente", "rucDni", "codigo"]}
      dateField="fechaEmision"
    />
  )
}
