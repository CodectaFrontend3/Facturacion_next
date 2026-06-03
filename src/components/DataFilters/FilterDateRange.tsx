"use client"

import { RotateCcwIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useDateRangeFilter } from "@/hooks/useDateRangeFilter"
import { MiniCalendar } from "./MiniCalendar"

interface FilterDateRangeProps {
    nameFrom: string
    nameTo: string
    label?: string
    valueFrom: string
    valueTo: string
    onChange: (name: string, value: string) => void
}

export function FilterDateRange({
    nameFrom, nameTo, label,
    valueFrom, valueTo, onChange,
}: FilterDateRangeProps) {
    const {
        open, setOpen,
        leftYear, leftMonth, handleLeftMonthChange,
        rightYear, rightMonth, handleRightMonthChange,
        fromDate, toDate, hoverDate,
        fromInput, toInput,
        handleLeftDayClick, handleRightDayClick,
        handleLeftDayHover, handleRightDayHover,
        handleLeftDayLeave, handleRightDayLeave,
        handleFromInputChange, handleToInputChange,
        handleFromKeyDown, handleToKeyDown,
        handleGuardar, handleCancelar, handleReset
    } = useDateRangeFilter({ valueFrom, valueTo, onChange, nameFrom, nameTo })

    const triggerLabel = valueFrom || valueTo
        ? `${valueFrom || "..."} — ${valueTo || "..."}`
        : "Seleccionar rango..."

    return (
        <div className="flex items-center gap-2">
            {label && (
                <label className="text-[13px] text-[#676A6C] whitespace-nowrap font-bold">
                    {label}
                </label>
            )}
            <div className="flex items-center w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button className="h-9 w-full border border-gray-300 px-3 text-[13px] text-[#676A6C] text-left bg-[#F2F2F2] cursor-pointer font-sans outline-none focus:border-[#18a689] rounded-l">
                            {triggerLabel}
                        </button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        className="p-0 rounded-none border border-gray-200 shadow-xl bg-white z-50 w-auto"
                    >
                        <div className="flex">
                            {/* Panel izquierdo de inputs y botones */}
                            <div className="flex flex-col justify-between p-4 border-r border-gray-200 min-w-40">
                                <div className="flex gap-3">
                                    <div>
                                        <div className="text-[11px] font-bold text-[#676A6C] mb-1 uppercase tracking-wider">DESDE</div>
                                        <Input
                                            value={fromInput}
                                            onChange={e => handleFromInputChange(e.target.value)}
                                            onKeyDown={handleFromKeyDown}
                                            placeholder="dd/mm/aaaa"
                                            className="h-8 w-28 text-sm rounded-none shadow-none focus-visible:ring-0 border-gray-300 font-sans text-[#676A6C] focus-visible:border-[#2C8F7B]"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-[#676A6C] mb-1 uppercase tracking-wider">HASTA</div>
                                        <Input
                                            value={toInput}
                                            onChange={e => handleToInputChange(e.target.value)}
                                            onKeyDown={handleToKeyDown}
                                            placeholder="dd/mm/aaaa"
                                            className="h-8 w-28 text-sm rounded-none shadow-none focus-visible:ring-0 border-gray-300 font-sans text-[#676A6C] focus-visible:border-[#2C8F7B]"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-6">
                                    <Button
                                        onClick={handleGuardar}
                                        className="h-8 px-5 text-sm rounded-none bg-[#1D549F] hover:bg-[#15407A] text-white font-sans"
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        onClick={handleCancelar}
                                        variant="outline"
                                        className="h-8 px-4 text-sm rounded-none border-gray-300 text-[#676A6C] font-sans hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>

                            {/* Panel de Calendarios */}
                            <div className="flex gap-0 p-3">
                                <MiniCalendar
                                    year={leftYear}
                                    month={leftMonth}
                                    onMonthChange={handleLeftMonthChange}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    hoverDate={hoverDate}
                                    onDayClick={handleLeftDayClick}
                                    onDayHover={handleLeftDayHover}
                                    onDayLeave={handleLeftDayLeave}
                                    type="from"
                                />
                                <div className="w-3" />
                                <MiniCalendar
                                    year={rightYear}
                                    month={rightMonth}
                                    onMonthChange={handleRightMonthChange}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    hoverDate={hoverDate}
                                    onDayClick={handleRightDayClick}
                                    onDayHover={handleRightDayHover}
                                    onDayLeave={handleRightDayLeave}
                                    disabledBefore={fromDate}
                                    showPrevNav={!(rightYear === leftYear && rightMonth === leftMonth)}
                                    type="to"
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <button
                    onClick={handleReset}
                    className="h-9 w-9 border border-[#676A6C] border-l-0 bg-[#676A6C] hover:bg-[#5a6268] cursor-pointer flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm rounded-r"
                    title="Limpiar fechas"
                >
                    <RotateCcwIcon size={13} />
                </button>
            </div>
        </div>
    )
}