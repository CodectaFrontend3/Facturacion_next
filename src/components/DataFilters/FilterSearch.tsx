"use client"

import { Input } from "@/components/ui/input"

interface FilterSearchProps {
    name: string
    label?: string
    placeholder?: string
    value: string
    onChange: (name: string, value: string) => void
}

export function FilterSearch({
    name,
    label,
    placeholder = "Buscar...",
    value,
    onChange,
}: FilterSearchProps) {
    return (
        <div className="flex items-center gap-2">
            {label && (
                <label className="text-sm text-[#676A6C] whitespace-nowrap font-sans">
                    {label}
                </label>
            )}
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                className="h-9 w-full border border-gray-300 px-3 text-sm outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#2C8F7B] font-sans text-[#676A6C] bg-white"
            />
        </div>
    )
}