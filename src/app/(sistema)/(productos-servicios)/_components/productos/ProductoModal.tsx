"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/shared/TextArea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { ActionButton } from "@/components/common/ActionButton";
import { Switch } from "@/components/ui/switch";
import { Producto } from "../../types/productos.types";
import { useProductoForm } from "../../_hooks/useProductoForm";
import { UtilityCalculator } from "../shared/UtilityCalculator";

interface ProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Producto, "id"> & { id?: string }) => void;
  producto?: Producto | null;
}

const MARCA_OPTIONS = ["EXAMPLE01", "SAMSUNG", "LENOVO", "INDECO"];
const FAMILIA_OPTIONS = ["Seleccionar", "Familia A", "Familia B", "Familia C"];
const SUBFAMILIA_OPTIONS = [
  "Seleccionar",
  "SubFamilia A",
  "SubFamilia B",
  "SubFamilia C",
];
const ORIGEN_OPTIONS = ["Producto Nacional", "Producto Importado"];
const AFECTACION_OPTIONS = [
  "Gravado - Operación Onerosa",
  "Exonerado",
  "Inafecto",
];
const UNIDAD_OPTIONS = ["Bolsa", "Unidad", "Metros", "Caja", "Kilos"];
const PESO_UNIDAD_OPTIONS = ["Miligramos", "Gramos", "Kilos"];

