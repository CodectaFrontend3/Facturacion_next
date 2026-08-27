"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Checkbox } from "@/components/ui/checkbox";
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

import { DEFAULT_AVATAR } from "../data/usuarios";
import type { UsuarioManager } from "../hooks/useUsuarioManager";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../schemas/change-password.schema";

interface ChangePasswordModalProps {
  manager: UsuarioManager;
}

export function ChangePasswordModal({ manager }: ChangePasswordModalProps) {
  const {
    isPasswordModalOpen,
    passwordUsuario,
    closePasswordModal,
    changePassword,
  } = manager;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      sendEmail: false,
    },
    mode: "onTouched",
  });

  const sendEmail = watch("sendEmail");

  const onSubmit = handleSubmit((data: ChangePasswordFormValues) => {
    if (passwordUsuario) {
      changePassword(passwordUsuario.id, data);
      reset({ password: "", confirmPassword: "", sendEmail: false });
    }
  });

  const handleClose = () => {
    closePasswordModal();
    reset({ password: "", confirmPassword: "", sendEmail: false });
  };

  return (
    <Dialog
      open={isPasswordModalOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] w-[90vw] sm:max-w-[480px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[15px] font-bold text-[#676a6c]">
            Cambiar de Contraseña
          </DialogTitle>
          <DialogDescription className="sr-only">
            Actualizar la contraseña de acceso del usuario.
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
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6" noValidate>
          {/* Avatar & User Info */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 flex size-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              <img
                src={passwordUsuario?.avatarUrl || DEFAULT_AVATAR}
                alt={passwordUsuario?.nombresApellidos || "Usuario"}
                className="size-full object-cover"
              />
            </div>
            <h3 className="text-[20px] font-light text-[#4b4d50]">
              {passwordUsuario?.nombresApellidos}
            </h3>
            <span className="text-[14px] font-bold text-[#676a6c]">
              {passwordUsuario?.rol}
            </span>
          </div>

          {/* Nueva Contraseña */}
          <div className="flex flex-col gap-1.5 pt-2">
            <div className="flex items-center gap-3">
              <FieldLabel className="w-32 shrink-0 text-[13px] font-medium text-[#676a6c]">
                Nueva Contraseña:
              </FieldLabel>
              <div className="relative flex-1">
                <Field data-invalid={!!errors.password}>
                  <div className="flex items-center overflow-hidden border border-gray-300 bg-white">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
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
                  {errors.password?.message && (
                    <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                      {errors.password.message}
                    </FieldError>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <FieldLabel className="w-32 shrink-0 text-[13px] font-medium text-[#676a6c]">
                Confirmar Contraseña:
              </FieldLabel>
              <div className="relative flex-1">
                <Field data-invalid={!!errors.confirmPassword}>
                  <div className="flex items-center overflow-hidden border border-gray-300 bg-white">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
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
                  {errors.confirmPassword?.message && (
                    <FieldError className="mt-1 text-[11px] text-[#ed5565]">
                      {errors.confirmPassword.message}
                    </FieldError>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Checkbox: Enviar al correo */}
          <div className="mt-2 flex items-center gap-2.5 pl-32">
            <Checkbox
              id="send-email-check"
              checked={sendEmail}
              onCheckedChange={(checked) =>
                setValue("sendEmail", Boolean(checked))
              }
              className="size-4 rounded-[2px] border-gray-300"
            />
            <label
              htmlFor="send-email-check"
              className="cursor-pointer text-[12px] text-[#676a6c]"
            >
              ¿Enviar al correo del Usuario la nueva contraseña?
            </label>
          </div>

          {/* Submit button */}
          <div className="mt-3 pt-2">
            <ActionButton
              type="submit"
              text="Cambiar Contraseña"
              className="h-10 w-full rounded-[2px] bg-[#1d5fbf] text-[13px] font-bold text-white hover:bg-[#154a96]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
