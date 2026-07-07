"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ActionButton } from "@/components/common/ActionButton"
import { Servicio, ServicioEstado } from "../../types/servicios.types"
import { showToast } from "@/components/shared/custom-toast"

interface ServicioModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Servicio, "id"> & { id?: string }) => void
  servicio?: Servicio | null
}

const FAMILIA_OPTIONS = ["Seleccionar", "LENOVO", "SAMSUNG", "ESSENZA"]
const SUBFAMILIA_OPTIONS = ["Seleccionar", "Mantenimiento", "Soporte", "Estética", "Redes", "Software"]
const MARCA_OPTIONS = ["EXAMPLE01", "LENOVO", "SAMSUNG", "ESSENZA"]
const AFECTACION_OPTIONS = ["Gravado - Operación Onerosa", "Exonerado - Operación Onerosa", "Inafecto - Operación Onerosa"]

export function ServicioModal({ isOpen, onClose, onSave, servicio }: ServicioModalProps) {
  const [codigoServicio, setCodigoServicio] = useState("")
  const [codigoOriginal, setOriginal] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [familia, setFamilia] = useState("Seleccionar")
  const [subfamilia, setSubfamilia] = useState("Seleccionar")
  const [marca, setMarca] = useState("EXAMPLE01")
  const [descuento, setDescuento] = useState(0)
  const [precioVentaPen, setPrecioVentaPen] = useState(0)
  const [precioVentaUsd, setPrecioVentaUsd] = useState(0)
  const [utilidad, setUtilidad] = useState(0)
  const [fechaRegistro, setFechaRegistro] = useState("07-07-2026")
  const [afectacion, setAfectacion] = useState("Gravado - Operación Onerosa")
  const [imagenUrl, setImagenUrl] = useState<string | null>(null)

  // Estados para la calculadora de utilidad
  const [showUtilityHelper, setShowUtilityHelper] = useState(false)
  const [precioSinIgv, setPrecioSinIgv] = useState(0)
  const [precioConIgv, setPrecioConIgv] = useState(0)

  useEffect(() => {
    if (isOpen) {
      if (servicio) {
        setCodigoServicio(servicio.codigoServicio)
        setOriginal(servicio.codigoOriginal)
        setNombre(servicio.nombre)
        setDescripcion(servicio.descripcion || "")
        setFamilia(servicio.familia)
        setSubfamilia(servicio.subfamilia || "Seleccionar")
        setMarca(servicio.marca || "EXAMPLE01")
        setDescuento(servicio.descuento || 0)
        setPrecioVentaPen(servicio.precioVentaPen)
        setPrecioVentaUsd(servicio.precioVentaUsd)
        setUtilidad(servicio.utilidad || 0)
        setFechaRegistro(servicio.fechaRegistro)
        setAfectacion(servicio.afectacion || "Gravado - Operación Onerosa")
        setImagenUrl(servicio.imagenUrl || null)
        
        // Inicializar calculadora
        const conIgv = servicio.precioVentaPen
        const sinIgv = Number((conIgv / 1.18).toFixed(2))
        setPrecioConIgv(conIgv)
        setPrecioSinIgv(sinIgv)
      } else {
        setCodigoServicio(`SERV-${String(Date.now()).slice(-8)}`)
        setOriginal("")
        setNombre("")
        setDescripcion("")
        setFamilia("Seleccionar")
        setSubfamilia("Seleccionar")
        setMarca("EXAMPLE01")
        setDescuento(0)
        setPrecioVentaPen(0)
        setPrecioVentaUsd(0)
        setUtilidad(0)
        setFechaRegistro("07-07-2026")
        setAfectacion("Gravado - Operación Onerosa")
        setImagenUrl(null)
        setPrecioConIgv(0)
        setPrecioSinIgv(0)
      }
      setShowUtilityHelper(false)
    }
  }, [isOpen, servicio])

  if (!isOpen) return null

  const handlePrecioSinIgvChange = (val: number) => {
    setPrecioSinIgv(val)
    const conIgv = Number((val * 1.18).toFixed(2))
    setPrecioConIgv(conIgv)
    setPrecioVentaPen(conIgv)
    setPrecioVentaUsd(Number((conIgv / 3.75).toFixed(2)))
  }

  const handlePrecioConIgvChange = (val: number) => {
    setPrecioConIgv(val)
    const sinIgv = Number((val / 1.18).toFixed(2))
    setPrecioSinIgv(sinIgv)
    setPrecioVentaPen(val)
    setPrecioVentaUsd(Number((val / 3.75).toFixed(2)))
  }

  const handleSave = () => {
    if (!nombre.trim() || familia === "Seleccionar") {
      showToast("Por favor complete los campos obligatorios (*)", 2)
      return
    }
    onSave({
      id: servicio?.id,
      codigoServicio,
      codigoOriginal: codigoOriginal.trim() || codigoServicio,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      familia,
      subfamilia,
      marca,
      descuento,
      precioVentaPen,
      precioVentaUsd,
      utilidad,
      fechaRegistro,
      afectacion,
      estado: servicio?.estado || "Activo",
      fichaTecnicaUrl: servicio?.fichaTecnicaUrl || null,
      imagenUrl
    })
    onClose()
  }

  const inputClass = "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[850px] bg-white shadow-lg flex flex-col font-sans border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <i className="fa fa-wrench text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">
              {servicio ? "Editar Servicio" : "Nuevo Servicio"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] transition-colors hover:text-[#111827] cursor-pointer"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Cuerpo (Menos altura y scroll auto) */}
        <div className="max-h-[55vh] overflow-y-auto p-6 text-[13px] text-[#4b5563] [&_input]:rounded-none! [&_select]:rounded-none!">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Código (Generado Automáticamente) */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Código*:</span>
              <Input
                type="text"
                value="Código generado automáticamente"
                disabled
                className="h-9 w-full bg-gray-100 border border-gray-200 px-3 text-[13px] outline-none rounded-none shadow-none font-sans text-gray-500 cursor-not-allowed"
              />
            </label>

            {/* Código Original */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Cod. Orig.:</span>
              <Input
                type="text"
                value={codigoOriginal}
                onChange={(e) => setOriginal(e.target.value)}
                className={inputClass}
                placeholder="Ingresa el código original"
              />
            </label>

            {/* Nombre (Spans 2 columns) */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Nombre*:</span>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={inputClass}
                placeholder="Nombre del Servicio"
              />
            </label>

            {/* Descripción (Spans 2 columns) */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Descripción:</span>
              <Input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={inputClass}
                placeholder="Ingresa la descripcion"
              />
            </label>

            {/* Familia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Familia*:</span>
              <NativeSelect
                value={familia}
                onChange={(e) => setFamilia(e.target.value)}
                selectClassName={inputClass}
              >
                {FAMILIA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>

            {/* SubFamilia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">SubFamilia:</span>
              <NativeSelect
                value={subfamilia}
                onChange={(e) => setSubfamilia(e.target.value)}
                selectClassName={inputClass}
              >
                {SUBFAMILIA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>

            {/* Marca */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Marca*:</span>
              <NativeSelect
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                selectClassName={inputClass}
              >
                {MARCA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>

            {/* Descuento */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Desc.:</span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  value={descuento}
                  onChange={(e) => setDescuento(Number(e.target.value))}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">%</span>
              </div>
            </label>

            {/* Precio Nacional */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">P. Nacional:</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">S/</span>
                <Input
                  type="number"
                  value={precioVentaPen}
                  onChange={(e) => {
                    setPrecioVentaPen(Number(e.target.value))
                    const val = Number(e.target.value)
                    setPrecioConIgv(val)
                    setPrecioSinIgv(Number((val / 1.18).toFixed(2)))
                  }}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                />
              </div>
            </label>

            {/* Precio Extranjero */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">P. Extranjero:</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">$</span>
                <Input
                  type="number"
                  value={precioVentaUsd}
                  onChange={(e) => setPrecioVentaUsd(Number(e.target.value))}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                />
              </div>
            </label>

            {/* Utilidad */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Utilidad*:</span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  value={utilidad}
                  onChange={(e) => setUtilidad(Number(e.target.value))}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C]"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">%</span>
              </div>
            </label>

            {/* ¿En duda con su porcentaje de utilidad? */}
            <div className="flex items-end">
              <ActionButton
                onClick={() => setShowUtilityHelper(!showUtilityHelper)}
                className="w-full bg-[#1b55c4] hover:bg-[#1546a3] text-white font-bold h-9 text-[11px] uppercase tracking-wider rounded-none cursor-pointer flex items-center justify-center border-none transition-all shadow-sm hover:shadow"
                text="¿En duda con su porcentaje de utilidad?"
              />
            </div>

            {/* Panel de Calculadora de Utilidad (Spans 2 columns) */}
            {showUtilityHelper && (
              <div className="md:col-span-2 bg-[#f8f9fa] border border-gray-200 p-4 space-y-3 mt-1 rounded-none text-center transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-[12px] text-gray-600 font-sans">
                  Puede colocar su precio venta <strong>(S/)</strong> y el sistema calculará por ud.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Precio sin IGV */}
                  <div>
                    <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">Precio sin IGV</span>
                    <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                      <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">S/</span>
                      <Input
                        type="number"
                        value={precioSinIgv || ""}
                        onChange={(e) => handlePrecioSinIgvChange(Number(e.target.value))}
                        className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Precio de Venta + IGV */}
                  <div>
                    <span className="mb-1 block font-semibold text-gray-700 text-left text-[12px]">Precio de Venta + IGV</span>
                    <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                      <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">S/</span>
                      <Input
                        type="number"
                        value={precioConIgv || ""}
                        onChange={(e) => handlePrecioConIgvChange(Number(e.target.value))}
                        className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fecha */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Fecha:</span>
              <Input
                type="text"
                value={fechaRegistro}
                disabled
                className="h-9 w-full bg-gray-100 border border-gray-200 px-3 text-[13px] outline-none rounded-none shadow-none font-sans text-gray-500 cursor-not-allowed"
              />
            </label>

            {/* Afectación */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Afectación:</span>
              <NativeSelect
                value={afectacion}
                onChange={(e) => setAfectacion(e.target.value)}
                selectClassName={inputClass}
              >
                {AFECTACION_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </label>

            {/* Imagen del Servicio (Boton grande que abre explorador) */}
            <div className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Imagen del Servicio:</span>
              <input
                type="file"
                id="image-file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const localUrl = URL.createObjectURL(file)
                    setImagenUrl(localUrl)
                    showToast(`Imagen ${file.name} cargada correctamente`, 1)
                  }
                }}
              />
              <label
                htmlFor="image-file"
                className="border-2 border-dashed border-gray-300 hover:border-[#18a689] bg-gray-50 hover:bg-gray-100/50 w-full h-32 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-150 p-2"
              >
                {imagenUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={imagenUrl}
                      alt="Vista previa del servicio"
                      className="max-h-28 object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setImagenUrl(null)
                      }}
                      className="absolute top-0 right-0 bg-[#ed5565] text-white rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-[#da4f5d] border-none text-[10px]"
                      title="Eliminar imagen"
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                ) : (
                  <>
                    <i className="bi bi-image text-gray-400 text-[24px]" />
                    <span className="text-[12px] text-gray-500 font-semibold">Seleccionar imagen o arrastrar archivo aquí</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
          <ActionButton
            onClick={handleSave}
            className="bg-[#2c1ff3] hover:bg-[#190fce] text-white rounded-[5px] h-9 text-[13px] px-5"
            text="Guardar"
            variant="filled"
          />
          <ActionButton
            onClick={onClose}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-[5px] h-9 text-[13px] px-4"
            text="Cancelar"
            variant="outline"
          />
        </div>
      </div>
    </div>
  )
}
