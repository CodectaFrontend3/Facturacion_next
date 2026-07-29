"use client"

interface Contacto {
  nombre: string
  cargo?: string
  correo?: string
  telefono1?: string
  telefono2?: string
  estado: "Activo" | "Inactivo"
}

interface ContactoCardProps {
  contacto: Contacto
  onClick: () => void
}

export function ContactoCard({ contacto, onClick }: ContactoCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-3 bg-gray-50 border border-gray-200 rounded transition-all hover:bg-gray-100/50 cursor-pointer"
      title="Haz clic para editar este contacto"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Imagen de perfil / Inicial */}
        <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 font-bold shrink-0">
          {contacto.nombre.charAt(0)}
        </div>
        
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-bold text-gray-800 truncate">
            {contacto.nombre}
          </span>
          <span className="text-[11px] text-gray-500 font-medium truncate">
            {contacto.cargo}
          </span>
        </div>
      </div>

      {/* Datos del contacto (Email, Teléfono 1, Teléfono 2, Estado) */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-gray-600 font-medium md:justify-end">
        {contacto.correo && (
          <div className="flex items-center gap-1.5 min-w-[170px]">
            <i className="bi bi-envelope text-[13px] text-gray-400" />
            <span className="truncate">{contacto.correo}</span>
          </div>
        )}
        
        {contacto.telefono1 && (
          <div className="flex items-center gap-1.5">
            <i className="fa fa-phone text-[13px] text-gray-400" />
            <span>{contacto.telefono1}</span>
          </div>
        )}
        
        {contacto.telefono2 && (
          <div className="flex items-center gap-1.5">
            <i className="bi bi-telephone text-[13px] text-gray-400" />
            <span>{contacto.telefono2}</span>
          </div>
        )}

        <span className="bg-[#18a689] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] shrink-0">
          {contacto.estado}
        </span>
      </div>
    </div>
  )
}
