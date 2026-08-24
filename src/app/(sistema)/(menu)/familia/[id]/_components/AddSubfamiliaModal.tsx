"use client";

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

import type { FamiliaDetailManager } from "../hooks/useFamiliaDetailManager";
import {
  addSubfamiliaSchema,
  type AddSubfamiliaFormValues,
} from "../schemas/subfamilia.schema";

interface AddSubfamiliaModalProps {
  manager: FamiliaDetailManager;
}

export function AddSubfamiliaModal({ manager }: AddSubfamiliaModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSubfamiliaFormValues>({
    resolver: zodResolver(addSubfamiliaSchema),
    defaultValues: {
      descripcion: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data: AddSubfamiliaFormValues) => {
    manager.addSubfamilia(data.descripcion);
    reset({ descripcion: "" });
  });

  const handleClose = () => {
    manager.closeAddSubfamilia();
    reset({ descripcion: "" });
  };

  return (
    <Dialog
      open={manager.isAddSubfamiliaOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[85vh] w-[90vw] max-w-[500px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            Agregar Subfamilia
          </DialogTitle>
          <DialogDescription className="sr-only">
            Ingresa la descripción para la nueva subfamilia.
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

        {/* Form Body */}
        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6" noValidate>
          <Field data-invalid={!!errors.descripcion}>
            <FieldLabel className="text-[13px] font-bold text-[#676a6c]">
              Descripcion
            </FieldLabel>
            <Input
              id="subfamilia-descripcion"
              {...register("descripcion")}
              placeholder=""
              className="h-10 rounded-[2px] border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0"
            />
            {errors.descripcion?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.descripcion.message}
              </FieldError>
            )}
          </Field>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <ActionButton
              type="button"
              text="Cerrar"
              onClick={handleClose}
              className="h-9 px-5 rounded-[2px] bg-[#6c757d] text-[13px] text-white hover:bg-[#5a6268]"
            />
            <ActionButton
              type="submit"
              text="Guardar"
              className="h-9 px-5 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
