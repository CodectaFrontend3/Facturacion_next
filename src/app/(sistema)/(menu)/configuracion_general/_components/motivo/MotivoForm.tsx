"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { motivoTipoOptions } from "../../data/motivos";
import type { MotivoManager } from "../../hooks/useMotivoManager";
import {
  motivoSchema,
  type MotivoFormValues,
} from "../../schemas/motivo.schema";

interface MotivoFormProps {
  manager: MotivoManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

const selectClassName =
  "h-9 w-full rounded-none border border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none outline-none focus:border-[#18a689] focus:ring-0";

export function MotivoForm({ manager }: MotivoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MotivoFormValues>({
    resolver: zodResolver(motivoSchema),
    defaultValues: manager.editingMotivo
      ? {
          nombre: manager.editingMotivo.nombre,
          tipo: manager.editingMotivo.tipo,
        }
      : {
          nombre: "",
          tipo: "Compras",
        },
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.editingMotivo) {
      reset({
        nombre: manager.editingMotivo.nombre,
        tipo: manager.editingMotivo.tipo,
      });
    } else {
      reset({
        nombre: "",
        tipo: "Compras",
      });
    }
  }, [manager.editingMotivo, reset]);

  const clearForm = () => {
    manager.clearForm();
    reset({
      nombre: "",
      tipo: "Compras",
    });
  };

  const onSubmit = handleSubmit((data: MotivoFormValues) => {
    manager.saveMotivo(data);
    clearForm();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        {/* Nombre Input */}
        <div className="flex-1">
          <Field data-invalid={!!errors.nombre}>
            <Input
              id="motivo-nombre"
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
        </div>

        {/* Tipo Select */}
        <div className="w-full sm:w-[260px]">
          <Field data-invalid={!!errors.tipo}>
            <select
              id="motivo-tipo"
              {...register("tipo")}
              className={selectClassName}
            >
              {motivoTipoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tipo?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.tipo.message}
              </FieldError>
            )}
          </Field>
        </div>

        {/* Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:ml-2">
          <ActionButton
            type="submit"
            text={manager.editingMotivo ? "Actualizar" : "Guardar"}
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
