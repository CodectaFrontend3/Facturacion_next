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
  isEditing?: boolean
  onGuardar?: () => void
  onGuardarYFinalizar?: () => void
}

export function TotalesDetailSection({
  tipo,
  totals,
  moneda,
  currencySymbol,
  isEditing = false,
  onGuardar,
  onGuardarYFinalizar,
}: TotalesDetailSectionProps) {
  const sonTexto = numeroALetras(totals.total, moneda)

  const accionesGuardado = isEditing && (
    <div className="flex justify-end gap-3 mt-6 w-full">
      <button
        onClick={onGuardar}
        className="border border-[#1e40af] text-[#1e40af] hover:bg-blue-50 px-6 py-1.5 rounded-sm text-[13px] font-semibold transition-colors"
      >
        Guardar
      </button>
      <button
        onClick={onGuardarYFinalizar}
        className="bg-[#1e40af] hover:bg-blue-800 text-white px-6 py-1.5 rounded-sm text-[13px] font-semibold transition-colors"
      >
        Guardar y Finalizar
      </button>
    </div>
  )

  // Nota de Venta: caja simple, sin desglose de IGV (consistente con la regla de negocio: sin IGV)
  if (tipo === "nota_venta") {
    return (
      <div className="w-full">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row w-full">
          <p className="text-[14px] font-bold text-[#676a6c]">Son: {sonTexto}</p>
          <div className="w-full rounded-[8px] border border-gray-200 px-8 py-5 text-center lg:w-[380px]">
            <p className="font-extrabold text-[#676a6c]">Importe Total</p>
            <p className="mt-4 text-[16px] text-[#676a6c]">{currencySymbol} {totals.total.toFixed(2)}</p>
          </div>
        </div>
        {accionesGuardado}
      </div>
    )
  }

  // Cotización / Cotización Manual: desglose tributario completo, igual al diseño de ventas
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row w-full">
        <p className="text-[14px] font-bold text-[#676a6c]">Son: {sonTexto}</p>

        <div className="w-full rounded-[4px] border border-gray-200 bg-white px-7 py-6 lg:w-[360px]">
          <div className="space-y-3 text-[14px] text-[#676a6c]">
            <Row label="Subtotal:" value={totals.subtotal} symbol={currencySymbol} />
            <Row label="Op. Gravada:" value={totals.subtotal} symbol={currencySymbol} />
            <Row label="Op. Inafecta:" value={0} symbol={currencySymbol} />
            <Row label="Op. Exonerada:" value={0} symbol={currencySymbol} />
            <Row label="I.G.V.:" value={totals.igv} symbol={currencySymbol} />
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 font-bold">
              <span>Importe Total:</span>
              <span>{currencySymbol} {totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {accionesGuardado}
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
