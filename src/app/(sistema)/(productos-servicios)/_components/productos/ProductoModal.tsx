"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ActionButton } from "@/components/common/ActionButton"
import { Producto, ProductoEstado } from "../../types/productos.types"

interface ProductoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Producto, "id"> & { id?: string }) => void
  producto?: Producto | null
}

const UNIDAD_OPTIONS = ["Unidad", "Bolsa", "Metros", "Caja", "Kilos"]
const ESTADO_OPTIONS: ProductoEstado[] = ["Activo", "Inactivo"]

export function ProductoModal({ isOpen, onClose, onSave, producto }: ProductoModalProps) {
  const [codigo, setCodigo] = useState("")
  const [nombre, setNombre] = useState("")
  const [marca, setMarca] = useState("")
  const [unidad, setUnidad] = useState("Unidad")
  const [estado, setEstado] = useState<ProductoEstado>("Activo")
  const [precioNacional, setPrecioNacional] = useState(0)
  const [stock, setStock] = useState(0)

  useEffect(() => {
    if (isOpen) {
      if (producto) {
        setCodigo(producto.codigo)
        setNombre(producto.nombre)
        setMarca(producto.marca)
        setUnidad(producto.unidad)
        setEstado(producto.estado)
        setPrecioNacional(producto.precioNacional)
        setStock(producto.stock)
      } else {
        setCodigo("")
        setNombre("")
        setMarca("")
        setUnidad("Unidad")
        setEstado("Activo")
        setPrecioNacional(0)
        setStock(0)
      }
    }
  }, [isOpen, producto])

  if (!isOpen) return null

  const handleSave = () => {
    if (!codigo.trim() || !nombre.trim() || !marca.trim()) return
    onSave({
      id: producto?.id,
      codigo: codigo.trim(),
      nombre: nombre.trim(),
      marca: marca.trim(),
      unidad,
      estado,
      precioNacional,
      stock,
      fichaTecnicaUrl: producto?.fichaTecnicaUrl || null,
      fechaRegistro: producto?.fechaRegistro || "07-07-2026"
    })
    onClose()
  }

  const inputClass = "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] bg-white shadow-lg flex flex-col font-sans border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="fa fa-cube text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">
              {producto ? "Editar Producto" : "Nuevo Producto"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] transition-colors hover:text-[#111827] cursor-pointer"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="max-h-[70vh] overflow-y-auto p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Código */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Código del Producto:</span>
              <Input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className={inputClass}
                placeholder="Ej. PROD-000001"
              />
            </label>

            {/* Nombre */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Nombre del Producto:</span>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={inputClass}
                placeholder="Ej. Laptop Lenovo"
              />
            </label>

            {/* Marca */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Marca:</span>
              <Input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className={inputClass}
                placeholder="Ej. Samsung, Lenovo"
              />
            </label>

            {/* Unidad */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Unidad de Medida:</span>
              <NativeSelect
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                selectClassName={inputClass}
              >
                {UNIDAD_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>

            {/* Precio Nacional */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Precio Nacional:</span>
              <Input
                type="number"
                value={precioNacional}
                onChange={(e) => setPrecioNacional(Number(e.target.value))}
                className={inputClass}
              />
            </label>

            {/* Stock */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Stock:</span>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className={inputClass}
              />
            </label>

            {/* Estado */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Estado:</span>
              <NativeSelect
                value={estado}
                onChange={(e) => setEstado(e.target.value as ProductoEstado)}
                selectClassName={inputClass}
              >
                {ESTADO_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 bg-gray-50">
          <ActionButton
            onClick={handleSave}
            className="bg-[#2c1ff3] hover:bg-[#190fce] text-white rounded-[5px] h-9 text-[13px] px-5"
            text="Guardar"
            variant="filled"
          />
          <ActionButton
            onClick={onClose}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-[5px] h-9 text-[13px] px-4"
            text="Cancelar"
            variant="outline"
          />
        </div>
      </div>
    </div>
  )
}
