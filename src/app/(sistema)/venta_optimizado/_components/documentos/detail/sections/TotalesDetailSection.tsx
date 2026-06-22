// _components/documentos/detail/sections/TotalesDetailSection.tsx
"use client"

import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { TotalesFinancieros } from "../../../../_utils/calculations"
import { numeroALetras } from "../../../../_utils/numeroALetras"

interface TotalesDetailSectionProps {
  tipo: DocumentoTipo
  totals: TotalesFinancieros
  moneda: "soles" | "dolares"
  currencySymbol: string
}

export function TotalesDetailSection({ tipo, totals, moneda, currencySymbol }: TotalesDetailSectionProps) {
  const sonTexto = numeroALetras(totals.total, moneda)

  // Nota de Venta: caja simple, sin desglose de IGV (consistente con la regla de negocio: sin IGV)
  if (tipo === "nota_venta") {
    return (
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row w-full">
        <p className="text-[15px] font-extrabold text-[#676a6c]">Son: {sonTexto}</p>
        <div className="w-full rounded-[8px] border border-gray-200 px-8 py-5 text-center lg:w-[380px]">
          <p className="font-extrabold text-[#676a6c]">Importe Total</p>
          <p className="mt-4 text-[16px] text-[#676a6c]">{currencySymbol} {totals.total.toFixed(2)}</p>
        </div>
      </div>
    )
  }

  // Cotización / Cotización Manual: desglose completo
  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row w-full">
      <p className="text-[13px] font-bold text-[#676a6c]">Son: {sonTexto}</p>

      <div className="w-full rounded-[12px] border border-gray-200 bg-white p-4 lg:w-[280px]">
        <div className="space-y-1.5 font-medium text-[13px] text-[#676a6c]">
          <Row label="Subtotal:" value={totals.subtotal} symbol={currencySymbol} />
          <Row label="I.G.V.:" value={totals.igv} symbol={currencySymbol} />
          <div className="mt-1.5 flex justify-between border-t border-gray-100 pt-1.5 font-bold">
            <span>Importe Total:</span>
            <span>{currencySymbol} {totals.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, symbol }: { label: string; value: number; symbol: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{symbol} {value.toFixed(2)}</span>
    </div>
  )
}
