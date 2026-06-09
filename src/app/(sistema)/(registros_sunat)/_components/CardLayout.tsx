"use client"

import { SummaryCard } from "@/components/shared/SummaryCard"
import { type SummaryCardSlide } from "@/types/summary-card"
import { type CardConfig } from "../types/card"

interface CardLayoutProps {
  cardConfigs: CardConfig[]
  counts: Record<string, number>
  periodLabel?: string
}

export function CardLayout({
  cardConfigs,
  counts,
  periodLabel = "Resumen de Mayo del 2026",
}: CardLayoutProps) {
  return (
    <section className="bg-white rounded-none border border-gray-200 shadow-none">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 rounded-none bg-white">
        <span className="text-sm font-semibold text-[#676a6c] uppercase tracking-wider">
          {periodLabel}
        </span>
      </div>
      <div className="relative flex items-center px-4 pt-5 pb-6 bg-white rounded-none">
        <div className="flex flex-1 justify-around gap-4 px-8 items-center flex-wrap">
          {cardConfigs.map((card) => {
            const count = counts[card.key] ?? 0
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
              <div key={card.key} className="min-w-37.5 w-full max-w-60">
                <SummaryCard items={slide} size="lg" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}