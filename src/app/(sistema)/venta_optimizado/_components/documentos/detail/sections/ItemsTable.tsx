// _components/documentos/detail/sections/ItemsTable.tsx
"use client"

import { Trash2, Plus } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"
import { CboData } from "@/components/common/CboData"
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
  /** Activa los inputs editables, mismo patrón visual que ArticulosTable del formulario de creación */
  isEditing?: boolean
  onItemChange?: (id: string, field: string, value: any) => void
  onAddEmpty?: () => void
  onRemoveItem?: (id: string) => void
}

export function ItemsTable({
  tipo,
  items,
  articulosMaster,
  porcentajeComision = 0,
  currencySymbol,
  isEditing = false,
  onItemChange,
  onAddEmpty,
  onRemoveItem,
}: ItemsTableProps) {
  const fmt = (n: number) => (n || 0).toFixed(2)
  const headerClass = "py-4 text-left font-bold uppercase text-[13px] text-[#4f566b] tracking-wide"

  // --- MODO LECTURA: tabla simple, sin acciones de fila ---
  if (!isEditing) {
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
                    <td className="py-4 text-left font-medium">{idx + 1}</td>
                    <td className="py-4 text-left font-mono">{articulo?.codigo ?? "—"}</td>
                    <td className="py-4 text-left">{item.descripcion}</td>
                    <td className="py-4 text-center">{cantidad}</td>
                    <td className="py-4 text-center">{itemCot.descuentoPorcentajeAplicado ? `${dctoLabel}%` : "0%"}</td>
                    <td className="py-4 text-center">{currencySymbol} {fmt(precioConDcto)}</td>
                    <td className="py-4 text-center">{porcentajeComision}%</td>
                    <td className="py-4 text-center">{currencySymbol} {fmt(precioConComision)}</td>
                    <td className="py-4 text-right font-bold">{currencySymbol} {fmt(total)}</td>
                  </tr>
                )
              }

              const itemLibre = item as ItemCotizacionManual | ItemNotaVenta
              const precioUnitario = itemLibre.precioAsignado ?? 0
              const total = precioUnitario * cantidad

              return (
                <tr key={item.id}>
                  <td className="py-4 text-left font-medium">{idx + 1}</td>
                  <td className="py-4 text-left font-mono">{articulo?.codigo ?? "—"}</td>
                  <td className="py-4 text-left">{item.descripcion}</td>
                  <td className="py-4 text-center">{cantidad}</td>
                  <td className="py-4 text-center">{currencySymbol} {fmt(precioUnitario)}</td>
                  <td className="py-4 text-right font-bold">{currencySymbol} {fmt(total)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // --- MODO EDICIÓN: mismo patrón visual que ArticulosTable del formulario de creación ---
  const articulosOptions = articulosMaster.map((a) => ({
    value: String(a.id),
    label: `${a.id} | ${a.codigo} | ${a.nombre}`,
  }))

  const inputStyle =
    "w-full h-9 border border-gray-200 rounded-none px-2 text-[13px] text-center outline-none focus:border-blue-400 transition-colors"
  const disabledInputClass =
    "w-full h-9 border border-gray-200 rounded-none px-2 py-1.5 text-[13px] bg-[#e9ecef] text-center focus:outline-none"
  const editHeaderClass = "py-3 px-2 text-[13px] font-extrabold text-[#676a6c]"
  const pillStyle =
    "w-full h-9 border rounded-full text-[13px] text-center transition-colors focus:outline-none font-bold flex items-center justify-center"

  const renderEditHeaders = () => {
    switch (tipo) {
      case "cotizacion":
        return (
          <>
            <th className={`${editHeaderClass} text-center w-28`}>Stock</th>
            <th className={`${editHeaderClass} text-center w-28`}>Cantidad</th>
            <th className={`${editHeaderClass} text-center w-28`}>Precio</th>
            <th className={`${editHeaderClass} text-center w-16`}>Dcto</th>
            <th className={`${editHeaderClass} text-center w-28`}>PU. Dcto.</th>
            <th className={`${editHeaderClass} text-center w-28`}>PU. Com.</th>
            <th className={`${editHeaderClass} text-center w-28`}>Total</th>
            <th className={`${editHeaderClass} text-center w-28`}>Total IGV</th>
          </>
        )
      case "cotizacion_manual":
        return (
          <>
            <th className={`${editHeaderClass} text-center w-36`}>Cantidad</th>
            <th className={`${editHeaderClass} text-center w-36`}>P. Sugerido</th>
            <th className={`${editHeaderClass} text-center w-36`}>Precio s/igv</th>
            <th className={`${editHeaderClass} text-center w-36`}>Precio c/igv</th>
            <th className={`${editHeaderClass} text-center w-36`}>Total Igv</th>
          </>
        )
      case "nota_venta":
        return (
          <>
            <th className={`${editHeaderClass} text-center w-32`}>Cantidad</th>
            <th className={`${editHeaderClass} text-center w-32`}>P. Sugerido</th>
            <th className={`${editHeaderClass} text-center w-32`}>Precio</th>
            <th className={`${editHeaderClass} text-center w-32`}>Total</th>
          </>
        )
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-y border-gray-200 bg-white">
            <th className="w-12 text-center p-2">
              <ActionButton
                icon={<Plus className="w-5 h-5" strokeWidth={3} />}
                variant="outline"
                onClick={onAddEmpty}
                className="w-8 h-8 mx-auto"
              />
            </th>
            <th className={`${editHeaderClass} w-[350px]`}>Artículo</th>
            {renderEditHeaders()}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const articulo = articulosMaster.find((a) => areIdsEqual(a.id, item.articuloId))
            const stock = articulo?.stock ?? 0
            const precioCatalogo = articulo?.precio ?? 0
            const cantidad = Number(item.cantidad) || 0

            return (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50/30 transition-colors">
                <td className="py-2 px-2 text-center align-top">
                  <ActionButton
                    icon={<Trash2 className="w-5 h-5" strokeWidth={2} />}
                    onClick={() => onRemoveItem?.(item.id)}
                    className="w-8 h-8 mt-1 mx-auto"
                  />
                </td>
                <td className="py-2 px-2">
                  <div className="mb-2">
                    <CboData
                      items={articulosOptions}
                      value={item.articuloId}
                      onChange={(val) => {
                        onItemChange?.(item.id, "articuloId", val)
                        onItemChange?.(item.id, "cantidad", 1)
                      }}
                      placeholder="Seleccionar Artículo"
                      className="w-full"
                    />
                  </div>
                  <textarea
                    placeholder="Descripción del Item"
                    className="w-full border border-gray-200 rounded-sm px-2 py-1.5 text-[12px] text-gray-500 min-h-[60px] outline-none focus:border-blue-300 transition-colors"
                    value={item.descripcion}
                    onChange={(e) => onItemChange?.(item.id, "descripcion", e.target.value)}
                  />
                </td>

                {/* --- COTIZACIÓN: descuento sigue siendo el switch booleano del catálogo,
                     ahora mostrado como botón pill igual a ArticulosTable --- */}
                {tipo === "cotizacion" && (() => {
                  const itemCot = item as ItemCotizacion
                  const dctoLabel = articulo?.descuentoPorDefecto ?? 0
                  const precioConDcto = itemCot.descuentoPorcentajeAplicado
                    ? precioCatalogo * (1 - dctoLabel / 100)
                    : precioCatalogo
                  const precioConComision = precioConDcto * (1 + porcentajeComision / 100)
                  const total = precioConComision * cantidad
                  const totalIGV = total * 1.18

                  return (
                    <>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={stock} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input
                          type="number"
                          className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                          value={item.cantidad}
                          onChange={(e) => onItemChange?.(item.id, "cantidad", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioCatalogo)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <button
                          type="button"
                          disabled={!articulo}
                          onClick={() => onItemChange?.(item.id, "descuentoPorcentajeAplicado", !itemCot.descuentoPorcentajeAplicado)}
                          className={`${pillStyle} ${
                            !articulo
                              ? "bg-[#f1f5f9] border-gray-200 text-gray-300 cursor-not-allowed"
                              : itemCot.descuentoPorcentajeAplicado
                              ? "bg-[#7eb5d6] border-[#7eb5d6] text-white"
                              : "bg-white border-gray-200 text-[#4f566b] hover:bg-gray-50"
                          }`}
                        >
                          {articulo ? `${dctoLabel}%` : "0%"}
                        </button>
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioConDcto)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioConComision)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(total)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(totalIGV)} className={disabledInputClass} />
                      </td>
                    </>
                  )
                })()}

                {/* --- COTIZACIÓN MANUAL: precio totalmente libre, con IGV --- */}
                {tipo === "cotizacion_manual" && (() => {
                  const itemManual = item as ItemCotizacionManual
                  const precioNeto = itemManual.precioAsignado || 0
                  const precioConIgv = precioNeto * 1.18
                  const totalIgv = precioConIgv * cantidad

                  return (
                    <>
                      <td className="py-2 px-1 text-center align-top">
                        <input
                          type="number"
                          className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                          value={item.cantidad}
                          onChange={(e) => onItemChange?.(item.id, "cantidad", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioCatalogo)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input
                          type="number"
                          className={inputStyle}
                          value={itemManual.precioAsignado || 0}
                          onChange={(e) => onItemChange?.(item.id, "precioAsignado", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioConIgv)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(totalIgv)} className={disabledInputClass} />
                      </td>
                    </>
                  )
                })()}

                {/* --- NOTA DE VENTA: precio libre, sin IGV --- */}
                {tipo === "nota_venta" && (() => {
                  const itemNota = item as ItemNotaVenta
                  const precioNeto = itemNota.precioAsignado || 0
                  const total = precioNeto * cantidad

                  return (
                    <>
                      <td className="py-2 px-1 text-center align-top">
                        <input
                          type="number"
                          className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                          value={item.cantidad}
                          onChange={(e) => onItemChange?.(item.id, "cantidad", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(precioCatalogo)} className={disabledInputClass} />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input
                          type="number"
                          className={inputStyle}
                          value={itemNota.precioAsignado || 0}
                          onChange={(e) => onItemChange?.(item.id, "precioAsignado", Number(e.target.value))}
                        />
                      </td>
                      <td className="py-2 px-1 text-center align-top">
                        <input type="text" readOnly value={fmt(total)} className={disabledInputClass} />
                      </td>
                    </>
                  )
                })()}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
