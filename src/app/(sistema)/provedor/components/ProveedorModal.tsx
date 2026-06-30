import { useState, useEffect } from "react"
import { ProveedorModal as ProveedorModalType } from "../types/proovedor"

interface ProveedorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ProveedorModalType) => void
  provider?: ProveedorModalType | null
  isViewOnly?: boolean
}

const initialFormData: ProveedorModalType = {
  proveedor: {
    ruc: "",
    empresa: "",
    direccion: "",
    telefono: "",
    correo_empresa: ""
  },
  contacto: {
    nombre: "",
    celular: "",
    correo_contacto: ""
  },
  observacion: ""
}

export function ProveedorModal({ isOpen, onClose, onSave, provider, isViewOnly = false }: ProveedorModalProps) {
  const [formData, setFormData] = useState<ProveedorModalType>(initialFormData)

  useEffect(() => {
    if (isOpen) {
      if (provider) {
        setFormData(provider)
      } else {
        setFormData(initialFormData)
      }
    }
  }, [isOpen, provider])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewOnly) return
    const { name, value } = e.target
    
    if (name.startsWith("proveedor.")) {
      const field = name.split(".")[1]
      setFormData(prev => ({
        ...prev,
        proveedor: { ...prev.proveedor, [field]: value }
      }))
    } else if (name.startsWith("contacto.")) {
      const field = name.split(".")[1]
      setFormData(prev => ({
        ...prev,
        contacto: { ...prev.contacto, [field]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = () => {
    onSave(formData)
    setFormData(initialFormData)
  }

  const handleClose = () => {
    setFormData(initialFormData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[850px] bg-white rounded shadow-xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-[15px] font-bold text-[#676a6c]">
            {isViewOnly ? "Visualizar Proveedor" : provider ? "Editar Proveedor" : "Nuevo Proveedor"}
          </h2>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <i className="bi bi-x text-2xl leading-none"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-[18px]">
          
          <div className="grid grid-cols-[120px_1fr] items-center">
            <label className="text-[13px] font-bold text-[#676a6c]">N° Ruc:</label>
            <div className="relative w-full flex">
              <input 
                type="text" 
                name="proveedor.ruc"
                value={formData.proveedor.ruc}
                onChange={handleChange}
                disabled={isViewOnly}
                className="w-full h-[34px] border border-gray-300 border-r-0 rounded-l-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" 
              />
              <button 
                className="h-[34px] w-10 bg-[#676a6c] hover:bg-[#5a5f63] text-white rounded-r-[3px] border border-[#676a6c] transition-colors flex items-center justify-center disabled:opacity-50"
                onClick={() => console.log("Buscar RUC:", formData.proveedor.ruc)}
                disabled={isViewOnly}
              >
                <i className="bi bi-search text-[13px]"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center">
            <label className="text-[13px] font-bold text-[#676a6c]">Empresa:</label>
            <input type="text" name="proveedor.empresa" value={formData.proveedor.empresa} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center">
            <label className="text-[13px] font-bold text-[#676a6c]">Dirección:</label>
            <input type="text" name="proveedor.direccion" value={formData.proveedor.direccion} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center">
            <label className="text-[13px] font-bold text-[#676a6c]">Teléfono:</label>
            <input type="text" name="proveedor.telefono" value={formData.proveedor.telefono} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center border-b border-gray-200 pb-4 mb-4">
            <label className="text-[13px] font-bold text-[#676a6c]">Correo:</label>
            <input type="email" name="proveedor.correo_empresa" value={formData.proveedor.correo_empresa} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center pt-1">
            <label className="text-[13px] font-bold text-[#676a6c]">Contacto:</label>
            <input type="text" name="contacto.nombre" value={formData.contacto.nombre} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center">
            <label className="text-[13px] font-bold text-[#676a6c]">Celular:</label>
            <input type="text" name="contacto.celular" value={formData.contacto.celular} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center border-b border-gray-200 pb-4 mb-4">
            <label className="text-[13px] font-bold text-[#676a6c]">Correo:</label>
            <input type="email" name="contacto.correo_contacto" value={formData.contacto.correo_contacto} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center pt-1">
            <label className="text-[13px] font-bold text-[#676a6c]">Observacion:</label>
            <input type="text" name="observacion" value={formData.observacion} onChange={handleChange} disabled={isViewOnly} className="w-full h-[34px] border border-gray-300 rounded-[3px] px-3 text-[13px] text-[#676a6c] focus:outline-none focus:border-[#1ab394] focus:ring-1 focus:ring-[#1ab394] transition-colors disabled:bg-gray-100" />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-2 border-t border-gray-200 bg-white">
          <button 
            className="bg-white hover:bg-gray-100 text-[#676a6c] border border-gray-300 px-4 py-1.5 rounded-[3px] text-[13px] font-semibold transition-colors cursor-pointer"
            onClick={handleClose}
          >
            Cerrar
          </button>
          {!isViewOnly && (
            <button 
              className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-semibold transition-colors cursor-pointer"
              onClick={handleSave}
            >
              {provider ? "Actualizar" : "Guardar"}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
