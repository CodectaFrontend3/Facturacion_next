"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { UnitMeasureManager } from "../../hooks/useUnitMeasureManager";
import {
  unitMeasureSchema,
  type UnitMeasureFormValues,
} from "../../schemas/unit-measure.schema";

const inputClassName =
  "h-10 rounded-none border-gray-300 bg-white px-3 text-[14px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function UnitMeasureForm({ manager }: { manager: UnitMeasureManager }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitMeasureFormValues>({
    resolver: zodResolver(unitMeasureSchema),
    defaultValues: manager.editingUnit
      ? {
          medida: manager.editingUnit.medida,
          simbolo: manager.editingUnit.simbolo,
          unidad: manager.editingUnit.unidad,
        }
      : { medida: "", simbolo: "", unidad: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.editingUnit) {
      reset({
        medida: manager.editingUnit.medida,
        simbolo: manager.editingUnit.simbolo,
        unidad: manager.editingUnit.unidad,
      });
    } else {
      reset({ medida: "", simbolo: "", unidad: "" });
    }
  }, [manager.editingUnit, reset]);

  const onSubmit = handleSubmit((data) => {
    manager.saveUnit(data);
    reset({ medida: "", simbolo: "", unidad: "" });
  });

  const clearForm = () => {
    manager.clearForm();
    reset({ medida: "", simbolo: "", unidad: "" });
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
        <Field data-invalid={!!errors.medida}>
          <Input
            id="unit-medida"
            {...register("medida")}
            placeholder="Nombre U.Medida:"
            className={inputClassName}
          />
          {errors.medida?.message && (
            <FieldError className="mt-1 text-[11px] text-[#ed5565]">
              {errors.medida.message}
            </FieldError>
          )}
        </Field>
        <div className="flex h-10 items-start gap-1">
          <ActionButton
            type="submit"
            text={manager.editingUnit ? "Actualizar" : "Guardar"}
            icon={<Plus className="size-4 stroke-[3]" />}
            className="h-9 rounded-[2px] bg-[#160cf3] px-5 text-[13px] text-white hover:bg-[#1009c5]"
          />
          <ActionButton
            type="button"
            text="Cancelar"
            icon={<X className="size-3.5" />}
            onClick={clearForm}
            className="h-9 rounded-[2px] bg-[#ed5565] px-5 text-[13px] text-white hover:bg-[#d94656]"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.simbolo}>
          <Input
            {...register("simbolo")}
            placeholder="Símbolo: BOL"
            className={inputClassName}
          />
          {errors.simbolo?.message && (
            <FieldError className="mt-1 text-[11px] text-[#ed5565]">
              {errors.simbolo.message}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.unidad}>
          <Input
            {...register("unidad")}
            placeholder="Unidad: 12"
            inputMode="decimal"
            className={inputClassName}
          />
          {errors.unidad?.message && (
            <FieldError className="mt-1 text-[11px] text-[#ed5565]">
              {errors.unidad.message}
            </FieldError>
          )}
        </Field>
      </div>
    </form>
  );
}
