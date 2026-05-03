"use client"

import { DateRanger } from "./DateRanger"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterBarProps {
  searchValue: string
  onSearchChange: (val: string) => void
  comprobante: string
  onComprobanteChange: (val: string) => void
  onDateChange: (start: Date, end: Date) => void
  onSearchSubmit: () => void
  isLoading?: boolean
}

export function FilterBar({
  searchValue,
  onSearchChange,
  comprobante,
  onComprobanteChange,
  onDateChange,
  onSearchSubmit,
  isLoading
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Rango de fechas */}
      <DateRanger 
        initialLabel="01/04/2026 - 30/04/2026" 
        onChange={(start, end) => onDateChange(start, end)} 
      />

      {/* Selector comprobante */}
      <Select value={comprobante} onValueChange={onComprobanteChange}>
        <SelectTrigger className="!h-[34px] min-w-[320px] rounded border border-gray-200 px-3 text-xs text-gray-600 bg-white transition-colors data-[state=open]:border-[#2C8F7B] focus:outline-none focus:border-[#2C8F7B] focus-visible:ring-0">
          <SelectValue placeholder="Todos los comprobantes" />
        </SelectTrigger>
        <SelectContent position="popper" className="min-w-[320px] bg-white border border-gray-200 shadow-md rounded p-0">
          {["Todos los comprobantes", "Factura", "Boleta", "Nota de Venta"].map(item => (
            <SelectItem key={item} value={item} className="text-xs text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700 cursor-pointer">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Input de Búsqueda y Botón */}
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center border border-gray-200 rounded px-3 h-[34px] gap-2 flex-1 bg-white transition-colors focus-within:border-[#2C8F7B]">
          <input
            type="text"
            placeholder="Buscar:"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
            className="flex-1 text-xs outline-none text-gray-700 bg-transparent placeholder:text-gray-500"
          />
        </div>
        <button 
          onClick={onSearchSubmit}
          disabled={isLoading}
          className="flex items-center justify-center w-[200px] h-[34px] rounded bg-[#1a5eb3] text-white text-xs font-semibold hover:bg-[#1a3bb3] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </div>
  )
}
