"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ActionButton } from "@/components/common/ActionButton"

export interface ContactoData {
  nombre: string
  cargo?: string
  correo?: string
  telefono1?: string
  telefono2?: string
  estado: "Activo" | "Inactivo"
}

interface ContactoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ContactoData) => void
  contacto?: ContactoData | null
  clienteNombre: string
}

export function ContactoModal({
  isOpen,
  onClose,
  onSave,
  contacto,
  clienteNombre
}: ContactoModalProps) {
  const [nombre, setNombre] = useState("")
  const [cargo, setCargo] = useState("Empleado")
  const [correo, setCorreo] = useState("")
  const [telefono1, setTelefono1] = useState("")
  const [telefono2, setTelefono2] = useState("")

  // Sincronizar datos si estamos en modo edición
  useEffect(() => {
    if (isOpen) {
      if (contacto) {
        setNombre(contacto.nombre || "")
        setCargo(contacto.cargo || "Empleado")
        setCorreo(contacto.correo || "")
        setTelefono1(contacto.telefono1 || "")
        setTelefono2(contacto.telefono2 || "")
      } else {
        setNombre("")
        setCargo("Empleado")
        setCorreo("")
        setTelefono1("")
        setTelefono2("")
      }
    }
  }, [isOpen, contacto])

  if (!isOpen) return null

  const handleSave = () => {
    if (!nombre.trim()) return
    onSave({
      nombre: nombre.trim(),
      cargo: cargo.trim(),
      correo: correo.trim(),
      telefono1: telefono1.trim(),
      telefono2: telefono2.trim(),
      estado: contacto?.estado || "Activo"
    })
    onClose()
  }

  // Estilo de los inputs basado en DataFilters / PaymentModal (h-9, rounded-none, border-gray-300, focus:border-[#18a689])
  const inputClass = "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[680px] rounded-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal (Basado en el PaymentModal de tesorería) */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="fa fa-user text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">Contacto de {clienteNombre}</h2>
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

        {/* Cuerpo del Modal (Padding y estilos del PaymentModal) */}
        <div className="max-h-[75vh] overflow-y-auto p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Nombre del Contacto */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Nombre del Contacto:</span>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={inputClass}
                placeholder="Nombre completo"
              />
            </label>

            {/* Teléfono / Celular */}
            <label className="block min-w-0">
              <span className="mb-1.5 block font-medium text-gray-700">Telefono/Celular:</span>
              <div className="flex items-center gap-2 w-full min-w-0">
                <Input
                  type="text"
                  placeholder="000000"
                  value={telefono1}
                  onChange={(e) => setTelefono1(e.target.value)}
                  className={inputClass}
                />
                <span className="text-gray-400 font-semibold shrink-0">-</span>
                <Input
                  type="text"
                  placeholder="0000"
                  value={telefono2}
                  onChange={(e) => setTelefono2(e.target.value)}
                  className={inputClass}
                />
              </div>
            </label>

            {/* Cargo */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Cargo:</span>
              <Input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className={inputClass}
                placeholder="Empleado, Administrador, etc."
              />
            </label>

            {/* Email */}
            <label className="block">
              <span className="mb-1.5 block font-medium text-gray-700">Email:</span>
              <Input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className={inputClass}
                placeholder="correo@ejemplo.com"
              />
            </label>
          </div>
        </div>

        {/* Footer (Alineación y estilo de botones del PaymentModal) */}
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
            text="Grabar"
            variant="filled"
          />
        </div>
      </div>
    </div>
  )
}
