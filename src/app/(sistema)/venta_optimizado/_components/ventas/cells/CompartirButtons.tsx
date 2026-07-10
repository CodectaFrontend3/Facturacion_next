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
  const [correos, setCorreos] = useState<string[]>(correo ? [correo] : [""])

  const agregarCorreo = () => {
    setCorreos((prev) => [...prev, ""])
  }

  const quitarCorreo = (idx: number) => {
    setCorreos((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleCorreoChange = (idx: number, val: string) => {
    setCorreos((prev) => {
      const next = [...prev]
      next[idx] = val
      return next
    })
  }

  const enviarCorreos = () => {
    const validCorreos = correos.map(c => c.trim()).filter(Boolean)
    if (validCorreos.length === 0) return
    const destinos = validCorreos.join(",")
    window.open(
      `mailto:${destinos}?subject=Documento Comercial %23${numeroDoc}`,
      "_blank"
    )
  }

  // --- Contenido popover correo ---
  const correoPopover = (
    <div className="flex flex-col gap-2 p-1 w-[260px]">
      {/* Lista de correos agregados */}
      {correos.map((c, idx) => (
        <div key={idx} className="flex items-center gap-1.5 w-full">
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={c}
            onChange={(e) => handleCorreoChange(idx, e.target.value)}
            className="flex-1 border border-gray-300 rounded-[5px] px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-cyan-500 h-9"
          />
          {idx > 0 && (
            <button
              type="button"
              onClick={() => quitarCorreo(idx)}
              className="text-white bg-[#e35b69] hover:bg-[#c84d59] rounded-[5px] w-9 h-9 flex items-center justify-center text-[14px] font-bold cursor-pointer transition-colors"
            >
              <i className="fa fa-times" />
            </button>
          )}
        </div>
      ))}

      <div className="flex gap-1.5 w-full">
        {/* Agregar correo adicional */}
        <button
          type="button"
          onClick={agregarCorreo}
          className="flex-1 bg-[#17a2b8] hover:bg-[#138496] text-white rounded-[5px] px-3 h-9 text-[12px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <span className="text-[14px] font-bold">+</span> Agregar correo
        </button>

        {/* Enviar */}
        <button
          type="button"
          onClick={enviarCorreos}
          disabled={correos.filter(c => c.trim()).length === 0}
          className="bg-[#6c757d] hover:bg-[#5a6268] disabled:opacity-40 text-white rounded-[5px] w-9 h-9 flex items-center justify-center cursor-pointer transition-colors"
          title="Enviar correos"
        >
          <i className="fa fa-paper-plane text-[12px]" />
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
        popoverClassName="share-popover-anim"
      />

      {/* BOTÓN WHATSAPP — pieza compartida, mismo popover usado en el detalle del documento */}
      <WhatsappShareButton celular={celular} numeroDoc={numeroDoc} />

    </div>
  )
}
