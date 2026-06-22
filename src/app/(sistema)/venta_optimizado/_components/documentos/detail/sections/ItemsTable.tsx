// _components/documentos/detail/sections/ItemsTable.tsx
"use client"

import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { ItemCotizacion, ItemCotizacionManual, ItemNotaVenta } from "../../../../_domain/types/documento.types"
import { ArticuloDetalle } from "../../../../_domain/types/catalogo.types"
import { areIdsEqual } from "../../../../_utils/idNormalizer"

type AnyItem = ItemCotizacion | ItemCotizacionManual | ItemNotaVenta

interface ItemsTableProps {
  tipo: DocumentoTipo
  items: AnyItem[]
  articulosMaster: ArticuloDetalle[]
  /** % de comisión aplicado al documento (solo cotización) */
  porcentajeComision?: number
  currencySymbol: string
}

export function ItemsTable({ tipo, items, articulosMaster, porcentajeComision = 0, currencySymbol }: ItemsTableProps) {
  const fmt = (n: number) => n.toFixed(2)
  const headerClass = "py-2.5 text-left font-bold uppercase text-[12px] text-[#676a6c]"

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className={`${headerClass} w-12`}>Item</th>
            <th className={headerClass}>Código</th>
            <th className={headerClass}>Descripción</th>
            <th className={`${headerClass} text-center`}>Cantidad</th>

            {tipo === "cotizacion" && (
              <>
                <th className={`${headerClass} text-center`}>Dscto.</th>
                <th className={`${headerClass} text-center`}>P.U. Desc.</th>
                <th className={`${headerClass} text-center`}>Comisión</th>
                <th className={`${headerClass} text-center`}>P.U. Com.</th>
              </>
            )}

            {tipo !== "cotizacion" && (
              <th className={`${headerClass} text-center`}>P. Unitario</th>
            )}

            <th className={`${headerClass} text-right`}>Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[#676a6c]">
          {items.map((item, idx) => {
            const articulo = articulosMaster.find((a) => areIdsEqual(a.id, item.articuloId))
            const cantidad = Number(item.cantidad) || 0

            if (tipo === "cotizacion") {
              const itemCot = item as ItemCotizacion
              const precioBase = articulo?.precio ?? 0
              const dctoLabel = articulo?.descuentoPorDefecto ?? 0
              const precioConDcto = itemCot.descuentoPorcentajeAplicado
                ? precioBase * (1 - dctoLabel / 100)
                : precioBase
              const precioConComision = precioConDcto * (1 + porcentajeComision / 100)
              const total = precioConComision * cantidad

              return (
                <tr key={item.id}>
                  <td className="py-3 text-left font-medium">{idx + 1}</td>
                  <td className="py-3 text-left font-mono">{articulo?.codigo ?? "—"}</td>
                  <td className="py-3 text-left">{item.descripcion}</td>
                  <td className="py-3 text-center">{cantidad}</td>
                  <td className="py-3 text-center">{itemCot.descuentoPorcentajeAplicado ? `${dctoLabel}%` : "0%"}</td>
                  <td className="py-3 text-center">{currencySymbol} {fmt(precioConDcto)}</td>
                  <td className="py-3 text-center">{porcentajeComision}%</td>
                  <td className="py-3 text-center">{currencySymbol} {fmt(precioConComision)}</td>
                  <td className="py-3 text-right font-bold">{currencySymbol} {fmt(total)}</td>
                </tr>
              )
            }

            // cotizacion_manual y nota_venta comparten estructura: precioAsignado libre
            const itemLibre = item as ItemCotizacionManual | ItemNotaVenta
            const precioUnitario = itemLibre.precioAsignado ?? 0
            const total = precioUnitario * cantidad

            return (
              <tr key={item.id}>
                <td className="py-3 text-left font-medium">{idx + 1}</td>
                <td className="py-3 text-left font-mono">{articulo?.codigo ?? "—"}</td>
                <td className="py-3 text-left">{item.descripcion}</td>
                <td className="py-3 text-center">{cantidad}</td>
                <td className="py-3 text-center">{currencySymbol} {fmt(precioUnitario)}</td>
                <td className="py-3 text-right font-bold">{currencySymbol} {fmt(total)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
