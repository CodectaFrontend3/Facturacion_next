"use client"

import React from "react"

interface DocumentFormTemplateProps {
  title: string
  onClose?: () => void
  topForm: React.ReactNode
  tableHeaders?: React.ReactNode // Ahora es opcional
  tableBody: React.ReactNode    // Aquí puede ir la tabla entera o solo las filas
  summarySection?: React.ReactNode
  actions: React.ReactNode
  fullTable?: boolean // Mantengo la prop por si otros archivos la usan, aunque no hace falta en la nueva lógica
}

export function DocumentFormTemplate({
  title,
  onClose,
  topForm,
  tableHeaders,
  tableBody,
  summarySection,
  actions,
  fullTable = false
}: DocumentFormTemplateProps) {
  return (
    <div className="flex flex-col bg-white w-full rounded-md shadow-sm border border-gray-200 my-2">
      {/* Encabezado con padding reducido */}
      <div className="bg-[#f8fafc] px-4 py-3 flex justify-between items-center border-b border-gray-200 rounded-t-md">
        <h2 className="text-[15px] font-extrabold text-[#4f566b]">{title}</h2>
        <div className="flex gap-4 text-gray-400">
          <button className="hover:text-gray-600 transition-colors">
            <i className="bi bi-chevron-up"></i>
          </button>
          {onClose && (
            <button onClick={onClose} className="hover:text-gray-600 transition-colors">
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>

      {/* Contenido Principal con padding reducido p-3 */}
      <div className="p-3 flex flex-col flex-1">

        {/* Formulario Superior */}
        <div className="mb-4 w-full">
          {topForm}
        </div>

        {/* Tabla de Detalle: Si hay cabeceras, usa la estructura rígida. 
            Si no, renderiza el tableBody directamente (para componentes modulares) */}
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
            // Modo Modular: El componente maneja su propia tabla
            <>{tableBody}</>
          )}
        </div>

        {/* Sección de Resumen y Acciones */}
        <div className="mt-auto flex flex-col items-end border-t border-gray-100 pt-2">
          {summarySection && (
            <div className="w-full max-w-[500px] mb-8">
              {summarySection}
            </div>
          )}
          <div className="flex gap-3">
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}
