"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { initialRoles } from "@/app/(sistema)/(menu)/usuario/data/roles";
import { PERMISSION_MODULES } from "../data/permissions-modules";
import type { RoleFormValues } from "../types/role-permissions";

export function useRolePermissionsManager(roleId?: string) {
  const router = useRouter();

  const existingRole = roleId
    ? initialRoles.find((r) => r.id === roleId)
    : undefined;

  const [nombre, setNombre] = useState(existingRole?.nombre || "");
  const [descripcion, setDescripcion] = useState(
    existingRole?.descripcion || "",
  );
  const [isMainCardOpen, setIsMainCardOpen] = useState(true);

  // Initialize permissions (default all true for Admin or customize)
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    const defaultVal = existingRole?.nombre === "Administrador";

    PERMISSION_MODULES.forEach((mod) => {
      mod.permissions.forEach((perm) => {
        initial[perm.id] = defaultVal;
      });
    });
    return initial;
  });

  const togglePermission = useCallback((id: string) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const toggleModulePermissions = useCallback(
    (moduleId: string, checked: boolean) => {
      const moduleItem = PERMISSION_MODULES.find((m) => m.id === moduleId);
      if (!moduleItem) return;

      setSelectedPermissions((prev) => {
        const next = { ...prev };
        moduleItem.permissions.forEach((perm) => {
          next[perm.id] = checked;
        });
        return next;
      });
    },
    [],
  );

  const isModuleFullySelected = useCallback(
    (moduleId: string) => {
      const moduleItem = PERMISSION_MODULES.find((m) => m.id === moduleId);
      if (!moduleItem) return false;
      return moduleItem.permissions.every((p) => selectedPermissions[p.id]);
    },
    [selectedPermissions],
  );

  const isModulePartiallySelected = useCallback(
    (moduleId: string) => {
      const moduleItem = PERMISSION_MODULES.find((m) => m.id === moduleId);
      if (!moduleItem) return false;
      const some = moduleItem.permissions.some(
        (p) => selectedPermissions[p.id],
      );
      const every = moduleItem.permissions.every(
        (p) => selectedPermissions[p.id],
      );
      return some && !every;
    },
    [selectedPermissions],
  );

  const saveRole = useCallback(() => {
    // Save logic
    router.push("/roles");
  }, [router]);

  return {
    isEdit: Boolean(roleId),
    nombre,
    descripcion,
    isMainCardOpen,
    selectedPermissions,
    setNombre,
    setDescripcion,
    toggleMainCard: () => setIsMainCardOpen((v) => !v),
    togglePermission,
    toggleModulePermissions,
    isModuleFullySelected,
    isModulePartiallySelected,
    saveRole,
  };
}

export type RolePermissionsManager = ReturnType<
  typeof useRolePermissionsManager
>;
