"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { ValidezManager } from "../../hooks/useValidezManager";
import {
  validezSchema,
  type ValidezFormValues,
} from "../../schemas/validez.schema";

interface ValidezFormProps {
  manager: ValidezManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function ValidezForm({ manager }: ValidezFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidezFormValues>({
    resolver: zodResolver(validezSchema),
    defaultValues: {
      descripcion: manager.editingValidez?.descripcion ?? "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (manager.editingValidez) {
      reset({ descripcion: manager.editingValidez.descripcion });
    } else {
      reset({ descripcion: "" });
    }
  }, [manager.editingValidez, reset]);

  const clearForm = () => {
    manager.clearForm();
    reset({ descripcion: "" });
  };

  const onSubmit = handleSubmit((data: ValidezFormValues) => {
    manager.saveValidez(data);
    clearForm();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        {/* Input Descripción */}
        <div className="flex-1">
          <Field data-invalid={!!errors.descripcion}>
            <Input
              id="validez-descripcion"
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
        <div className="flex shrink-0 items-center gap-2">
          <ActionButton
            type="submit"
            text={manager.editingValidez ? "Actualizar" : "Guardar"}
            icon={<Plus className="size-4 stroke-[3]" />}
            className="h-9 px-4 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
          />

          <ActionButton
            type="button"
            text="Cancelar"
            onClick={clearForm}
            icon={<X className="size-3.5 stroke-[3]" />}
            className="h-9 px-4 rounded-[2px] bg-[#ed5565] text-[13px] text-white hover:bg-[#d94656]"
          />
        </div>
      </div>
    </form>
  );
}
