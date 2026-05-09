"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface CboItem {
    value: string
    label: string
}

export interface CboDataProps {
    items: CboItem[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    searchPlaceholder?: string
    className?: string
    disabled?: boolean
}

export function CboData({
    items,
    value,
    onChange,
    placeholder = "Seleccionar",
    searchPlaceholder = "Buscar...",
    className,
    disabled
}: CboDataProps) {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredItems = React.useMemo(() => {
        if (!searchQuery) return items
        const lowerQuery = searchQuery.toLowerCase()
        return items.filter((item) =>
            item.label.toLowerCase().includes(lowerQuery)
        )
    }, [items, searchQuery])

    const selectedItem = items.find((item) => item.value === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "flex min-h-[36px] w-full items-center cursor-pointer justify-between rounded-sm border border-gray-300 bg-white px-3 py-1.5 text-[13px] text-[#676A6C] outline-none focus:border-[#18a689] focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                        !selectedItem && "text-gray-500",
                        className
                    )}
                >
                    <span className="truncate flex-1 text-left mr-2 min-w-0">
                        {selectedItem ? selectedItem.label : placeholder}
                    </span>
                    <svg
                        className="h-4 w-4 opacity-50 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0 rounded-sm border border-[#aaa] shadow-md" align="start">
                <div className="flex flex-col">
                    <div className="p-2 border-b border-gray-200">
                        <input
                            type="text"
                            className="h-6 w-full border border-[#aaa] p-1 text-[13px] outline-none rounded-none shadow-none font-sans bg-white"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="max-h-60 overflow-auto py-1">
                        {filteredItems.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-500">
                                No se encontraron resultados.
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <div
                                    key={item.value}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center px-3 py-2 text-[13px] outline-none transition-colors",
                                        value === item.value
                                            ? "bg-[#ddd] text-[#676A6C] hover:bg-[#5897fb] hover:text-white"
                                            : "text-gray-700 hover:bg-[#5897fb] hover:text-white"
                                    )}
                                    onClick={() => {
                                        onChange?.(item.value)
                                        setOpen(false)
                                        setSearchQuery("")
                                    }}
                                >
                                    <span className="line-clamp-2 block flex-1 min-w-0 leading-tight">{item.label}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
