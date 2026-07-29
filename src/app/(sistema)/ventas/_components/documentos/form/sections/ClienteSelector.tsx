// _components/documentos/form/sections/ClienteSelector.tsx
"use client"

import { useMemo } from "react"
import { Plus } from "lucide-react"
import { CboData } from "@/components/common/CboData"
import { ClienteFilaLista } from "../../../../_domain/types/cliente.types"

interface ClienteSelectorProps {
  clientes: ClienteFilaLista[]
  value: string
  onChange: (clienteId: string) => void
  onAddClienteClick: () => void
}

export function ClienteSelector({ clientes, value, onChange, onAddClienteClick }: ClienteSelectorProps) {
  // Mismo formato de etiqueta que el resto del módulo: "Nombre | Documento"
  const clienteOptions = useMemo(
    () =>
      clientes.map((c) => ({
        value: c.id,
        label: `${c.nombre} | ${c.numeroDocumento}`,
      })),
    [clientes]
  )

  return (
    <div className="flex gap-2">
      <CboData
        items={clienteOptions}
        value={value}
        onChange={onChange}
        placeholder="Seleccionar Cliente"
        className="flex-1"
        hideArrow
      />
      <button
        type="button"
        onClick={onAddClienteClick}
        className="bg-[#70757a] text-white p-2 rounded-sm hover:bg-gray-600 transition-colors flex items-center justify-center"
        title="Agregar nuevo cliente"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
