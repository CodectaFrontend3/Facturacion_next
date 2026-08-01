"use client"

interface FichaTecnicaModalProps {
  isOpen: boolean
  onClose: () => void
  nombre: string
  fichaTecnicaUrl?: string | null
}

export function FichaTecnicaModal({ isOpen, onClose, nombre, fichaTecnicaUrl }: FichaTecnicaModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="flex w-full max-w-[850px] flex-col border border-gray-200 bg-white font-sans shadow-lg animate-in fade-in zoom-in-95 duration-150"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-[15px] font-bold text-[#111827]">Ficha técnica - {nombre}</h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-[#9ca3af] transition-colors hover:text-[#111827]" title="Cerrar" aria-label="Cerrar">
            <i className="bi bi-x-lg text-sm" />
          </button>
        </div>

        <div className="max-h-[55vh] min-h-80 overflow-y-auto p-6">
          {fichaTecnicaUrl ? (
            <iframe src={fichaTecnicaUrl} title={`Ficha técnica de ${nombre}`} className="h-[50vh] min-h-80 w-full border border-gray-200" />
          ) : (
            <div className="flex h-80 items-center justify-center border border-dashed border-gray-300 bg-gray-50 text-[13px] text-gray-500">
              Este registro no tiene una ficha técnica adjunta.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
