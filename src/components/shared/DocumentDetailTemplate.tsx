"use client"

import React, { useState } from "react"

interface DocumentDetailTemplateProps {
  onClose?: () => void           // Acción al cerrar/volver a la lista (flecha ←)
  topHeader: React.ReactNode     // Barra de acciones específica del documento (PDF, imprimir, compartir...)
  topBody: React.ReactNode       // Bloques de "Contacto Cliente" / "Condiciones Generales" (o Empresa, en nota de venta)
  tableHeaders?: React.ReactNode // Cabeceras de la tabla de items, opcional (modo rígido)
  tableBody: React.ReactNode     // Tabla de items completa o solo filas (modo modular)
  summarySection?: React.ReactNode // Totales + "Son: ... Soles"
  actions?: React.ReactNode      // Bancos + Mandatario, u otro contenido posterior a los totales
}

export function DocumentDetailTemplate({
  onClose,
  topHeader,
  topBody,
  tableHeaders,
  tableBody,
  summarySection,
  actions,
}: DocumentDetailTemplateProps) {
  // El chevron colapsa SOLO topBody (Contacto Cliente / Condiciones Generales),
  // nunca la barra de número/título/acciones que vive dentro de topHeader.
  const [showBody, setShowBody] = useState(true)

  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-sm border border-gray-200 my-2">
      {/* Franja superior minimalista: solo flecha de volver + chevron/cerrar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Volver a la lista"
        >
          <i className="bi bi-arrow-left text-[16px]" />
        </button>

        <div className="flex gap-4 text-gray-400">
          <button
            onClick={() => setShowBody((prev) => !prev)}
            className="hover:text-gray-600 transition-colors"
            title="Mostrar u ocultar cabecera"
          >
            <i className={`bi bi-chevron-up transition-transform duration-200 ${showBody ? "" : "rotate-180"}`} />
          </button>
          {onClose && (
            <button onClick={onClose} className="hover:text-gray-600 transition-colors" title="Cerrar">
              <i className="bi bi-x-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-6 flex flex-col flex-1">

        {/* Barra de número/título/acciones (vive dentro de HeaderSection) */}
        <div className="w-full">
          {topHeader}
        </div>

        {/* Bloques de contacto/condiciones — colapsable independientemente del header */}
        {showBody && (
          <div className="mt-4 w-full">
            {topBody}
          </div>
        )}

        {/* Tabla de Detalle: con cabeceras rígidas o modo modular */}
        <div className="w-full mb-2 mt-6 overflow-x-auto">
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
