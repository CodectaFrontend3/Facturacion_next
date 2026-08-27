"use client";

import { useState } from "react";

import { initialUsuarios } from "@/app/(sistema)/(menu)/usuario/data/usuarios";
import type { Usuario } from "@/app/(sistema)/(menu)/usuario/types/usuario";

export function useUsuarioDetailManager(userId: string) {
  const initial =
    initialUsuarios.find((u: Usuario) => u.id === userId) || initialUsuarios[0];

  const [usuario, setUsuario] = useState<Usuario>(initial);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [isLaborInfoOpen, setIsLaborInfoOpen] = useState(true);
  const [isMainInfoOpen, setIsMainInfoOpen] = useState(true);

  const updateUsuarioField = <K extends keyof Usuario>(
    field: K,
    value: Usuario[K],
  ) => {
    setUsuario((prev: Usuario) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = () => {
    // Save logic
  };

  return {
    usuario,
    isMainInfoOpen,
    isPersonalInfoOpen,
    isLaborInfoOpen,
    toggleMainInfo: () => setIsMainInfoOpen((v) => !v),
    togglePersonalInfo: () => setIsPersonalInfoOpen((v) => !v),
    toggleLaborInfo: () => setIsLaborInfoOpen((v) => !v),
    updateUsuarioField,
    saveChanges,
  };
}

export type UsuarioDetailManager = ReturnType<typeof useUsuarioDetailManager>;
