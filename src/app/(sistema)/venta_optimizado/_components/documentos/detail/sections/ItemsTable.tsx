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
  /** Activa los inputs editables (cantidad, descuento aplicado, precio asignado) */
  isEditing?: boolean
  onItemChange?: (id: string, field: string, value: any) => void
}

const editableInputClass =
  "w-20 border border-[#1ab394] rounded-sm px-2 py-1 text-[13px] text-center outline-none"

export function ItemsTable({
  tipo,
  items,
  articulosMaster,
  porcentajeComision = 0,
  currencySymbol,
  isEditing = false,
  onItemChange,
}: ItemsTableProps) {
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

            const cantidadCell = isEditing ? (
              <input
                type="number"
                className={editableInputClass}
                value={item.cantidad}
                onChange={(e) => onItemChange?.(item.id, "cantidad", Number(e.target.value))}
              />
            ) : (
              cantidad
            )

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
                  <td className="py-3 text-center">{cantidadCell}</td>
                  <td className="py-3 text-center">
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => onItemChange?.(item.id, "descuentoPorcentajeAplicado", !itemCot.descuentoPorcentajeAplicado)}
                        className={`px-2 py-1 rounded-full text-[12px] font-bold border ${
                          itemCot.descuentoPorcentajeAplicado
                            ? "bg-[#7eb5d6] border-[#7eb5d6] text-white"
                            : "bg-white border-gray-200 text-[#4f566b]"
                        }`}
                      >
                        {dctoLabel}%
                      </button>
                    ) : (
                      itemCot.descuentoPorcentajeAplicado ? `${dctoLabel}%` : "0%"
                    )}
                  </td>
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
                <td className="py-3 text-center">{cantidadCell}</td>
                <td className="py-3 text-center">
                  {isEditing ? (
                    <input
                      type="number"
                      className={editableInputClass}
                      value={itemLibre.precioAsignado}
                      onChange={(e) => onItemChange?.(item.id, "precioAsignado", Number(e.target.value))}
                    />
                  ) : (
                    `${currencySymbol} ${fmt(precioUnitario)}`
                  )}
                </td>
                <td className="py-3 text-right font-bold">{currencySymbol} {fmt(total)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
