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
    <div className="flex flex-col items-end justify-between gap-6 pt-6 sm:flex-row pl-5 pr-5 ">

      <div className="space-y-1 leading-relaxed text-[13px] text-[#676a6c] w-full">
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

      <div className="w-128 mx-auto text-center space-y-2 pb-4">
        <hr className="border-t border-gray-300 w-full mb-2" />
        <span className="text-[13px] text-[#676a6c] tracking-wider block">
          SSSS
        </span>
      </div>
    </div>
  )
}
