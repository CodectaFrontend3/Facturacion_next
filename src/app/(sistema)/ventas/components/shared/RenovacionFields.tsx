"use client"

import React, { useMemo } from "react"

/**
 * PROPIEDADES DE LOS CAMPOS DE RENOVACIÓN
 * @param isActive - Indica si la opción de renovación está habilitada (Switch)
 * @param fechaRenovacion - Fecha límite para la renovación
 * @param onChange - Callback para notificar cambios en el estado
 */
interface RenovacionFieldsProps {
  isActive: boolean
  fechaRenovacion: string
  onChange: (data: { isActive: boolean; fechaRenovacion: string }) => void
}

/**
 * RenovacionFields: Componente que gestiona la lógica visual de las renovaciones.
 * Incluye el interruptor de activación y el cálculo de días restantes/vencidos.
 */
export function RenovacionFields({ isActive, fechaRenovacion, onChange }: RenovacionFieldsProps) {
  
  // Cálculo de los días de renovación (Restantes o Vencidos)
  const renovacionInfo = useMemo(() => {
    if (!fechaRenovacion) return null
    const targetDate = new Date(fechaRenovacion)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) return { text: `Faltan ${diffDays} días`, color: "text-blue-500" }
    if (diffDays < 0) return { text: `Venció hace ${Math.abs(diffDays)} días`, color: "text-red-500" }
    return { text: "Vence hoy", color: "text-orange-500" }
  }, [fechaRenovacion])

  return (
    <div className="flex flex-col gap-4 mt-2">
      {/* Switch de activación */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange({ isActive: !isActive, fechaRenovacion })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isActive ? "bg-[#18a689]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-[13px] text-[#676a6c]">Activar renovación</span>
      </div>

      {/* Selector de fecha y aviso de vencimiento (solo si está activo) */}
      {isActive && (
        <div className="flex flex-col gap-1">
          <input
            type="date"
            value={fechaRenovacion}
            onChange={(e) => onChange({ isActive, fechaRenovacion: e.target.value })}
            className="border border-gray-300 rounded-sm px-4 py-1 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400"
          />
          {renovacionInfo && (
            <span className={`text-[11px] font-bold ${renovacionInfo.color}`}>
              {renovacionInfo.text}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
