// _components/documentos/form/sections/TotalesSection.tsx
"use client"

import { TotalesFinancieros } from "../../../../_utils/calculations"

interface TotalesSectionProps extends TotalesFinancieros {
  /** Nota de Venta no muestra fila de IGV porque su regla de negocio fija igv = 0 */
  hideIgv?: boolean
}

export function TotalesSection({ subtotal, igv, total, hideIgv = false }: TotalesSectionProps) {
  const labelClass = "w-28 text-[13px] font-normal text-[#676a6c] flex-shrink-0 text-right"
  const inputClass =
    "w-[350px] shrink-0 bg-[#e9ecef] border border-[#e2e8f0] rounded-none px-3 py-1.5 text-[13px] text-right font-bold text-[#4f566b] focus:outline-none"

  // Oculta el "0.00" cuando el valor todavía no se ha calculado, evitando que
  // parezca un resultado real de cero.
  const fmt = (val: number) => (val === 0 ? "" : val.toFixed(2))

  return (
    <div className="flex flex-col w-full items-end">
      <div className="flex items-center gap-4 py-2 border-b border-gray-200 w-full justify-end">
        <span className={labelClass}>Subtotal:</span>
        <input type="text" className={inputClass} value={fmt(subtotal)} disabled />
      </div>

      {!hideIgv && (
        <div className="flex items-center gap-4 py-2 border-b border-gray-200 w-full justify-end">
          <span className={labelClass}>IGV:</span>
          <input type="text" className={inputClass} value={fmt(igv)} disabled />
        </div>
      )}

      <div className="flex items-center gap-4 py-2 w-full justify-end">
        <span className={labelClass}>Total:</span>
        <input
          type="text"
          className={`${inputClass} border-[#18a689] text-[#18a689]`}
          value={fmt(total)}
          disabled
        />
      </div>
    </div>
  )
}
