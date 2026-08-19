"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { GarantiaManager } from "../../hooks/useGarantiaManager";
import {
  garantiaSchema,
  type GarantiaFormValues,
} from "../../schemas/garantia.schema";

interface GarantiaFormProps {
  manager: GarantiaManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function GarantiaForm({ manager }: GarantiaFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GarantiaFormValues>({
    resolver: zodResolver(garantiaSchema),
    defaultValues: { descripcion: "" },
    mode: "onTouched",
  });

  // Reset/load form values when editing changes
  useEffect(() => {
    if (manager.editingGarantia) {
      reset({ descripcion: manager.editingGarantia.descripcion });
    } else {
      reset({ descripcion: "" });
    }
  }, [manager.editingGarantia, reset]);

  const onSubmit = handleSubmit((data) => {
    manager.saveGarantia(data);
    reset({ descripcion: "" });
  });

  const handleCancel = () => {
    manager.clearForm();
    reset({ descripcion: "" });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        {/* Input Descripción */}
        <div className="flex-1">
          <Field data-invalid={!!errors.descripcion}>
            <Input
              id="garantia-descripcion"
              placeholder="Descripción"
              {...register("descripcion")}
              className={inputClassName}
            />
            {errors.descripcion?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.descripcion.message}
              </FieldError>
            )}
          </Field>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Save Button */}
          <ActionButton
            type="submit"
            text={manager.editingGarantia ? "Guardar" : "Guardar"}
            icon={<Plus className="size-4 stroke-[3]" />}
            className="h-9 px-4 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
          />

          {/* Cancel Button */}
          <ActionButton
            type="button"
            text="Cancelar"
            onClick={handleCancel}
            icon={<X className="size-4 stroke-[3]" />}
            className="h-9 px-4 rounded-[2px] bg-[#ed5565] text-[13px] text-white hover:bg-[#d94656]"
          />
        </div>
      </div>
    </form>
  );
}
