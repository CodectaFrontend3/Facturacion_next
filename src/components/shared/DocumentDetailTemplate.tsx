"use client"

import React, { useState } from "react"

interface DocumentDetailTemplateProps {
  title: string                  // Título del documento (ej. "COTIZACIÓN COTF 001-00000001")
  onClose?: () => void           // Acción al cerrar/volver, opcional
  topHeader: React.ReactNode     // Barra de acciones específica del documento (PDF, imprimir, compartir...)
  topBody: React.ReactNode       // Bloques de "Contacto Cliente" / "Condiciones Generales" (o Empresa, en nota de venta)
  tableHeaders?: React.ReactNode // Cabeceras de la tabla de items, opcional (modo rígido)
  tableBody: React.ReactNode     // Tabla de items completa o solo filas (modo modular)
  summarySection?: React.ReactNode // Totales + "Son: ... Soles"
  actions?: React.ReactNode      // Bancos + Mandatario, u otro contenido posterior a los totales
}

export function DocumentDetailTemplate({
  title,
  onClose,
  topHeader,
  topBody,
  tableHeaders,
  tableBody,
  summarySection,
  actions,
}: DocumentDetailTemplateProps) {
  // Igual que en ventas original: el header colapsa (chevron) ocultando topBody,
  // pero la tabla y los totales permanecen siempre visibles.
  const [showHeader, setShowHeader] = useState(true)

  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-sm border border-gray-200 my-2">
      {/* Encabezado con padding reducido */}
      <div className="bg-[#f8fafc] px-4 py-3 flex justify-between items-center border-b border-gray-200 rounded-t-md">
        <h2 className="text-[15px] font-extrabold text-[#4f566b]">{title}</h2>
        <div className="flex gap-4 text-gray-400">
          <button
            onClick={() => setShowHeader((prev) => !prev)}
            className="hover:text-gray-600 transition-colors"
            title="Mostrar u ocultar cabecera"
          >
            <i className={`bi bi-chevron-up transition-transform duration-200 ${showHeader ? "" : "rotate-180"}`} />
          </button>
          {onClose && (
            <button onClick={onClose} className="hover:text-gray-600 transition-colors" title="Cerrar">
              <i className="bi bi-x-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-3 flex flex-col flex-1">

        {/* Barra de acciones del documento (PDF, imprimir, compartir, editar...) */}
        <div className="mb-3 w-full flex justify-end">
          {topHeader}
        </div>

        {/* Bloques de contacto/condiciones — colapsable */}
        {showHeader && (
          <div className="mb-4 w-full">
            {topBody}
          </div>
        )}

        {/* Tabla de Detalle: con cabeceras rígidas o modo modular, igual que DocumentFormTemplate */}
        <div className="w-full mb-2 overflow-x-auto">
          {tableHeaders ? (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-y border-gray-200 bg-white">
                  {tableHeaders}
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          ) : (
            <>{tableBody}</>
          )}
        </div>

        {/* Totales (Son: ... / Subtotal / IGV / Total) */}
        {summarySection && (
          <div className="w-full flex justify-end border-t border-gray-100 pt-4 mt-2">
            {summarySection}
          </div>
        )}

        {/* Contenido posterior: bancos, mandatario, etc. */}
        {actions && (
          <div className="w-full mt-6">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
