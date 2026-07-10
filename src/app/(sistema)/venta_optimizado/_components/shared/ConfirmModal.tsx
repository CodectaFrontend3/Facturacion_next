// _components/shared/ConfirmModal.tsx
"use client"

export type ConfirmModalVariant = "warning" | "error" | "success"

interface ConfirmModalProps {
  isOpen: boolean
  variant: ConfirmModalVariant
  title: string
  description?: string

  /** Modo confirmación: 2 botones (Cancelar / Confirmar) */
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void

  /** Modo informativo: 1 botón OK */
  okText?: string
  onOk?: () => void
}

const VARIANT_STYLES: Record<ConfirmModalVariant, { ring: string; icon: string }> = {
  warning: { ring: "border-[#f8ac59] text-[#f8ac59]", icon: "bi-exclamation-lg" },
  error: { ring: "border-[#dc3545] text-[#dc3545]", icon: "bi-x-lg" },
  success: { ring: "border-[#1ab394] text-[#1ab394]", icon: "bi-check-lg" },
}

export function ConfirmModal({
  isOpen,
  variant,
  title,
  description,
  confirmText,
  cancelText = "Cancelar!",
  onConfirm,
  onCancel,
  okText = "OK",
  onOk,
}: ConfirmModalProps) {
  if (!isOpen) return null

  const style = VARIANT_STYLES[variant]
  const isConfirmMode = Boolean(onConfirm)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-[420px] px-8 py-10 text-center">
        <div
          className={`mx-auto mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full border-[3px] ${style.ring}`}
        >
          <i className={`bi ${style.icon} text-[34px] ${style.ring.split(" ")[1]}`} />
        </div>

        <h2 className="text-[22px] font-extrabold text-[#4f566b] mb-2">{title}</h2>
        {description && (
          <p className="text-[13px] text-gray-500 mb-6">{description}</p>
        )}

        {isConfirmMode ? (
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-sm bg-gray-200 hover:bg-gray-300 text-[#4f566b] text-[13px] font-semibold transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 rounded-sm bg-[#1e40af] hover:bg-[#190FCE] text-white text-[13px] font-semibold transition-colors"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <button
            onClick={onOk}
            className="mt-2 px-8 py-2 rounded-sm bg-[#5bc0de] hover:bg-[#46b8da] text-white text-[13px] font-semibold transition-colors"
          >
            {okText}
          </button>
        )}
      </div>
    </div>
  )
}
