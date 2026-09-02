"use client";

import { useMemo } from "react";
import { User, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { initialUsuarios } from "../data/usuarios";
import type { RolManager } from "../hooks/useRolManager";

interface RoleUsersModalProps {
  manager: RolManager;
}

export function RoleUsersModal({ manager }: RoleUsersModalProps) {
  const { isModalOpen, viewingRol, closeModal } = manager;

  const usersInRole = useMemo(() => {
    if (!viewingRol) return [];
    return initialUsuarios.filter((u) => u.rol === viewingRol.nombre);
  }, [viewingRol]);

  const isOpen = isModalOpen && Boolean(viewingRol);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] w-[95vw] sm:max-w-[860px] md:max-w-[920px] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans shadow-2xl"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-[16px] font-bold text-[#4b4d50]">
            Usuarios pertenecientes al Rol:{" "}
            <span className="font-extrabold text-[#2c3e50]">
              {viewingRol?.nombre}
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Lista de usuarios que tienen asignado este rol en el sistema.
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

        {/* Users Grid Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 sm:p-8">
          {usersInRole.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-[13px] text-gray-400">
              No hay usuarios asignados a este rol.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {usersInRole.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3.5 rounded-[4px] border border-gray-100 bg-white p-4 shadow-2xs hover:border-gray-200 transition-colors"
                >
                  {/* User Icon Circle */}
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <User className="size-5" />
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-[13px] font-bold text-[#4b4d50]">
                      {user.nombresApellidos}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-gray-200 bg-[#f9fafb] px-6 py-3.5">
          <ActionButton
            type="button"
            text="Cerrar"
            onClick={closeModal}
            className="h-8 rounded-[3px] bg-[#6c757d] px-5 text-[12px] font-medium text-white hover:bg-[#5c636a]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
