"use client"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export interface SelectOption {
    label: string
    value: string
}

interface FilterSelectProps {
    name: string
    label?: string
    value: string
    onChange: (name: string, value: string) => void
    options: SelectOption[]
    placeholder?: string
}

export function FilterSelect({
    name,
    label,
    value,
    onChange,
    options,
}: FilterSelectProps) {
    return (
        <div className="flex items-center gap-2">
            {label && (
                <label className="text-sm text-[#676A6C] whitespace-nowrap font-sans">
                    {label}
                </label>
            )}
            <NativeSelect
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full"
                selectClassName="h-9 rounded-none border-gray-300 text-[#676A6C] font-sans bg-white focus-visible:ring-0 focus-visible:border-[#2C8F7B]"
            >
                {options.map((opt) => (
                    <NativeSelectOption key={opt.value} value={opt.value} className="h-9 rounded-none border-gray-300 text-[#676A6C] font-sans">
                        {opt.label}
                    </NativeSelectOption>
                ))}
            </NativeSelect>
        </div>
    )
}