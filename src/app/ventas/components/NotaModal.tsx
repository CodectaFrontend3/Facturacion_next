"use client"

import { useState } from "react"

interface NotaModalProps {
  isOpen: boolean
  initialValue?: string
  onSave: (text: string) => void
  onDelete?: () => void
  onCancel: () => void
}

export function NotaModal({ isOpen, initialValue = "", onSave, onDelete, onCancel }: NotaModalProps) {
  const [text, setText] = useState(initialValue)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const isEditMode = Boolean(initialValue)

  if (!isOpen) return null

  // Modal de confirmacion de eliminacion
  if (showDeleteConfirm) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <div className="h-[340px] w-[440px] max-w-[calc(100vw-32px)] overflow-hidden rounded-md bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex h-full flex-col items-center px-8 pt-[44px] text-center">
            <div className="mb-[34px] flex h-[86px] w-[86px] items-center justify-center rounded-full border-[4px] border-[#f4c978] text-[#f4c978]">
              <span className="translate-y-[1px] text-[60px] font-light leading-none">!</span>
            </div>

            <h2 className="mb-[32px] text-[30px] font-bold leading-none text-[#55585a]">¿Eliminar nota?</h2>
            <p className="mb-[36px] text-[15px] leading-none text-[#8a8c8f]">Esta acción no se puede deshacer.</p>

            <div className="flex w-full justify-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="h-[42px] min-w-[132px] rounded bg-[#d1d1d1] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#c2c2c2]"
              >
                Cancelar
              </button>
              <button
                onClick={() => { onDelete?.(); setShowDeleteConfirm(false) }}
                className="h-[42px] min-w-[152px] rounded bg-[#2040bd] px-6 text-[16px] font-semibold text-white shadow-[0_1px_4px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#1934a0]"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modal principal (Agregar / Editar)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-[440px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-3 bg-[#1538A0]">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white">
              {isEditMode
                ? <i className="bi bi-pencil-square text-[12px]" />
                : <i className="bi bi-plus-lg text-[13px]" />
              }
            </span>
            <h2 className="text-white text-[14px] font-bold tracking-wide">
              {isEditMode ? "Editar Nota Informativa" : "Agregar Nota Informativa"}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white/80 hover:text-white transition-colors"
            title="Cerrar"
          >
            <i className="bi bi-x-lg text-[15px]" />
          </button>
        </div>

        <div className="px-5 pt-4 pb-3">
          <label className="block text-[12px] text-gray-500 mb-1.5 font-semibold">
            Contenido de la nota:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escriba aquí..."
            autoFocus
            className="w-full h-[130px] border border-gray-300 rounded px-3 py-2 text-[13px] resize-none focus:outline-none focus:border-[#1538A0] focus:ring-1 focus:ring-[#1538A0] transition-all"
          />
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <div>
            {isEditMode && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <i className="bi bi-trash3 text-[12px]" />
                Eliminar
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-1.5 text-[12px] font-semibold border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(text)}
              className="px-4 py-1.5 text-[12px] font-semibold bg-[#1538A0] text-white rounded hover:bg-[#0f2b82] transition-colors"
            >
              {isEditMode ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
