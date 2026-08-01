// _components/ventas/SummarySection.tsx
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SummaryCard } from "@/components/shared/SummaryCard"
import { SummaryCardSlide } from "@/types/summary-card"
import { SummaryCardConfig } from "../../_config/summaryCards"

// Datos de una card con su valor calculado
export interface SummaryCardData extends SummaryCardConfig {
  documents: number
  amount: string
}

interface SummarySectionProps {
  summaryCards: SummaryCardData[]
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

// Íconos bi por key, igual que en ventas/components/VentasTabTemplate
const BI_ICONS: Record<string, string> = {
  cotizacion: "bi-file-earmark-text",
  cotizacionManual: "bi-file-earmark-text",
  notaVenta: "bi-file-earmark",
  clientes: "bi-person",
  renovacion: "bi-arrow-repeat",
}

export function SummarySection({ summaryCards }: SummarySectionProps) {
  const now = new Date()
  const title = `Resumen de ${MONTHS[now.getMonth()]} ${now.getFullYear()}`

  // Separar renovación (va dentro del carousel de cotizacionManual)
  const renovacionCard = summaryCards.find((c) => c.key === "renovacion")
  const cardsVisibles = summaryCards.filter((c) => c.key !== "renovacion")

  return (
    <section className="bg-white border border-gray-200 shadow-sm">
      <Accordion type="single" collapsible defaultValue="resumen">
        <AccordionItem value="resumen" className="border-none">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
            <span className="text-sm font-semibold text-[#676a6c]">{title}</span>
            <AccordionTrigger className="p-1 cursor-pointer bg-white hover:bg-white hover:no-underline rounded-md [&>svg]:!hidden">
              <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
            </AccordionTrigger>
          </div>

          <AccordionContent className="pb-0">
            <div className="relative flex items-center px-4 pt-5 pb-6">
              <div className="flex flex-1 justify-around gap-4 px-8 items-center">
                {cardsVisibles.map((card) => {
                  const biClass = BI_ICONS[card.key] ?? "bi-file-earmark"

                  // CotizaciónManual → carousel con Renovación
                  if (card.key === "cotizacionManual") {
                    const slides: SummaryCardSlide[] = [
                      {
                        icon: () => (
                          <i className={`bi ${biClass} text-[55px] text-black leading-none`} />
                        ),
                        label: card.label,
                        count: `${card.documents} Documentos`,
                        amount: card.amount,
                        tone: {
                          ring: card.borderColorClass,
                          icon: "",
                          amount: card.amountColorClass,
                        },
                      },
                      {
                        icon: () => (
                          <i className="bi bi-arrow-repeat text-[55px] text-black leading-none font-bold" />
                        ),
                        label: renovacionCard?.label ?? "Renovación",
                        count: `${renovacionCard?.documents ?? 0} Documentos`,
                        amount: renovacionCard?.amount ?? "S/ 0.00",
                        tone: {
                          ring: renovacionCard?.borderColorClass ?? "border-[#808080]",
                          icon: "",
                          amount: renovacionCard?.amountColorClass ?? "text-[#808080]",
                        },
                      },
                    ]

                    return (
                      <div key={card.key} className="min-w-[150px]">
                        <SummaryCard items={slides} size="lg" />
                      </div>
                    )
                  }

                  // Resto de cards: slide único
                  const singleSlide: SummaryCardSlide[] = [
                    {
                      icon: () => (
                        <i className={`bi ${biClass} text-[55px] text-black leading-none`} />
                      ),
                      label: card.label,
                      count: `${card.documents} ${card.key === "clientes" ? "Clientes" : "Documentos"}`,
                      amount: card.key === "clientes" ? "" : card.amount,
                      tone: {
                        ring: card.borderColorClass,
                        icon: "",
                        amount: card.amountColorClass,
                      },
                    },
                  ]

                  return (
                    <div key={card.key} className="min-w-[150px]">
                      <SummaryCard items={singleSlide} size="lg" />
                    </div>
                  )
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
