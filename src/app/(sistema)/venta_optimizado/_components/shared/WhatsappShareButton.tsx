// _components/shared/WhatsappShareButton.tsx
"use client"

import { useState } from "react"
import { ActionButton } from "@/components/common/ActionButton"

interface WhatsappShareButtonProps {
  celular?: string | null
  numeroDoc: string
  /** Clase del botón, por defecto el mismo tamaño/estilo de CompartirButtons */
  className?: string
}

export function WhatsappShareButton({
  celular,
  numeroDoc,
  className = "w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px]",
}: WhatsappShareButtonProps) {
  const [numeroWA, setNumeroWA] = useState(celular ?? "")

  const enviarWhatsApp = () => {
    const limpio = numeroWA.replace(/\s+/g, "").replace(/-/g, "")
    if (!limpio) return
    const mensaje = encodeURIComponent(
      `Hola, le hacemos llegar su documento comercial N° ${numeroDoc}.`
    )
    window.open(`https://api.whatsapp.com/send?phone=${limpio}&text=${mensaje}`, "_blank")
  }

  const whatsappPopover = (
    <div className="flex flex-col gap-2 p-1 w-[200px]">
      <input
        type="tel"
        value={numeroWA}
        onChange={(e) => setNumeroWA(e.target.value)}
        placeholder="Ej: 51987654321"
        className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:outline-none focus:border-green-400"
      />
      <button
        onClick={enviarWhatsApp}
        disabled={!numeroWA.trim()}
        className="bg-[#28a745] hover:bg-[#218838] disabled:opacity-40 text-white rounded px-3 py-1.5 text-[12px] font-semibold flex items-center justify-center gap-1.5"
      >
        <i className="bi bi-whatsapp text-[13px]" />
        Enviar por WhatsApp
      </button>
    </div>
  )

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionButton
        icon={<i className="bi bi-whatsapp" />}
        className={className}
        isPopover
        popoverContent={whatsappPopover}
      />
    </div>
  )
}
