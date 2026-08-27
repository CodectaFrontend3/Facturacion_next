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

import type { RolManager } from "../hooks/useRolManager";
import { rolSchema, type RolFormValues } from "../schemas/rol.schema";

interface RolModalProps {
  manager: RolManager;
}

const inputClassName =
  "h-9 rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function RolModal({ manager }: RolModalProps) {
  const { isModalOpen, editingRol, viewingRol, closeModal, saveRol } = manager;

  const isViewOnly = Boolean(viewingRol);
  const activeRecord = editingRol || viewingRol;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RolFormValues>({
    resolver: zodResolver(rolSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (activeRecord) {
      reset({
        nombre: activeRecord.nombre,
        descripcion: activeRecord.descripcion,
      });
    } else {
      reset({
        nombre: "",
        descripcion: "",
      });
    }
  }, [activeRecord, reset]);

  const onSubmit = handleSubmit((data: RolFormValues) => {
    saveRol(data);
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] w-[90vw] max-w-[480px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            {isViewOnly
              ? "Detalle del Rol"
              : editingRol
                ? "Editar Rol"
                : "Nuevo Rol"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Gestión de roles y permisos en el sistema.
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
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-5 sm:p-6" noValidate>
          <Field data-invalid={!!errors.nombre}>
            <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
              Nombre del Rol
            </FieldLabel>
            <Input
              id="rol-nombre"
              disabled={isViewOnly}
              {...register("nombre")}
              className={inputClassName}
            />
            {errors.nombre?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.nombre.message}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.descripcion}>
            <FieldLabel className="text-[12px] font-bold text-[#676a6c]">
              Descripción
            </FieldLabel>
            <Input
              id="rol-descripcion"
              disabled={isViewOnly}
              {...register("descripcion")}
              className={inputClassName}
            />
            {errors.descripcion?.message && (
              <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                {errors.descripcion.message}
              </FieldError>
            )}
          </Field>

          {/* Footer actions */}
          <div className="mt-3 flex items-center justify-end gap-2 border-t border-gray-200 pt-4">
            <ActionButton
              type="button"
              text={isViewOnly ? "Cerrar" : "Cancelar"}
              onClick={closeModal}
              className="h-9 px-5 rounded-[2px] bg-[#ed5565] text-[13px] text-white hover:bg-[#d94656]"
            />
            {!isViewOnly && (
              <ActionButton
                type="submit"
                text={editingRol ? "Actualizar" : "Guardar"}
                className="h-9 px-5 rounded-[2px] bg-[#1d5fbf] text-[13px] text-white hover:bg-[#154a96]"
              />
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
