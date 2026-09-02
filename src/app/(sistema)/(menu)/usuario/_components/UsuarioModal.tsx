"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";

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
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import {
  almacenOptions,
  DEFAULT_AVATAR,
  initialUsuarios,
  rolFilterOptions,
} from "../data/usuarios";
import type { UsuarioManager } from "../hooks/useUsuarioManager";
import {
  usuarioSchema,
  type UsuarioFormValues,
} from "../schemas/usuario.schema";

interface UsuarioModalProps {
  manager: UsuarioManager;
}

const inputClassName =
  "h-9 rounded-none border border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0 w-full";

export function UsuarioModal({ manager }: UsuarioModalProps) {
  const { isModalOpen, closeModal, saveUsuario } = manager;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UsuarioFormValues & { password?: string; confirmPassword?: string }>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombresApellidos: "",
      dni: "00000000",
      rol: "Administrador",
      correo: "",
      celular: "999999999",
      almacen: "Todos",
    },
    mode: "onTouched",
  });

  const selectedPersonal = watch("nombresApellidos");

  const handlePersonalChange = (nombres: string) => {
    setValue("nombresApellidos", nombres, { shouldValidate: true });
    const found = initialUsuarios.find((u) => u.nombresApellidos === nombres);
    if (found) {
      setValue("dni", found.dni);
      setValue("correo", found.correo);
      setValue("celular", found.celular);
      setValue("almacen", found.almacen);
      setValue("rol", found.rol);
    }
  };

  const onSubmit = handleSubmit((data) => {
    saveUsuario({
      nombresApellidos: data.nombresApellidos,
      dni: data.dni || "00000000",
      rol: data.rol,
      correo: data.correo,
      celular: data.celular || "999999999",
      almacen: data.almacen,
    });
    reset();
  });

  const handleClose = () => {
    closeModal();
    reset();
  };

  const availableRoles = rolFilterOptions.filter(
    (opt) => opt.value !== "todos",
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] w-[95vw] sm:max-w-[780px] md:max-w-[820px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans shadow-2xl"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-[15px] font-bold text-[#676a6c]">
            Registrar Nuevo Usuario
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para registrar un nuevo usuario en el sistema.
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

        {/* Content Body */}
        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 sm:p-8" noValidate>
          {/* Avatar & Header */}
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="mb-3 text-[22px] font-light text-[#4b4d50]">
              Agregar Nuevo Usuario
            </h3>
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50 shadow-xs">
              <img
                src={DEFAULT_AVATAR}
                alt="Nuevo usuario"
                className="size-full object-cover"
              />
            </div>
            <button
              type="button"
              className="mt-2 text-[11px] text-gray-500 hover:text-[#1d5fbf] hover:underline"
            >
              (Click para cambiar la imagen)
            </button>
          </div>

          {/* Form Fields Container */}
          <div className="flex flex-col gap-4">
            {/* Personal Select */}
            <Field data-invalid={!!errors.nombresApellidos}>
              <div className="flex items-center gap-3">
                <FieldLabel className="w-24 sm:w-28 shrink-0 text-[13px] font-bold text-[#676a6c]">
                  Personal:
                </FieldLabel>
                <div className="flex-1">
                  <NativeSelect
                    value={selectedPersonal}
                    onChange={(e) => handlePersonalChange(e.target.value)}
                    selectClassName={inputClassName}
                  >
                    <NativeSelectOption value="">
                      Seleccionar Personal
                    </NativeSelectOption>
                    {initialUsuarios.map((u) => (
                      <NativeSelectOption
                        key={u.id}
                        value={u.nombresApellidos}
                      >
                        {u.nombresApellidos}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
              </div>
              {errors.nombresApellidos?.message && (
                <FieldError className="mt-1 text-[11px] text-[#ed5565] pl-28 sm:pl-32">
                  {errors.nombresApellidos.message}
                </FieldError>
              )}
            </Field>

            {/* Correo */}
            <Field data-invalid={!!errors.correo}>
              <div className="flex items-center gap-3">
                <FieldLabel className="w-24 sm:w-28 shrink-0 text-[13px] font-bold text-[#676a6c]">
                  Correo:
                </FieldLabel>
                <div className="flex-1">
                  <Input
                    id="usuario-correo"
                    type="email"
                    {...register("correo")}
                    className={inputClassName}
                  />
                </div>
              </div>
              {errors.correo?.message && (
                <FieldError className="mt-1 text-[11px] text-[#ed5565] pl-28 sm:pl-32">
                  {errors.correo.message}
                </FieldError>
              )}
            </Field>

            {/* Contraseña & Confirmar Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Contraseña */}
              <div className="flex items-center gap-3">
                <span className="w-24 sm:w-28 shrink-0 text-[13px] font-bold text-[#676a6c]">
                  Contraseña:
                </span>
                <div className="relative flex-1 flex items-center overflow-hidden border border-gray-300 bg-white">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    className="h-9 flex-1 rounded-none border-0 px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex h-9 w-9 items-center justify-center border-l border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar */}
              <div className="flex items-center gap-3">
                <span className="w-24 sm:w-24 shrink-0 text-[13px] font-bold text-[#676a6c]">
                  Confirmar:
                </span>
                <div className="relative flex-1 flex items-center overflow-hidden border border-gray-300 bg-white">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="******"
                    className="h-9 flex-1 rounded-none border-0 px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="flex h-9 w-9 items-center justify-center border-l border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Rol & Asig. Almacen Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Rol */}
              <Field data-invalid={!!errors.rol}>
                <div className="flex items-center gap-3">
                  <span className="w-24 sm:w-28 shrink-0 text-[13px] font-bold text-[#676a6c]">
                    Rol:
                  </span>
                  <div className="flex-1">
                    <NativeSelect
                      {...register("rol")}
                      selectClassName={inputClassName}
                    >
                      <NativeSelectOption value="">
                        Seleccionar Rol del Sistema
                      </NativeSelectOption>
                      {availableRoles.map((opt) => (
                        <NativeSelectOption key={opt.value} value={opt.value}>
                          {opt.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>
              </Field>

              {/* Asig. Almacen */}
              <Field data-invalid={!!errors.almacen}>
                <div className="flex items-center gap-3">
                  <span className="w-24 sm:w-24 shrink-0 text-[13px] font-bold text-[#676a6c]">
                    Asig. Almacen:
                  </span>
                  <div className="flex-1">
                    <NativeSelect
                      {...register("almacen")}
                      selectClassName={inputClassName}
                    >
                      {almacenOptions.map((opt) => (
                        <NativeSelectOption key={opt.value} value={opt.value}>
                          {opt.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>
              </Field>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <ActionButton
              type="submit"
              text="Registrar"
              className="h-10 min-w-[140px] px-8 rounded-[2px] bg-[#1d5fbf] text-[14px] font-semibold text-white hover:bg-[#154a96]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
