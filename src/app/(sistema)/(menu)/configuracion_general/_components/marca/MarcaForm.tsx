"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { MarcaManager } from "../../hooks/useMarcaManager";
import {
  marcaSchema,
  type MarcaFormValues,
} from "../../schemas/marca.schema";

interface MarcaFormProps {
  manager: MarcaManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function MarcaForm({ manager }: MarcaFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFileName, setPhotoFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MarcaFormValues>({
    resolver: zodResolver(marcaSchema),
    defaultValues: manager.editingMarca
      ? {
          nombre: manager.editingMarca.nombre,
          telefono: manager.editingMarca.telefono ?? "",
          empresa: manager.editingMarca.empresa ?? "",
          abreviatura: manager.editingMarca.abreviatura ?? "",
          descripcion: manager.editingMarca.descripcion ?? "",
          foto: manager.editingMarca.foto ?? "",
        }
      : {
          nombre: "",
          telefono: "",
          empresa: "",
          abreviatura: "",
          descripcion: "",
          foto: "",
        },
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.editingMarca) {
      reset({
        nombre: manager.editingMarca.nombre,
        telefono: manager.editingMarca.telefono ?? "",
        empresa: manager.editingMarca.empresa ?? "",
        abreviatura: manager.editingMarca.abreviatura ?? "",
        descripcion: manager.editingMarca.descripcion ?? "",
        foto: manager.editingMarca.foto ?? "",
      });
      setPhotoFileName(manager.editingMarca.foto ? "Foto cargada" : "");
    } else {
      reset({
        nombre: "",
        telefono: "",
        empresa: "",
        abreviatura: "",
        descripcion: "",
        foto: "",
      });
      setPhotoFileName("");
    }
  }, [manager.editingMarca, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("foto", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearForm = () => {
    manager.clearForm();
    reset({
      nombre: "",
      telefono: "",
      empresa: "",
      abreviatura: "",
      descripcion: "",
      foto: "",
    });
    setPhotoFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = handleSubmit((data: MarcaFormValues) => {
    manager.saveMarca(data);
    clearForm();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      {/* Row 1: Nombre | Teléfono */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field data-invalid={!!errors.nombre}>
          <Input
            id="marca-nombre"
            {...register("nombre")}
            placeholder="Nombre"
            className={inputClassName}
          />
          {errors.nombre?.message && (
            <FieldError className="mt-1 text-[11px] text-[#ed5565]">
              {errors.nombre.message}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.telefono}>
          <Input
            id="marca-telefono"
            {...register("telefono")}
            placeholder="Teléfono"
            className={inputClassName}
          />
          {errors.telefono?.message && (
            <FieldError className="mt-1 text-[11px] text-[#ed5565]">
              {errors.telefono.message}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Row 2: Empresa | Abreviatura | Agregar Foto */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <Field data-invalid={!!errors.empresa}>
            <Input
              id="marca-empresa"
              {...register("empresa")}
              placeholder="Empresa"
              className={inputClassName}
            />
            {errors.empresa?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.empresa.message}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="sm:col-span-3">
          <Field data-invalid={!!errors.abreviatura}>
            <Input
              id="marca-abreviatura"
              {...register("abreviatura")}
              placeholder="Abreviatura"
              className={inputClassName}
            />
            {errors.abreviatura?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.abreviatura.message}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="sm:col-span-3">
          <div className="relative flex h-9 items-center overflow-hidden border border-gray-300 bg-white">
            <span className="flex-1 truncate px-3 text-[13px] text-[#676a6c]">
              {photoFileName || "Agregar Foto"}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-full cursor-pointer border-l border-gray-300 bg-[#e7eaec] px-3 text-[12px] font-medium text-[#676a6c] transition-colors hover:bg-gray-200"
            >
              Browse
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* Row 3: Descripción | Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-1">
          <Field data-invalid={!!errors.descripcion}>
            <Input
              id="marca-descripcion"
              {...register("descripcion")}
              placeholder="Descripción"
              className={inputClassName}
            />
            {errors.descripcion?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.descripcion.message}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ActionButton
            type="submit"
            text={manager.editingMarca ? "Actualizar" : "Guardar"}
            icon={<Plus className="size-4 stroke-[3]" />}
            className="h-9 px-4 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
          />
          <ActionButton
            type="button"
            text="Cancelar"
            icon={<X className="size-3.5 stroke-[3]" />}
            onClick={clearForm}
            className="h-9 px-4 rounded-[2px] bg-[#ed5565] text-[13px] text-white hover:bg-[#d94656]"
          />
        </div>
      </div>
    </form>
  );
}
