"use client"

import React from "react"

interface DocumentDetailTemplateProps {
  title: string   //titulo
  onClose?: () => void  //funcion para cerrar el modal, opcional
  topHeader: React.ReactNode  //contenido para el encabezado superior, opcional
  topBody: React.ReactNode  //contenido para el cuerpo superior, opcional
  tableHeaders?: React.ReactNode //contenido para las cabeceras de la tabla, opcional
  tableBody: React.ReactNode    //contenido para el cuerpo de la tabla, obligatorio
  summarySection?: React.ReactNode
  actions?: React.ReactNode
}

export function DocumentDetailTemplate({
  title,
  onClose,
  topHeader,
  topBody,
  tableHeaders,
  tableBody,
  summarySection,
  actions
}: DocumentDetailTemplateProps) {
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

            {/* Contenido Principal con padding reducido p-3 */}
        </div>
    </div>
    )
}
