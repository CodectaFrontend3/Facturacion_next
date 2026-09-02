"use client"

import { Input } from "@/components/ui/input"
import { ActionButton } from "@/components/common/ActionButton"
import { useEffect, useState } from "react"

interface UtilityCalculatorProps {
  variant: "producto" | "servicio"
  precioBase: number
  utilidad: number
  onChangePrecioBase?: (valor: number) => void
  onChangeUtilidad?: (valor: number) => void
  precioCompra?: number
  onChangePrecioCompra?: (valor: number) => void
  readOnly?: boolean
  alwaysVisible?: boolean
}

const redondear = (valor: number) => Number(valor.toFixed(2))

export function UtilityCalculator({
  variant,
  precioBase,
  utilidad,
  onChangePrecioBase,
  onChangeUtilidad,
  precioCompra = 0,
  onChangePrecioCompra,
  readOnly = false,
  alwaysVisible = false,
}: UtilityCalculatorProps) {
  const [isOpen, setIsOpen] = useState(alwaysVisible)
  const [precioCompraInput, setPrecioCompraInput] = useState<string | number>(precioCompra || "")
  const [precioVentaInput, setPrecioVentaInput] = useState<string | number>(precioBase || "")
  const precioSinIgv = variant === "servicio"
    ? redondear(precioBase * (1 + utilidad / 100))
    : precioCompra
  const precioConIgv = variant === "servicio"
    ? redondear(precioSinIgv * 1.18)
    : precioBase

  useEffect(() => {
    setPrecioCompraInput(precioSinIgv || "")
    setPrecioVentaInput(precioConIgv || "")
  }, [precioSinIgv, precioConIgv])

  const actualizarCompra = (valor: number) => {
    onChangePrecioCompra?.(valor)
    if (precioBase > 0 && valor > 0) {
      onChangeUtilidad?.(redondear(((precioBase - valor) / valor) * 100))
    }
  }

  const actualizarVentaProducto = (valor: number) => {
    onChangePrecioBase?.(valor)
    if (precioCompra > 0) {
      onChangeUtilidad?.(redondear(((valor - precioCompra) / precioCompra) * 100))
    }
  }

  const panel = (
    <div className="md:col-span-2 bg-[#f8f9fa] border border-gray-200 p-4 space-y-3 rounded-none text-center w-full">
      <p className="text-[12px] text-gray-600 font-sans">
        {variant === "producto"
          ? "Ingrese el precio de compra y el precio de venta para calcular la utilidad."
          : "Puede colocar su precio venta (S/) y el sistema calculará por usted."}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">
            {variant === "producto" ? "Precio de compra" : "Precio sin IGV"}
          </span>
          <div className="flex border border-gray-300 items-center bg-gray-50 h-9">
            <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100 font-sans">S/</span>
            <Input
              type="number"
              value={variant === "servicio" ? precioSinIgv || "" : precioCompraInput}
              disabled={readOnly || variant === "servicio"}
              onChange={(event) => {
                setPrecioCompraInput(event.target.value)
                actualizarCompra(Number(event.target.value))
              }}
              className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">Precio de Venta + IGV</span>
          <div className="flex border border-gray-300 items-center bg-gray-50 h-9">
            <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100 font-sans">S/</span>
            <Input
              type="number"
              value={variant === "servicio" ? precioConIgv || "" : precioVentaInput}
              disabled={readOnly || variant === "servicio"}
              onChange={(event) => {
                setPrecioVentaInput(event.target.value)
                actualizarVentaProducto(Number(event.target.value))
              }}
              className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {!alwaysVisible && (
        <div className="flex h-full items-end">
        <ActionButton
          onClick={() => setIsOpen((visible) => !visible)}
          className="w-full bg-[#1b55c4] hover:bg-[#1546a3] text-white font-bold h-9 text-[11px] uppercase tracking-wider rounded-none cursor-pointer flex items-center justify-center border-none"
          text="¿En duda con su porcentaje de utilidad?"
        />
        </div>
      )}
      {(alwaysVisible || isOpen) && panel}
    </>
  )
}
