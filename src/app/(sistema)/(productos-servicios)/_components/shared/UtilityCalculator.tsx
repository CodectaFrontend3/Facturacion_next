"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ActionButton } from "@/components/common/ActionButton"

interface UtilityCalculatorProps {
  precioVenta: number
  onChangePrecioVenta: (val: number) => void
  onChangePrecioUsd?: (val: number) => void
}

export function UtilityCalculator({
  precioVenta,
  onChangePrecioVenta,
  onChangePrecioUsd,
}: UtilityCalculatorProps) {
  const [showUtilityHelper, setShowUtilityHelper] = useState(false)
  const [precioSinIgv, setPrecioSinIgv] = useState(0)
  const [precioConIgv, setPrecioConIgv] = useState(precioVenta)

  const handlePrecioSinIgvChange = (val: number) => {
    setPrecioSinIgv(val)
    const conIgv = Number((val * 1.18).toFixed(2))
    setPrecioConIgv(conIgv)
    onChangePrecioVenta(conIgv)
    if (onChangePrecioUsd) {
      onChangePrecioUsd(Number((conIgv / 3.75).toFixed(2)))
    }
  }

  const handlePrecioConIgvChange = (val: number) => {
    setPrecioConIgv(val)
    const sinIgv = Number((val / 1.18).toFixed(2))
    setPrecioSinIgv(sinIgv)
    onChangePrecioVenta(val)
    if (onChangePrecioUsd) {
      onChangePrecioUsd(Number((val / 3.75).toFixed(2)))
    }
  }

  return (
    <>
      {/* Botón ¿En duda con su porcentaje de utilidad? */}
      <div className="flex items-end w-full h-full">
        <ActionButton
          onClick={() => setShowUtilityHelper(!showUtilityHelper)}
          className="w-full bg-[#1b55c4] hover:bg-[#1546a3] text-white font-bold h-9 text-[11px] uppercase tracking-wider rounded-none cursor-pointer flex items-center justify-center border-none transition-all shadow-sm hover:shadow"
          text="¿En duda con su porcentaje de utilidad?"
        />
      </div>

      {/* Panel de Calculadora de Utilidad */}
      {showUtilityHelper && (
        <div className="md:col-span-2 bg-[#f8f9fa] border border-gray-200 p-4 space-y-3 mt-1 rounded-none text-center transition-all animate-in fade-in slide-in-from-top-2 duration-200 w-full">
          <p className="text-[12px] text-gray-600 font-sans">
            Puede colocar su precio venta <strong>(S/)</strong> y el sistema calculará por ud.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Precio sin IGV */}
            <div>
              <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">Precio sin IGV</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100 font-sans">S/</span>
                <Input
                  type="number"
                  value={precioSinIgv || ""}
                  onChange={(e) => handlePrecioSinIgvChange(Number(e.target.value))}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Precio de Venta + IGV */}
            <div>
              <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">Precio de Venta + IGV</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100 font-sans">S/</span>
                <Input
                  type="number"
                  value={precioConIgv || ""}
                  onChange={(e) => handlePrecioConIgvChange(Number(e.target.value))}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
