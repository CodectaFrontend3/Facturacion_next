"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ActionButton } from "@/components/common/ActionButton"
import { Eraser } from "lucide-react"

interface DataFiltersProps {
    onSearch: () => void
    onReset: () => void
    children: React.ReactNode
}

/**
 * - Fechas: 30%
 * - Select(s): 25% total (repartido si hay más de uno)
 * - Buscar (input): 30%
 * - Acciones (Buscar + limpiar): 15%
 */
function buildGridTemplate(total: number): string {
    const actionsCol = "minmax(120px, 15%)"

    if (total <= 1) {
        return `30% minmax(0, 1fr) ${actionsCol}`
    }

    const middleCount = Math.max(0, total - 2)

    if (total === 2) {
        return `40% 45% ${actionsCol}`
    }

    if (total === 3) {
        return `30% 25% 30% ${actionsCol}`
    }

    if (middleCount === 2) {
        return `30% 15% 15% 25% ${actionsCol}`
    }

    const middleShare = `${25 / middleCount}%`
    const middleCols = Array(middleCount).fill(middleShare).join(" ")
    return `30% ${middleCols} 30% ${actionsCol}`
}

export function DataFilters({ onSearch, onReset, children }: DataFiltersProps) {
    const filterChildren = React.Children.toArray(children).filter(Boolean)
    const total = filterChildren.length

    if (total === 0) return null

    const hasDate = total >= 2
    const dateChild = hasDate ? filterChildren[0] : null
    const middleChildren = hasDate ? filterChildren.slice(1, -1) : filterChildren.slice(0, -1)
    const searchChild = filterChildren[total - 1]

    return (
        <div
            className="grid w-full items-center gap-3 py-4"
            style={{ gridTemplateColumns: buildGridTemplate(total) }}
        >
            {dateChild && (
                <div className="min-w-0 w-full h-9 [&_.flex]:h-full [&_button]:h-9">
                    {dateChild}
                </div>
            )}

            {middleChildren.map((child, index) => (
                <div
                    key={index}
                    className="min-w-0 w-full h-9 [&_select]:h-9 [&_select]:w-full [&_button]:h-9 [&_button]:w-full"
                >
                    {child}
                </div>
            ))}

            <div className="min-w-0 w-full h-9 [&_input]:h-9 [&_input]:w-full">
                {searchChild}
            </div>

            <FilterActions onSearch={onSearch} onReset={onReset} />
        </div>
    )
}

function FilterActions({
    onSearch,
    onReset,
}: {
    onSearch: () => void
    onReset: () => void
}) {
    return (
        <div className="flex h-9 w-full min-w-0 items-center justify-end gap-2">
            <Button
                onClick={onSearch}
                className="focus:bg-[#18a689] h-9 min-w-0 flex-1 bg-[#1a5eb3] hover:bg-[#1a3bb3]! cursor-pointer rounded px-0 font-sans text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
                Buscar
            </Button>
            <ActionButton
                icon={<Eraser className="h-4 w-4" strokeWidth={2.5} />}
                label="Limpiar filtros"
                onClick={onReset}
                className="h-9 w-9 shrink-0 bg-[#676A6C] p-0 hover:bg-[#5a6268]"
            />
        </div>
    )
}