export function ProductoModal({
  isOpen,
  onClose,
  onSave,
  producto,
}: ProductoModalProps) {
  const {
    form,
    onSubmit,
    setValue,
    fileInputRef,
    imageInputRef,
    handleFichaClick,
    handleFichaChange,
    handleImageClick,
    handleImageChange,
  } = useProductoForm({
    isOpen,
    producto,
    onSave,
    onClose,
  });

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  // Watch fields needed for UI conditional rendering or select controls
  const estado = watch("estado");
  const fechaRegistro = watch("fechaRegistro");
  const fichaTecnicaUrl = watch("fichaTecnicaUrl");
  const imagen = watch("imagen");

  if (!isOpen) return null;

  const inputClass =
    "h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans text-[#676A6C] min-w-0";

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
            <i className="fa fa-cube text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">
              {producto ? "Editar Producto" : "Nuevo Producto"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Estado Toggle Switch */}
            <Switch
              checked={estado === "Activo"}
              onCheckedChange={(checked) =>
                setValue("estado", checked ? "Activo" : "Inactivo", {
                  shouldValidate: true,
                })
              }
            />
            <button
              type="button"
              onClick={onClose}
              className="text-[#9ca3af] transition-colors hover:text-[#111827] cursor-pointer"
              title="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="max-h-[55vh] overflow-y-auto p-6 text-[13px] text-[#4b5563] [&_input]:rounded-none! [&_select]:rounded-none!">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Código (ReadOnly) */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Código*:
              </span>
              <Input
                type="text"
                {...register("codigo")}
                disabled
                className="h-9 w-full bg-gray-100 border border-gray-200 px-3 text-[13px] outline-none rounded-none shadow-none font-sans text-gray-500 cursor-not-allowed"
              />
              {errors.codigo && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.codigo.message}
                </p>
              )}
            </label>

            {/* Cod. Orig. */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Cod. Orig.:
              </span>
              <Input
                type="text"
                {...register("codOrig")}
                className={inputClass}
                placeholder="Ingresa el código original"
              />
              {errors.codOrig && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.codOrig.message}
                </p>
              )}
            </label>

            {/* Nombre */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Nombre*:
              </span>
              <Input
                type="text"
                {...register("nombre")}
                className={inputClass}
                placeholder="Nombre del Producto"
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nombre.message}
                </p>
              )}
            </label>

            {/* Descripción */}
            <label className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Descripción:
              </span>
              <Input
                type="text"
                {...register("descripcion")}
                className={inputClass}
                placeholder="Ingresa la descripcion"
              />
              {errors.descripcion && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.descripcion.message}
                </p>
              )}
            </label>

            {/* Marca */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Marca*:
              </span>
              <NativeSelect {...register("marca")} selectClassName={inputClass}>
                {MARCA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.marca && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.marca.message}
                </p>
              )}
            </label>

            {/* Peso */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Peso:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("peso", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <NativeSelect
                  {...register("pesoUnidad")}
                  className="w-[140px] shrink-0 border-l border-gray-300 h-full"
                  selectClassName="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none pr-8 py-1"
                >
                  {PESO_UNIDAD_OPTIONS.map((opt) => (
                    <NativeSelectOption key={opt} value={opt}>
                      {opt}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
              {errors.peso && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.peso.message}
                </p>
              )}
            </label>

            {/* Familia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Familia*:
              </span>
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
              {errors.familia && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.familia.message}
                </p>
              )}
            </label>

            {/* SubFamilia */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                SubFamilia:
              </span>
              <NativeSelect
                {...register("subFamilia")}
                selectClassName={inputClass}
              >
                {SUBFAMILIA_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.subFamilia && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.subFamilia.message}
                </p>
              )}
            </label>

            {/* Stock Mín. */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Stock Mín.:
              </span>
              <Input
                type="number"
                {...register("stockMin", { valueAsNumber: true })}
                className={inputClass}
              />
              {errors.stockMin && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.stockMin.message}
                </p>
              )}
            </label>

            {/* Stock Max. */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Stock Max.:
              </span>
              <Input
                type="number"
                {...register("stockMax", { valueAsNumber: true })}
                className={inputClass}
              />
              {errors.stockMax && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.stockMax.message}
                </p>
              )}
            </label>

            {/* Desc. 1 */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Desc. 1:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("desc1", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">
                  %
                </span>
              </div>
              {errors.desc1 && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.desc1.message}
                </p>
              )}
            </label>

            {/* Desc. 2 */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Desc. 2:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("desc2", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">
                  %
                </span>
              </div>
              {errors.desc2 && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.desc2.message}
                </p>
              )}
            </label>

            {/* Desc. Max. */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Desc. Max.:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("descMax", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C] focus:border-none focus-visible:border-none"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">
                  %
                </span>
              </div>
              {errors.descMax && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.descMax.message}
                </p>
              )}
            </label>

            {/* Origen */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Origen:
              </span>
              <NativeSelect
                {...register("origen")}
                selectClassName={inputClass}
              >
                {ORIGEN_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.origen && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.origen.message}
                </p>
              )}
            </label>

            {/* Utilidad */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Utilidad*:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="number"
                  {...register("utilidad", { valueAsNumber: true })}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full px-3 text-[13px] text-[#676A6C]"
                />
                <span className="px-3 bg-gray-50 border-l border-gray-300 text-gray-500 font-semibold text-[13px] h-full flex items-center justify-center">
                  %
                </span>
              </div>
              {errors.utilidad && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.utilidad.message}
                </p>
              )}
            </label>

            {/* ¿En duda con su porcentaje de utilidad? */}
            <UtilityCalculator
              precioVenta={watch("precioNacional")}
              onChangePrecioVenta={(val) =>
                setValue("precioNacional", val, { shouldValidate: true })
              }
            />

            {/* Garantía */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Garantía:
              </span>
              <Input
                type="text"
                {...register("garantia")}
                className={inputClass}
                placeholder="Garantía"
              />
              {errors.garantia && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.garantia.message}
                </p>
              )}
            </label>

            {/* Afectación */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Afectación:
              </span>
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
              {errors.afectacion && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.afectacion.message}
                </p>
              )}
            </label>

            {/* Ud Medida */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Ud Medida:
              </span>
              <NativeSelect
                {...register("unidad")}
                selectClassName={inputClass}
              >
                {UNIDAD_OPTIONS.map((opt) => (
                  <NativeSelectOption key={opt} value={opt}>
                    {opt}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.unidad && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.unidad.message}
                </p>
              )}
            </label>

            {/* Fecha */}
            <label className="block">
              <span className="mb-1 block font-medium text-gray-700">
                Fecha:
              </span>
              <Input
                type="text"
                value={fechaRegistro || ""}
                disabled
                className="h-9 w-full bg-gray-100 border border-gray-200 px-3 text-[13px] outline-none rounded-none shadow-none font-sans text-gray-500 cursor-not-allowed"
              />
            </label>

            {/* Ficha Técnica */}
            <div className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Ficha Técnica:
              </span>
              <div className="flex border border-gray-300 items-center h-9 focus-within:border-[#18a689]">
                <Input
                  type="text"
                  value={
                    fichaTecnicaUrl
                      ? fichaTecnicaUrl.split("/").pop()
                      : "Selecciona"
                  }
                  readOnly
                  onClick={handleFichaClick}
                  className="h-full border-none focus-visible:ring-0 shadow-none rounded-none w-full bg-white px-3 text-[13px] text-gray-400 cursor-pointer focus:border-none focus-visible:border-none"
                />
                <button
                  type="button"
                  onClick={handleFichaClick}
                  className="h-full px-4 bg-[#EBEFF5] hover:bg-gray-200 text-gray-700 text-[13px] font-medium border-l border-gray-300 transition-all cursor-pointer flex items-center justify-center shrink-0 border-y-0 border-r-0"
                >
                  Sel.
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFichaChange}
                />
              </div>
              {errors.fichaTecnicaUrl && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fichaTecnicaUrl.message}
                </p>
              )}
            </div>

            {/* Imagen del Producto */}
            <div className="block md:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Imagen del Producto:
              </span>
              <input
                type="file"
                id="product-image-file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="product-image-file"
                className="border-2 border-dashed border-gray-300 hover:border-[#18a689] bg-gray-50 hover:bg-gray-100/50 w-full h-32 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-150 p-2"
              >
                {imagen ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={imagen}
                      alt="Vista previa del producto"
                      className="max-h-28 object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setValue("imagen", "", { shouldValidate: true });
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
                    <span className="text-[12px] text-gray-500 font-semibold">
                      Seleccionar imagen o arrastrar archivo aquí
                    </span>
                  </>
                )}
              </label>
              {errors.imagen && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.imagen.message}
                </p>
              )}
            </div>

            {/* Detalle */}
            <div className="block md:col-span-2">
              <Textarea
                label="Detalle:"
                {...register("detalle")}
                placeholder="Detalle del Producto"
                className="min-h-20 text-[13px] rounded-none! border-gray-300!"
                error={errors.detalle?.message}
              />
            </div>
          </div>
        </div>

        {/* Footer (same components/style/order as ServicioModal) */}
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
  );
}
