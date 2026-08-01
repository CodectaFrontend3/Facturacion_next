// _components/documentos/detail/sections/HeaderSection.tsx
"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"
import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { ClienteDetalle } from "../../../../_domain/types/cliente.types"
import { WhatsappShareButton } from "../../../shared/WhatsappShareButton"

// --- Botón de acción reutilizado en la barra superior ---
function ActionBtn({ icon, color, title, onClick }: { icon: string; color: string; title?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}
      title={title}
    >
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

interface HeaderSectionProps {
  tipo: DocumentoTipo
  numero: string
  documentTitle: string
  cliente?: ClienteDetalle

  // Compartir
  clienteCelular?: string | null

  // Modo edición
  isEditing?: boolean
  /** Si el documento fue finalizado, el botón de editar no debe mostrarse */
  puedeEditar?: boolean
  onEditar?: () => void
  onGenerarNotaVenta?: () => void
}

export function HeaderSection({
  tipo,
  numero,
  documentTitle,
  cliente,
  clienteCelular,
  isEditing = false,
  puedeEditar = true,
  onEditar,
  onGenerarNotaVenta,
}: HeaderSectionProps) {
  const isCotizacion = tipo === "cotizacion" || tipo === "cotizacion_manual"
  // Toggle del botón "Generar Nota de Venta": colapsado por defecto (solo flecha blanca),
  // se expande mostrando el botón teal + flecha al hacer clic.
  const [showGenerarVenta, setShowGenerarVenta] = useState(false)

  return (
    <>
      {/* Barra de número/título + acciones.
          relative + absolute centra el título de forma verdadera, inmune
          a cuántos botones haya a la derecha (no se desplaza al expandir/colapsar). */}
      <div className="relative flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="font-bold text-[16px] tracking-wide text-[#676a6c]">{numero}</h2>
          {isCotizacion && cliente && (
            /* Quitamos el font-bold general del <p> y lo manejamos individualmente adentro */
            <p className="text-[13px] text-[#676a6c]">
              <span className="font-bold">R.U.C : </span>
              <span className="font-light">{cliente.numeroDocumento}</span>
            </p>
          )}
        </div>

        <h1 className="absolute left-1/2 top-0 -translate-x-1/2 text-[24px] tracking-tight font-thin uppercase tracking-[0.2em] text-[#676a6c]  whitespace-nowrap">
          {documentTitle}
        </h1>

        <div className="flex items-center gap-1 transition-all duration-300 ease-out">
          {isCotizacion ? (
            <>
              {/* Botón toggle: por defecto solo la flecha blanca (colapsado), en el extremo izquierdo.
                  Al hacer clic, se expande revelando "Generar Nota de Venta" a su izquierda. */}
              {!isEditing && (
                <>
                  {showGenerarVenta && (
                    <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                      <ActionButton
                        icon={<i className="bi bi-file-earmark-text text-[14px]" />}
                        className="w-8 h-[32px] bg-[#1ab394] hover:brightness-95 rounded-[4px] text-white"
                        isPopover
                        popoverContent={
                          <div className="flex flex-col gap-2 p-1 w-[220px]">
                            <p className="text-[12px] text-[#676a6c] px-1">
                              ¿Generar Nota de Venta a partir de esta cotización?
                            </p>
                            <button
                              onClick={onGenerarNotaVenta}
                              className="bg-[#1ab394] hover:bg-[#159c80] text-white rounded px-3 py-1.5 text-[12px] font-semibold"
                            >
                              Sí, generar
                            </button>
                          </div>
                        }
                      />
                    </div>
                  )}

                  <ActionButton
                    icon={
                      <ChevronLeft
                        className={`w-4 h-4 transition-transform duration-300 ${showGenerarVenta ? "rotate-180" : ""}`}
                        strokeWidth={2.5}
                      />
                    }
                    onClick={() => setShowGenerarVenta((prev) => !prev)}
                    className="w-8 h-[32px] bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-gray-600"
                  />
                </>
              )}
              <ActionBtn icon="bi-share-fill" color="bg-[#6c757d]" title="Compartir" />
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#007bff]" title="PDF" />
              <ActionBtn icon="bi-printer" color="bg-[#17a2b8]" title="Imprimir" />
              <ActionBtn icon="bi-envelope" color="bg-[#6c757d]" title="Correo" />
              <WhatsappShareButton
                celular={clienteCelular}
                numeroDoc={numero}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#28a745] hover:brightness-95 text-white"
              />
              {isEditing ? (
                <ActionBtn icon="bi-x-lg" color="bg-[#dc3545]" title="Cancelar edición" onClick={onEditar} />
              ) : (
                puedeEditar && (
                  <ActionBtn icon="bi-pencil-fill" color="bg-[#ffc107]" title="Editar" onClick={onEditar} />
                )
              )}
            </>
          ) : (
            <>
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
              <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
              <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
              <ActionBtn icon="bi-envelope-fill" color="bg-[#6c757d]" title="Correo" />
              <WhatsappShareButton
                celular={clienteCelular}
                numeroDoc={numero}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#008000] hover:brightness-95 text-white"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
