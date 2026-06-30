// _components/ventas/TabsNav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TABS, TabConfig } from "../../_config/tabs"

interface TabsNavProps {
  /**
   * Mapa de counts por dataKey del tab.
   * Opcional: si no se pasa, los badges muestran 0.
   */
  counts?: Partial<Record<TabConfig["dataKey"], number>>
}

export const TabsNav = ({ counts = {} }: TabsNavProps) => {
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      {TABS.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + "/")

        const count = counts[tab.dataKey] ?? 0

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all relative top-[1px] ${
              isActive
                ? "bg-white border-x border-t border-gray-200 text-gray-800 rounded-t-sm"
                : "text-gray-500 border-x border-t border-transparent"
            }`}
          >
            {/* Badge con count */}
            <span
              className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-[3px] text-white text-[10px] font-bold"
              style={{ backgroundColor: tab.color }}
            >
              {count}
            </span>

            <span className="text-[13px] font-bold">{tab.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
