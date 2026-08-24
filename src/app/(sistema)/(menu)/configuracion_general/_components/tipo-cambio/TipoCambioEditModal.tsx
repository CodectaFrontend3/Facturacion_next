"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { TipoCambioManager } from "../../hooks/useTipoCambioManager";
import {
  tipoCambioSchema,
  type TipoCambioFormValues,
} from "../../schemas/tipo-cambio.schema";

interface TipoCambioEditModalProps {
  manager: TipoCambioManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function TipoCambioEditModal({ manager }: TipoCambioEditModalProps) {
  const editing = manager.editingRecord;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TipoCambioFormValues>({
    resolver: zodResolver(tipoCambioSchema),
    defaultValues: {
      compra: editing?.compra ?? 3.35,
      venta: editing?.venta ?? 3.37,
      paralelo: editing?.paralelo ?? 3.31,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (editing) {
      reset({
        compra: editing.compra,
        venta: editing.venta,
        paralelo: editing.paralelo,
      });
    }
  }, [editing, reset]);

  const onSubmit = handleSubmit((data: TipoCambioFormValues) => {
    if (editing) {
      manager.saveRecord(editing.id, data);
    }
  });

  return (
    <Dialog
      open={Boolean(editing)}
      onOpenChange={(open) => {
        if (!open) manager.clearEdit();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] w-[90vw] max-w-[420px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans"
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
          <DialogTitle className="text-[15px] font-bold text-[#676a6c]">
            Editar Tipo de Cambio ({editing?.fecha})
          </DialogTitle>
          <DialogDescription className="sr-only">
            Actualiza los valores de compra, venta y paralelo.
          </DialogDescription>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Cerrar"
              className="flex size-7 cursor-pointer items-center justify-center text-[#7b7d80] hover:text-[#3f4246]"
            >
              <X className="size-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-5" noValidate>
          <Field data-invalid={!!errors.compra}>
            <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
              Compra:
            </FieldLabel>
            <Input
              type="number"
              step="0.01"
              {...register("compra", { valueAsNumber: true })}
              className={inputClassName}
            />
            {errors.compra?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.compra.message}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.venta}>
            <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
              Venta:
            </FieldLabel>
            <Input
              type="number"
              step="0.01"
              {...register("venta", { valueAsNumber: true })}
              className={inputClassName}
            />
            {errors.venta?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.venta.message}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.paralelo}>
            <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
              Paralelo:
            </FieldLabel>
            <Input
              type="number"
              step="0.01"
              {...register("paralelo", { valueAsNumber: true })}
              className={inputClassName}
            />
            {errors.paralelo?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.paralelo.message}
              </FieldError>
            )}
          </Field>

          <div className="mt-2 flex items-center justify-end gap-2">
            <ActionButton
              type="submit"
              text="Guardar"
              className="h-9 px-4 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
            />
            <ActionButton
              type="button"
              text="Cancelar"
              onClick={manager.clearEdit}
              className="h-9 px-4 rounded-[2px] bg-[#ed5565] text-[13px] text-white hover:bg-[#d94656]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
