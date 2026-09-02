"use client"

import { EstadoPieChart } from "./EstadoPieChart"
import { MarcasBarChart } from "./MarcasBarChart"

interface BarDataItem {
  name: string
  count: number
}

interface DashboardResumenProps {
  titulo: string
  totalLabel: string
  totalCount: number
  estadoData: { name: string; value: number; color: string }[]
  barData: BarDataItem[]
  barLabel: string
}

export function DashboardResumen({
  titulo,
  totalLabel,
  totalCount,
  estadoData,
  barData,
  barLabel,
}: DashboardResumenProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-none p-4 rounded-none flex flex-col w-full shrink-0">
      <div className="text-[13px] font-bold text-gray-700 pb-3 border-b border-gray-100 mb-4 shrink-0">
        {titulo}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <EstadoPieChart data={estadoData} totalLabel={totalLabel} totalCount={totalCount} />
        <MarcasBarChart data={barData} barLabel={barLabel} />
      </div>
    </div>
  )
}
