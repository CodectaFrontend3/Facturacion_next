"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { FamiliaManager } from "../../hooks/useFamiliaManager";
import {
  familiaSchema,
  type FamiliaFormValues,
} from "../../schemas/familia.schema";

interface FamiliaFormProps {
  manager: FamiliaManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function FamiliaForm({ manager }: FamiliaFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FamiliaFormValues>({
    resolver: zodResolver(familiaSchema),
    defaultValues: {
      descripcion: manager.editingFamilia?.descripcion ?? "",
      ubicacion: manager.editingFamilia?.ubicacion ?? "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.editingFamilia) {
      reset({
        descripcion: manager.editingFamilia.descripcion,
        ubicacion: manager.editingFamilia.ubicacion,
      });
    } else {
      reset({
        descripcion: "",
        ubicacion: "",
      });
    }
  }, [manager.editingFamilia, reset]);

  const clearForm = () => {
    manager.clearForm();
    reset({
      descripcion: "",
      ubicacion: "",
    });
  };

  const onSubmit = handleSubmit((data: FamiliaFormValues) => {
    manager.saveFamilia(data);
    clearForm();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      {/* Row 1: Descripción */}
      <Field data-invalid={!!errors.descripcion}>
        <Input
          id="familia-descripcion"
          {...register("descripcion")}
          placeholder="Descripción:"
          className={inputClassName}
        />
        {errors.descripcion?.message && (
          <FieldError className="mt-1 text-[11px] text-[#ed5565]">
            {errors.descripcion.message}
          </FieldError>
        )}
      </Field>

      {/* Row 2: Ubicación | Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-1">
          <Field data-invalid={!!errors.ubicacion}>
            <Input
              id="familia-ubicacion"
              {...register("ubicacion")}
              placeholder="Ubicación:"
              className={inputClassName}
            />
            {errors.ubicacion?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.ubicacion.message}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ActionButton
            type="submit"
            text={manager.editingFamilia ? "Actualizar" : "Guardar"}
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
