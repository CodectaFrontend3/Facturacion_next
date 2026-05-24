"use client"

import React from "react"
import { Trash2, Plus } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"
import { CboData } from "@/components/common/CboData"
import { RowData } from "../../types/documento.types"
import articulosMock from "../../cotizacion/crear/articulo.json"

type TableMode = "cotizacion" | "manual" | "nota_venta"

interface VentaItemsTableProps {
  mode: TableMode
  rows: RowData[]
  onUpdate: (id: string, field: keyof RowData, value: any) => void
  onRemove: (id: string) => void
  onAddEmpty?: () => void
}

export function VentaItemsTable({ mode, rows, onUpdate, onRemove, onAddEmpty }: VentaItemsTableProps) {
  const articulosOptions = articulosMock.map(a => ({
    value: String(a.id),
    label: `${a.id} | ${a.codigo} | ${a.nombre}`
  }))

  const fmt = (n: number) => (n || 0).toFixed(2)

  // Clases estandarizadas para mantener el diseño compacto
  const inputStyle = "w-full h-9 border border-gray-200 rounded-none px-2 text-[13px] text-center outline-none focus:border-blue-400 transition-colors"
  const disabledInputClass = "w-full h-9 border border-gray-200 rounded-none px-2 py-1.5 text-[13px] bg-[#e9ecef] text-center focus:outline-none"
  const headerClass = "py-3 px-2 text-[13px] font-extrabold text-[#676a6c]"

  // Estilo estandarizado para botones tipo píldora (Descuentos)
  const pillStyle = "w-full h-9 border rounded-full text-[13px] text-center transition-colors focus:outline-none font-bold flex items-center justify-center"

  const renderHeaders = () => {
    switch (mode) {
      case "cotizacion":
        return (
          <>
            <th className={`${headerClass} text-center w-28`}>Stock</th>
            <th className={`${headerClass} text-center w-28`}>Cantidad</th>
            <th className={`${headerClass} text-center w-28`}>Precio</th>
            <th className={`${headerClass} text-center w-16`}>Dcto</th>
            <th className={`${headerClass} text-center w-28`}>PU. Dcto.</th>
            <th className={`${headerClass} text-center w-28`}>PU. Com.</th>
            <th className={`${headerClass} text-center w-28`}>Total</th>
            <th className={`${headerClass} text-center w-28`}>Total IGV</th>
          </>
        )
      case "manual":
        return (
          <>
            <th className={`${headerClass} text-center w-36`}>Cantidad</th>
            <th className={`${headerClass} text-center w-36`}>P. Sugerido</th>
            <th className={`${headerClass} text-center w-36`}>Precio s/igv</th>
            <th className={`${headerClass} text-center w-36`}>Precio c/igv</th>
            <th className={`${headerClass} text-center w-36`}>Total Igv</th>
          </>
        )
      case "nota_venta":
        return (
          <>
            <th className={`${headerClass} text-center w-32 capitalize`}>Cantidad</th>
            <th className={`${headerClass} text-center w-32 capitalize`}>P.Sugerido</th>
            <th className={`${headerClass} text-center w-32 capitalize`}>Precio</th>
            <th className={`${headerClass} text-center w-32 capitalize`}>Total</th>
          </>
        )
      default: return null
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-y border-gray-200 bg-white">
            <th className="w-12 text-center p-2">
              {onAddEmpty && (
                <ActionButton
                  icon={<Plus className="w-5 h-5" strokeWidth={3} />}
                  onClick={onAddEmpty}
                  className="w-8 h-8 mx-auto"
                />
              )}
            </th>
            <th className={`${headerClass} w-[350px]`}>Artículo</th>
            {renderHeaders()}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            const article = articulosMock.find(a => String(a.id) === row.articleId)
            const basePrice = row.precioManual ?? (article?.precio ?? 0)
            const stock = article?.stock ?? 0 // Mostrar 0 por defecto
            const dctoLabel = article?.descuentoPorDefecto ?? 0

            const priceWithDcto = row.isDctoActive ? basePrice * (1 - dctoLabel / 100) : basePrice
            const total = priceWithDcto * (Number(row.cantidad) || 0)
            const totalIGV = total * 1.18

            return (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50/30 transition-colors">
                <td className="py-2 px-2 text-center align-top">
                  <ActionButton
                    icon={<Trash2 className="w-5 h-5" strokeWidth={2} />}
                    onClick={() => onRemove(row.id)}
                    className="w-8 h-8 mt-1 mx-auto"
                  />
                </td>
                <td className="py-2 px-2">
                  <div className="mb-2">
                    <CboData
                      items={articulosOptions}
                      value={row.articleId}
                      onChange={val => {
                        onUpdate(row.id, "articleId", val)
                        onUpdate(row.id, "cantidad", "1")
                      }}
                      placeholder="Seleccionar Artículo"
                      className="w-full"
                    />
                  </div>
                  <textarea
                    placeholder="Descripción del Item"
                    className="w-full border border-gray-200 rounded-sm px-2 py-1.5 text-[12px] text-gray-500 min-h-[60px] outline-none focus:border-blue-300 transition-colors"
                    value={row.detalle || ""}
                    onChange={e => onUpdate(row.id, "detalle", e.target.value)}
                  />
                </td>

                {(() => {
                  switch (mode) {
                    case "cotizacion":
                      return (
                        <>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={stock} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top">
                            <input
                              type="number"
                              className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                              value={row.cantidad}
                              onChange={e => onUpdate(row.id, "cantidad", e.target.value)}
                            />
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(basePrice)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top">
                            <button
                              disabled={!article}
                              onClick={() => onUpdate(row.id, "isDctoActive", !row.isDctoActive)}
                              className={`${pillStyle} 
                                ${!article
                                  ? "bg-[#f1f5f9] border-gray-200 text-gray-300 cursor-not-allowed"
                                  : row.isDctoActive
                                    ? "bg-[#7eb5d6] border-[#7eb5d6] text-white"
                                    : "bg-white border-gray-200 text-[#4f566b] hover:bg-gray-50"}`}
                            >
                              {article ? `${dctoLabel}%` : "0%"}
                            </button>
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(priceWithDcto)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value="0.00" className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(total)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(totalIGV)} className={disabledInputClass} /></td>
                        </>
                      )
                    case "manual":
                      return (
                        <>
                          <td className="py-2 px-1 text-center align-top">
                            <input
                              type="number"
                              className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                              value={row.cantidad}
                              onChange={e => onUpdate(row.id, "cantidad", e.target.value)}
                            />
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(article?.precio || 0)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top">
                            <input
                              type="number"
                              className={inputStyle}
                              value={row.precioManual || 0}
                              onChange={e => onUpdate(row.id, "precioManual", Number(e.target.value))}
                            />
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt((row.precioManual || 0) * 1.18)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt((row.precioManual || 0) * (Number(row.cantidad) || 0) * 1.18)} className={disabledInputClass} /></td>
                        </>
                      )
                    case "nota_venta":
                      return (
                        <>
                          <td className="py-2 px-1 text-center align-top">
                            <input 
                              type="number" 
                              className="w-full h-9 border border-[#1ab394] rounded-sm px-2 text-[13px] text-center outline-none"
                              value={row.cantidad}
                              onChange={e => onUpdate(row.id, "cantidad", e.target.value)}
                            />
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt(article?.precio || 0)} className={disabledInputClass} /></td>
                          <td className="py-2 px-1 text-center align-top">
                            <input 
                              type="number"
                              className={inputStyle}
                              value={row.precioManual || 0}
                              onChange={e => onUpdate(row.id, "precioManual", Number(e.target.value))}
                            />
                          </td>
                          <td className="py-2 px-1 text-center align-top"><input type="text" readOnly value={fmt((row.precioManual || 0) * (Number(row.cantidad) || 0))} className={disabledInputClass} /></td>
                        </>
                      )
                    default: return null
                  }
                })()}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
