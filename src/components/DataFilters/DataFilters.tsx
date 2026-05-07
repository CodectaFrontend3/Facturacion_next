"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface DataFiltersProps {
    onSearch: () => void
    onReset: () => void
    children: React.ReactNode
}

export function DataFilters({ onSearch, onReset, children }: DataFiltersProps) {
    return (
        <div className="flex items-center gap-7 py-4 flex-wrap w-full">
            {/* Filtros dinámicos */}
            {React.Children.map(children, (child, index) => (
                <div
                    key={index}
                    className={index === 0 ? "flex-[0_0_33%]" : "flex-1"}
                >
                    {child}
                </div>
            ))}

            {/* Botón Buscar */}
            <div className="flex-[0_0_16%]">
                <Button
                    onClick={onSearch}
                    className="bg-[#1D549F] hover:bg-[#15407A] text-white rounded h-9 w-full shrink-0 font-sans transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                    Buscar
                </Button>
            </div>
        </div>
    )
}