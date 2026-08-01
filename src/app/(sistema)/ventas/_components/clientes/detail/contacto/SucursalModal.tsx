"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ActionButton } from "@/components/common/ActionButton"

export interface SucursalData {
  nombre: string
  direccion: string
  ciudad: string
  departamento?: string
  provincia?: string
  distrito?: string
  codigoUbigeo?: string
  estado: "Activo" | "Inactivo"
}

interface SucursalModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: SucursalData) => void
  sucursal?: SucursalData | null
  clienteNombre: string
}

export function SucursalModal({
  isOpen,
  onClose,
  onSave,
  sucursal,
  clienteNombre
}: SucursalModalProps) {
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [pais] = useState("Perú")
  const [departamento, setDepartamento] = useState("")
  const [provincia, setProvincia] = useState("")
  const [distrito, setDistrito] = useState("")
  const [codigoUbigeo, setCodigoUbigeo] = useState("")
  const [estado, setEstado] = useState<"Activo" | "Inactivo">("Activo")

  // Sincronizar datos si estamos en modo edición
  useEffect(() => {
    if (isOpen) {
      if (sucursal) {
        setNombre(sucursal.nombre || "")
        setDireccion(sucursal.direccion || "")
        setDepartamento(sucursal.departamento || "")
        setProvincia(sucursal.provincia || "")
        setDistrito(sucursal.distrito || "")
        setCodigoUbigeo(sucursal.codigoUbigeo || "")
        setEstado(sucursal.estado || "Activo")
      } else {
        setNombre("")
        setDireccion("")
        setDepartamento("")
        setProvincia("")
        setDistrito("")
        setCodigoUbigeo("")
        setEstado("Activo")
      }
    }
  }, [isOpen, sucursal])

  if (!isOpen) return null

  const handleSave = () => {
    if (!nombre.trim() || !direccion.trim()) return
    onSave({
      nombre: nombre.trim(),
      direccion: direccion.trim(),
      ciudad: distrito.trim() || departamento.trim() || "Lima",
      departamento: departamento.trim(),
      provincia: provincia.trim(),
      distrito: distrito.trim(),
      codigoUbigeo: codigoUbigeo.trim(),
      estado
    })
    onClose()
  }

  const inputClass = "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0"
  const disabledInputClass = "h-9 w-full bg-gray-100 border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none font-sans text-gray-500 cursor-not-allowed"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[740px] rounded-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="bi bi-geo-alt text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">Sucursales de {clienteNombre}</h2>
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

        {/* Cuerpo del Modal */}
        <div className="max-h-[75vh] overflow-y-auto p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            
            {/* Nombre (full width) */}
            <label className="block md:col-span-3">
              <span className="mb-1.5 block font-medium text-gray-700">Nombre</span>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={inputClass}
                placeholder="Nombre de la sucursal"
              />
            </label>

            {/* Dirección (2/3 width) */}
            <label className="block md:col-span-2">
              <span className="mb-1.5 block font-medium text-gray-700">Direccion</span>
              <Input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className={inputClass}
                placeholder="Dirección física"
              />
            </label>

            {/* País (1/3 width - disabled) */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Pais</span>
              <Input
                type="text"
                value={pais}
                disabled
                className={disabledInputClass}
              />
            </label>

            {/* Departamento */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Departamento</span>
              <Input
                type="text"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className={inputClass}
                placeholder="Ej: Lima"
              />
            </label>

            {/* Provincia */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Provincia</span>
              <Input
                type="text"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className={inputClass}
                placeholder="Ej: Lima"
              />
            </label>

            {/* Distrito */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Distrito</span>
              <Input
                type="text"
                value={distrito}
                onChange={(e) => setDistrito(e.target.value)}
                className={inputClass}
                placeholder="Ej: Miraflores"
              />
            </label>

            {/* Código Ubigeo */}
            <label className="block">
              <span className="mb-1.5 flex items-center font-medium text-gray-700">
                Codigo Ubigeo
                <i className="bi bi-question-circle-fill text-[#2C1FF3] cursor-help ml-1.5 text-[14px]" title="Código de ubicación geográfica" />
              </span>
              <Input
                type="text"
                value={codigoUbigeo}
                onChange={(e) => setCodigoUbigeo(e.target.value)}
                className={inputClass}
                placeholder="Ej: 150122"
              />
            </label>

            {/* Estado (Switch/Toggle) */}
            <div className="block">
              <span className="mb-1.5 block font-medium text-gray-700 font-sans">Estado</span>
              <div className="flex items-center h-9">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={estado === "Activo"}
                    onChange={(e) => setEstado(e.target.checked ? "Activo" : "Inactivo")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C1FF3]"></div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#d8d8d8] px-6 py-4 bg-white">
          <ActionButton
            onClick={onClose}
            className="rounded-[5px] bg-[#6b7280] hover:bg-[#4b5563] text-white"
            text="Cerrar"
            variant="filled"
          />
          <ActionButton
            onClick={handleSave}
            className="rounded-[5px] bg-[#2C1FF3] hover:bg-[#190FCE] text-white"
            text="Guardar"
            variant="filled"
          />
        </div>
      </div>
    </div>
  )
}
