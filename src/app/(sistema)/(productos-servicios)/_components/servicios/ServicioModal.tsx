"use client"

import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ActionButton } from "@/components/common/ActionButton"
import { Servicio } from "../../types/servicios.types"
import { useServicioForm } from "../../_hooks/useServicioForm"
import { UtilityCalculator } from "../shared/UtilityCalculator"
import { useWatch } from "react-hook-form"

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
  const {
    form,
    onSubmit,
    setValue,
    imageInputRef,
    handleImageChange,
  } = useServicioForm({
    isOpen,
    servicio,
    onSave,
    onClose,
  })

  const { register, control, watch, formState: { errors } } = form

  const precioVentaPen = useWatch({ control, name: "precioVentaPen" }) ?? 0
  const utilidad = useWatch({ control, name: "utilidad" }) ?? 0
  const fechaRegistro = watch("fechaRegistro")
  const imagenUrl = watch("imagenUrl")

  if (!isOpen) return null

  const handleImageClick = () => {
    imageInputRef.current?.click()
  }

  const inputClass =
    "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[850px] bg-white shadow-lg flex flex-col font-sans border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
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
            type="button"
            onClick={onClose}
            className="text-[#9ca3af] transition-colors hover:text-[#111827] cursor-pointer"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="max-h-[55vh] overflow-y-auto p-6 text-[13px] text-[#4b5563] [&_input]:rounded-none! [&_select]:rounded-none!">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Código */}
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
                {...register("codigoOriginal")}
                className={inputClass}
                placeholder="Ingresa el código original"
              />
              {errors.codigoOriginal && <p className="mt-1 text-xs text-red-500">{errors.codigoOriginal.message}</p>}
            </label>

            {/* Nombre */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Nombre*:</span>
              <Input
                type="text"
                {...register("nombre")}
                className={inputClass}
                placeholder="Nombre del Servicio"
              />
              {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre.message}</p>}
            </label>

            {/* Descripción */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Descripción:</span>
              <Input
                type="text"
                {...register("descripcion")}
                className={inputClass}
                placeholder="Ingresa la descripcion"
              />
              {errors.descripcion && <p className="mt-1 text-xs text-red-500">{errors.descripcion.message}</p>}
            </label>

            {/* Familia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Familia*:</span>
              <NativeSelect
                {...register("familia")}
                selectClassName={inputClass}
              >
                {FAMILIA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.familia && <p className="mt-1 text-xs text-red-500">{errors.familia.message}</p>}
            </label>

            {/* SubFamilia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">SubFamilia:</span>
              <NativeSelect
                {...register("subfamilia")}
                selectClassName={inputClass}
              >
                {SUBFAMILIA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.subfamilia && <p className="mt-1 text-xs text-red-500">{errors.subfamilia.message}</p>}
            </label>

            {/* Marca */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Marca*:</span>
              <NativeSelect
                {...register("marca")}
                selectClassName={inputClass}
              >
                {MARCA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.marca && <p className="mt-1 text-xs text-red-500">{errors.marca.message}</p>}
            </label>

            {/* Descuento */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Desc.:</span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("descuento", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">%</span>
              </div>
              {errors.descuento && <p className="mt-1 text-xs text-red-500">{errors.descuento.message}</p>}
            </label>

            {/* Precio Nacional */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">P. Nacional:</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">S/</span>
                <Input
                  type="number"
                  {...register("precioVentaPen", { valueAsNumber: true })}
                  onChange={(event) => {
                    const valor = Number(event.target.value)
                    setValue("precioVentaPen", valor, { shouldValidate: true, shouldDirty: true })
                    setValue("precioVentaUsd", Number((valor / 3.75).toFixed(2)), { shouldValidate: true, shouldDirty: true })
                  }}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                />
              </div>
              {errors.precioVentaPen && <p className="mt-1 text-xs text-red-500">{errors.precioVentaPen.message}</p>}
            </label>

            {/* Precio Extranjero */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">P. Extranjero:</span>
              <div className="flex border border-gray-300 items-center bg-gray-50 h-9 focus-within:border-[#18a689]">
                <span className="px-3 text-gray-500 font-semibold text-[13px] border-r border-gray-300 h-full flex items-center bg-gray-100">$</span>
                <Input
                  type="number"
                  {...register("precioVentaUsd", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-[#676A6C]"
                />
              </div>
              {errors.precioVentaUsd && <p className="mt-1 text-xs text-red-500">{errors.precioVentaUsd.message}</p>}
            </label>

            {/* Utilidad */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">Utilidad*:</span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("utilidad", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C]"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">%</span>
              </div>
              {errors.utilidad && <p className="mt-1 text-xs text-red-500">{errors.utilidad.message}</p>}
            </label>

            {/* ¿En duda con su porcentaje de utilidad? */}
            <UtilityCalculator
              variant="servicio"
              precioBase={precioVentaPen}
              utilidad={utilidad}
              onChangePrecioBase={(val) => {
                setValue("precioVentaPen", val, { shouldValidate: true, shouldDirty: true })
                setValue("precioVentaUsd", Number((val / 3.75).toFixed(2)), { shouldValidate: true, shouldDirty: true })
              }}
            />

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
                {...register("afectacion")}
                selectClassName={inputClass}
              >
                {AFECTACION_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.afectacion && <p className="mt-1 text-xs text-red-500">{errors.afectacion.message}</p>}
            </label>

            {/* Imagen del Servicio */}
            <div className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Imagen del Servicio:</span>
              <input
                type="file"
                id="image-file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-file"
                onClick={handleImageClick}
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
                        setValue("imagenUrl", null, { shouldValidate: true })
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
              {errors.imagenUrl && <p className="mt-1 text-xs text-red-500">{errors.imagenUrl.message}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
          <ActionButton
            onClick={onSubmit}
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
