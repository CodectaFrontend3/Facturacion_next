"use client"

import { ReactNode } from "react"

import { ActionButton } from "@/components/common/ActionButton"

export interface DetailField {
  label: string
  value: ReactNode
  fullWidth?: boolean
  bare?: boolean
}

interface ReadOnlyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iconClass: string
  fields: DetailField[]
  imageUrl?: string | null
  imageAlt: string
  utilityCalculator?: ReactNode
}

export function ReadOnlyDetailModal({
  isOpen,
  onClose,
  title,
  iconClass,
  fields,
  imageUrl,
  imageAlt,
  utilityCalculator,
}: ReadOnlyDetailModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[850px] flex-col border border-gray-200 bg-white font-sans shadow-lg animate-in fade-in zoom-in-95 duration-150"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <i className={`${iconClass} text-[15px] text-[#2C1FF3]`} />
            <h2 className="text-[15px] font-bold text-[#111827]">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#9ca3af] transition-colors hover:text-[#111827]"
            title="Cerrar"
            aria-label="Cerrar"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {fields.map((field, index) => (
              <div key={`${field.label}-${index}`} className={field.fullWidth ? "md:col-span-2" : ""}>
                {field.bare ? field.value : <>
                <span className="mb-1 block font-medium text-gray-700">{field.label}:</span>
                <div className="min-h-9 border border-gray-200 bg-gray-50 px-3 py-2 text-[#676A6C]">
                  {field.value ?? "—"}
                </div>
                </>}
              </div>
            ))}

            {
              <div className="flex items-center gap-3 md:col-span-2">
                <span className="font-medium text-gray-700">Imagen:</span>
                <div className="flex size-24 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 p-2">
                  {imageUrl ? (
                    <img src={imageUrl} alt={imageAlt} className="size-full object-contain" />
                  ) : (
                    <i className="bi bi-image text-2xl text-gray-400" aria-label="Sin imagen" />
                  )}
                </div>
              </div>
            }
          </div>
        </div>

        <div className="flex shrink-0 justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
          <ActionButton
            onClick={onClose}
            className="h-9 rounded-[5px] border border-gray-300 bg-white px-4 text-[13px] text-gray-700 hover:bg-gray-100"
            text="Cerrar"
            variant="outline"
          />
        </div>
      </div>
    </div>
  )
}
