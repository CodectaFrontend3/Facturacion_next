"use client"

import React from "react"

interface VentaSummaryProps {
  subtotal: number
  igv: number
  total: number
}

/**
 * VentaSummary: Muestra los totales de forma limpia.
 * Ajustado solo en ancho para no verse limitado.
 */
export function VentaSummary({ subtotal, igv, total }: VentaSummaryProps) {
  const labelClass = "text-[13px] font-extrabold text-[#4f566b] ml-4 uppercase"
  const inputClass = "w-[350px] bg-[#f1f5f9] border border-[#e2e8f0] rounded-sm px-3 py-1.5 text-[13px] text-right font-bold text-[#4f566b] focus:outline-none"

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className={labelClass}>Subtotal :</span>
        <input type="text" className={inputClass} value={subtotal.toFixed(2)} disabled />
      </div>

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className={labelClass}>IGV (18%) :</span>
        <input type="text" className={inputClass} value={igv.toFixed(2)} disabled />
      </div>

      <div className="flex justify-between items-center py-2">
        <span className="text-[14px] font-extrabold text-[#18a689] ml-4 uppercase">Total :</span>
        <input 
          type="text" 
          className={`${inputClass} border-[#18a689] text-[#18a689]`} 
          value={total.toFixed(2)} 
          disabled 
        />
      </div>
    </div>
  )
}
