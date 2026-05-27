"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SummaryCard as SharedSummaryCard } from "@/components/shared/SummaryCard"
import { SummaryCardSlide } from "@/types/summary-card"
import { SummaryCard } from "../types"

interface SummarySectionProps {
  summaryCards: SummaryCard[]
}

export function SummarySection({ summaryCards }: SummarySectionProps) {
  return (
    <section className="bg-white rounded-md border border-gray-200 shadow-sm">
      <Accordion type="single" collapsible defaultValue="resumen">
        <AccordionItem value="resumen" className="border-none">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 rounded-t-md bg-white">
            <span className="text-sm font-semibold text-[#676a6c]">Resumen de Abril 2026</span>
            <AccordionTrigger className="p-1 cursor-pointer bg-white hover:bg-white hover:no-underline rounded-md [&>svg]:!hidden">
              <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180"></i>
            </AccordionTrigger>
          </div>
          <AccordionContent className="pb-0">
            <div className="relative flex items-center px-4 pt-5 pb-6">
              <div className="flex flex-1 justify-around gap-4 px-8 items-center">
                {summaryCards.map((card) => {
                  if (card.label === "Cotización Manual") {
                    const manualSlides: SummaryCardSlide[] = [
                      {
                        icon: () => <>{card.icon}</>,
                        label: card.label,
                        count: `${card.documents} Documentos`,
                        amount: card.amount,
                        tone: {
                          ring: card.borderColorClass,
                          icon: "",
                          amount: card.amountColorClass
                        }
                      },
                      {
                        icon: () => <i className="bi bi-arrow-repeat text-[55px] text-black leading-none font-bold" />,
                        label: "Renovación",
                        count: "0 Documentos",
                        amount: "S/ 0.00",
                        tone: {
                          ring: "border-[#6b7280]",
                          icon: "",
                          amount: "text-[#6b7280]"
                        }
                      }
                    ]
                    
                    return (
                      <div key={card.label} className="min-w-[150px]">
                        <SharedSummaryCard items={manualSlides} size="lg" />
                      </div>
                    )
                  }

                  const singleSlide: SummaryCardSlide[] = [{
                    icon: () => <>{card.icon}</>,
                    label: card.label,
                    count: `${card.documents} ${card.label === "Clientes" ? "Clientes" : "Documentos"}`,
                    amount: card.label === "Clientes" ? "" : card.amount,
                    tone: {
                      ring: card.borderColorClass,
                      icon: "",
                      amount: card.amountColorClass
                    }
                  }]

                  return (
                    <div key={card.label} className="min-w-[150px]">
                      <SharedSummaryCard items={singleSlide} size="lg" />
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
