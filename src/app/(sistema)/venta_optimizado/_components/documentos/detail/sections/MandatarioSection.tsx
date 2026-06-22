// _components/documentos/detail/sections/MandatarioSection.tsx
"use client"

export interface MandatarioInfo {
  telefono: string
  email?: string
  celular?: string
  web?: string
}

interface MandatarioSectionProps {
  mandatario: MandatarioInfo
}

export function MandatarioSection({ mandatario }: MandatarioSectionProps) {
  return (
    <div className="flex flex-col items-end justify-between gap-6 pt-6 sm:flex-row">
      <div className="space-y-1 leading-relaxed text-[13px] text-[#676a6c]">
        <p className="font-bold underline">Atendido por:</p>
        <p><span className="font-bold">Teléfono:</span> {mandatario.telefono}</p>
        {mandatario.email && (
          <p><span className="font-bold">Email:</span> {mandatario.email}</p>
        )}
        {mandatario.celular && (
          <p><span className="font-bold">Celular:</span> {mandatario.celular}</p>
        )}
        {mandatario.web && (
          <p>
            <span className="font-bold">Web:</span>{" "}
            <a href={mandatario.web} target="_blank" rel="noreferrer" className="underline hover:text-gray-800">
              {mandatario.web}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
