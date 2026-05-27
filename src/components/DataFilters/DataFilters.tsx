"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ActionButton } from "@/components/common/ActionButton"
import { Eraser } from "lucide-react"

interface DataFiltersProps {
    onSearch: () => void
    onReset: () => void
    children: React.ReactNode
    childClassNames?: string[]
}

export function DataFilters({ onSearch, onReset, children, childClassNames }: DataFiltersProps) {
    return (
        <div className="flex items-center gap-7 py-4 flex-wrap w-full">
            {/* Filtros dinámicos */}
            {React.Children.map(children, (child, index) => {
                const defaultClass = index === 0 ? "flex-[0_0_25%]" : "flex-1"
                const customClass = childClassNames?.[index] || defaultClass
                return (
                    <div
                        key={index}
                        className={`${customClass} min-w-0`}
                    >
                        {child}
                    </div>
                )
            })}

            {/* Acciones */}
            <div className="flex-[0_0_16%] flex gap-2">
                <Button
                    onClick={onSearch}
                    className="focus:bg-[#18a689] bg-[#1a5eb3] hover:bg-[#1a3bb3]! cursor-pointer text-white rounded h-9 flex-1 shrink-0 font-sans transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md "
                >
                    Buscar
                </Button>
                <ActionButton
                    icon={<Eraser className="w-4 h-4 " strokeWidth={2.5} />}
                    label="Limpiar filtros"
                    onClick={onReset}
                    className="w-9 p-0 shrink-0 bg-[#676A6C] hover:bg-[#5a6268]"
                />
            </div>
        </div>
    )
}