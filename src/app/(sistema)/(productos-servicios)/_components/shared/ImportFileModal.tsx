"use client"

import { useRef, useState } from "react"

import { ActionButton } from "@/components/common/ActionButton"

interface ImportFileModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (file: File) => void
}

export function ImportFileModal({ isOpen, onClose, onImport }: ImportFileModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  if (!isOpen) return null

  const close = () => {
    setFile(null)
    onClose()
  }

  const handleImport = () => {
    if (!file) return
    onImport(file)
    close()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
      <div
        className="flex w-full max-w-[850px] flex-col border border-gray-200 bg-white font-sans shadow-lg animate-in fade-in zoom-in-95 duration-150"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-[15px] font-bold text-[#111827]">Importar archivo</h2>
          <button type="button" onClick={close} className="cursor-pointer text-[#9ca3af] transition-colors hover:text-[#111827]" aria-label="Cerrar">
            <i className="bi bi-x-lg text-sm" />
          </button>
        </div>

        <div className="p-6 text-[13px] text-[#4b5563]">
          <p className="mb-2 font-medium text-gray-700">Selecciona un archivo (.xlsx, .xls, .csv):</p>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <div className="flex h-14 items-center gap-3 border border-gray-300 bg-gray-50 px-3">
            <ActionButton
              onClick={() => inputRef.current?.click()}
              className="h-9 border border-gray-500 bg-white px-4 text-[13px] font-medium text-gray-800 hover:bg-gray-100"
              text="Seleccionar archivo"
              variant="outline"
            />
            <span className="truncate text-[13px] text-gray-500">{file?.name ?? "Sin archivos seleccionados"}</span>
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <ActionButton
            onClick={close}
            className="h-9 border border-gray-300 bg-white px-4 text-[13px] text-gray-700 hover:bg-gray-100"
            text="Cancelar"
            variant="outline"
          />
          <ActionButton
            onClick={handleImport}
            disabled={!file}
            className="h-9 bg-[#2c1ff3] px-5 text-[13px] text-white hover:bg-[#190fce]"
            text="Guardar"
          />
        </div>
      </div>
    </div>
  )
}
