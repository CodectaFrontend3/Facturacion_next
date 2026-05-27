"use client"
import { SummaryCard } from "@/components/shared/SummaryCard"
import { type SummaryCardSlide } from "@/types/summary-card"
import { type CardConfig } from "../types"
import cardsRaw from "../data/cards.json"
const cardConfigs: CardConfig[] = cardsRaw as CardConfig[]
interface CardLayoutProps {
  counts: {
    facturas: number
    facturacionManual: number
    detracciones: number
  }
}
export function CardLayout({ counts }: CardLayoutProps) {
  return (
    <section className="bg-white rounded-md border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 rounded-t-md bg-white">
        <span className="text-sm font-semibold text-[#676a6c] uppercase tracking-wider">
          Resumen de Mayo del 2026
        </span>
      </div>
      <div className="relative flex items-center px-4 pt-5 pb-6 bg-white rounded-b-md">
        <div className="flex flex-1 justify-around gap-4 px-8 items-center flex-wrap">
          {cardConfigs.map((card) => {
            let count = 0
            if (card.key === "facturas") count = counts.facturas
            else if (card.key === "facturacionManual") count = counts.facturacionManual
            else if (card.key === "detracciones") count = counts.detracciones
            const slide: SummaryCardSlide[] = [
              {
                icon: () => <i className={`${card.iconClass} text-white text-5xl! w-10 h-10 flex! items-center! justify-center!`} />,
                label: card.label,
                count: `${count} Documentos`,
                tone: {
                  ring: card.ringColorClass,
                  icon: "text-white!",
                  amount: "",
                },
                meta: {
                  label: card.metaLabel,
                },
              },
            ]
            return (
              <div key={card.key} className="min-w-[150px] w-full max-w-[240px]">
                <SummaryCard items={slide} size="lg" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}