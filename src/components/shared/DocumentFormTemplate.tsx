import React from "react"

interface DocumentFormTemplateProps {
  title: string
  onClose?: () => void
  topForm: React.ReactNode
  tableHeaders?: React.ReactNode
  tableBody: React.ReactNode
  summarySection?: React.ReactNode
  actions: React.ReactNode
  fullTable?: boolean // Nueva prop para indicar que tableBody es una tabla completa
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
    <div className="flex flex-col bg-white w-full rounded-md shadow-sm border border-gray-200 my-4">
      {/* Encabezado */}
      <div className="bg-[#ffffff] px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-md">
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

      {/* Contenido Principal */}
      <div className="px-4 pt-3 pb-8 flex flex-col flex-1">
        
        {/* Formulario Superior */}
        <div className="mb-6 w-full">
          {topForm}
        </div>

        {/* Tabla de Detalle */}
        {fullTable ? (
          <div className="w-full mb-4 overflow-x-auto">
            {tableBody}
          </div>
        ) : (
          <div className="w-full mb-4 overflow-x-auto">
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
          </div>
        )}

        {/* Sección de Resumen y Acciones */}
        <div className="flex flex-col items-end pt-0">
          {summarySection && (
            <div className="w-full max-w-[400px] mb-8">
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
