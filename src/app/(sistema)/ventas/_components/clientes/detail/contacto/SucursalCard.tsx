"use client"

import { SucursalData } from "./SucursalModal"

interface SucursalCardProps {
  sucursal: SucursalData
  onClick: () => void
}

export function SucursalCard({ sucursal, onClick }: SucursalCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-3 bg-gray-50 border border-gray-200 rounded transition-all hover:bg-gray-100/50 cursor-pointer"
      title="Haz clic para editar esta sucursal"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500 font-bold shrink-0">
          <i className="fa fa-building text-[14px]" />
        </div>
        
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-bold text-gray-800 truncate">
            {sucursal.nombre}
          </span>
          <span className="text-[11px] text-gray-500 font-medium truncate">
            {sucursal.direccion}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[12px] text-gray-600 font-medium md:justify-end">
        <div className="flex items-center gap-1.5">
          <i className="bi bi-geo-alt text-[13px] text-gray-400" />
          <span>{sucursal.ciudad}</span>
        </div>

        <span className="bg-[#18a689] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] shrink-0">
          {sucursal.estado}
        </span>
      </div>
    </div>
  )
}
