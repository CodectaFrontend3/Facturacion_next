"use client"

import { ReactNode } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SummaryCard } from "../types"

interface SummarySectionProps {
  summaryCards: SummaryCard[]
  plugin: any
}

export function SummarySection({ summaryCards, plugin }: SummarySectionProps) {
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
                    return (
                      <div key={card.label} className="flex flex-col items-center gap-4 min-w-[150px]">
                        <Carousel
                          opts={{ loop: true }}
                          plugins={[plugin.current]}
                          onMouseEnter={() => plugin.current.stop()}
                          onMouseLeave={() => plugin.current.play()}
                          className="w-full max-w-[150px]"
                        >
                          <CarouselContent>
                            <CarouselItem>
                              <div className="flex flex-col items-center gap-4 min-w-0">
                                <div
                                  className="flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 bg-white"
                                  style={{ borderColor: card.borderColor }}
                                >
                                  {card.icon}
                                </div>
                                <div className="text-center">
                                  <p className="text-base font-bold text-[#2d3748]">{card.label}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {card.documents} Documentos
                                  </p>
                                  <p className="text-base font-bold mt-1.5" style={{ color: card.amountColor }}>
                                    {card.amount}
                                  </p>
                                </div>
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className="flex flex-col items-center gap-4 min-w-0">
                                <div
                                  className="flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 bg-white"
                                  style={{ borderColor: "#6b7280" }}
                                >
                                  <i className="bi bi-arrow-repeat text-[55px] text-black leading-none font-bold" />
                                </div>
                                <div className="text-center">
                                  <p className="text-base font-bold text-[#2d3748]">Renovación</p>
                                  <p className="text-sm text-gray-500 mt-1">0 Documentos</p>
                                  <p className="text-base font-bold mt-1.5" style={{ color: "#6b7280" }}>S/ 0.00</p>
                                </div>
                              </div>
                            </CarouselItem>
                          </CarouselContent>
                          <CarouselPrevious className="-left-6 bg-white border border-gray-200 text-[#1a5eb3] hover:bg-[#1a3bb3] hover:text-white shadow-md transition-all duration-300" />
                          <CarouselNext className="-right-6 bg-white border border-gray-200 text-[#1a5eb3] hover:bg-[#1a3bb3] hover:text-white shadow-md transition-all duration-300" />
                        </Carousel>
                      </div>
                    )
                  }

                  return (
                    <div key={card.label} className="flex flex-col items-center gap-4 min-w-0">
                      <div
                        className="flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 bg-white"
                        style={{ borderColor: card.borderColor }}
                      >
                        {card.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-base font-bold text-[#2d3748]">{card.label}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {card.documents} {card.label === "Clientes" ? "Clientes" : "Documentos"}
                        </p>
                        <p
                          className={`text-base font-bold mt-1.5 ${card.label === "Clientes" ? "invisible" : ""}`}
                          style={{ color: card.amountColor }}
                        >
                          {card.amount}
                        </p>
                      </div>
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
