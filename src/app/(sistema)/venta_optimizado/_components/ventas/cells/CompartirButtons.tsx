// _components/ventas/cells/CompartirButtons.tsx
"use client"

import { useState } from "react"
import { ActionButton } from "@/components/common/ActionButton"
import { WhatsappShareButton } from "../../../_components/shared/WhatsappShareButton"

interface CompartirButtonsProps {
  celular?: string | null
  correo?: string | null
  numeroDoc: string
}

export const CompartirButtons = ({ celular, correo, numeroDoc }: CompartirButtonsProps) => {

  // --- Estado del popover de correo ---
  const [correos, setCorreos] = useState<string[]>(correo ? [correo] : [])
  const [nuevoCorreo, setNuevoCorreo] = useState("")

  const agregarCorreo = () => {
    const trimmed = nuevoCorreo.trim()
    if (trimmed && !correos.includes(trimmed)) {
      setCorreos((prev) => [...prev, trimmed])
      setNuevoCorreo("")
    }
  }

  const quitarCorreo = (idx: number) => {
    setCorreos((prev) => prev.filter((_, i) => i !== idx))
  }

  const enviarCorreos = () => {
    if (correos.length === 0) return
    const destinos = correos.join(",")
    window.open(
      `mailto:${destinos}?subject=Documento Comercial %23${numeroDoc}`,
      "_blank"
    )
  }

  // --- Contenido popover correo ---
  const correoPopover = (
    <div className="flex flex-col gap-2 p-1 w-[230px]">
      {/* Lista de correos agregados */}
      {correos.map((c, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <input
            readOnly
            value={c}
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-[12px] bg-gray-50 text-gray-700"
          />
          {idx > 0 && (
            <button
              onClick={() => quitarCorreo(idx)}
              className="text-white bg-red-500 hover:bg-red-600 rounded px-1.5 py-1 text-[11px] font-bold"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Input para nuevo correo */}
      <input
        type="email"
        placeholder="correo@ejemplo.com"
        value={nuevoCorreo}
        onChange={(e) => setNuevoCorreo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarCorreo()}
        className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:outline-none focus:border-blue-400"
      />

      <div className="flex gap-1">
        {/* Agregar correo adicional */}
        <button
          onClick={agregarCorreo}
          className="flex-1 bg-[#17a2b8] hover:bg-[#138496] text-white rounded px-2 py-1 text-[11px] font-semibold flex items-center gap-1"
        >
          <span className="text-[13px] font-bold">+</span> Agregar correo
        </button>

        {/* Enviar */}
        <button
          onClick={enviarCorreos}
          disabled={correos.length === 0}
          className="bg-[#6c757d] hover:bg-[#5a6268] disabled:opacity-40 text-white rounded px-2 py-1"
          title="Enviar correos"
        >
          <i className="bi bi-send text-[12px]" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>

      {/* BOTÓN CORREO */}
      <ActionButton
        icon={<i className="bi bi-envelope" />}
        className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px]"
        isPopover
        popoverContent={correoPopover}
      />

      {/* BOTÓN WHATSAPP — pieza compartida, mismo popover usado en el detalle del documento */}
      <WhatsappShareButton celular={celular} numeroDoc={numeroDoc} />

    </div>
  )
}
