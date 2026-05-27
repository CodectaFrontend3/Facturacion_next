"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Tab {
  key: string
  label: string
  count: number
  color: string
  href: string
}

interface TabsNavProps {
  tabs: Tab[]
}

export function TabsNav({ tabs }: TabsNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center ">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
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
            <span
              className="flex items-center justify-center w-5 h-5 rounded-[3px] text-white text-[10px]"
              style={{ backgroundColor: tab.color }}
            >
              {tab.count}
            </span>
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
