"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { initialRoles } from "@/app/(sistema)/(menu)/usuario/data/roles";
import { PERMISSION_MODULES } from "../data/permissions-modules";

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

  // Initialize actions (all true for Administrador, or defaults)
  const [selectedActions, setSelectedActions] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    const defaultVal =
      existingRole?.nombre === "Administrador" || !existingRole;

    PERMISSION_MODULES.forEach((mod) => {
      mod.sections.forEach((sec) => {
        sec.actions.forEach((act) => {
          initial[act.id] = defaultVal;
        });
      });
    });
    return initial;
  });

  // Track expanded sections in accordion
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    cotizacion_m: true, // Expand Cotizacion_M by default for demonstration as in screenshot
  });

  const toggleSectionAccordion = useCallback((sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  const toggleAction = useCallback((actionId: string) => {
    setSelectedActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  }, []);

  const toggleSection = useCallback((sectionId: string, checked: boolean) => {
    let targetSection = undefined;
    for (const mod of PERMISSION_MODULES) {
      const found = mod.sections.find((s) => s.id === sectionId);
      if (found) {
        targetSection = found;
        break;
      }
    }

    if (!targetSection) return;

    setSelectedActions((prev) => {
      const next = { ...prev };
      targetSection.actions.forEach((act) => {
        next[act.id] = checked;
      });
      return next;
    });
  }, []);

  const toggleModule = useCallback((moduleId: string, checked: boolean) => {
    const targetModule = PERMISSION_MODULES.find((m) => m.id === moduleId);
    if (!targetModule) return;

    setSelectedActions((prev) => {
      const next = { ...prev };
      targetModule.sections.forEach((sec) => {
        sec.actions.forEach((act) => {
          next[act.id] = checked;
        });
      });
      return next;
    });
  }, []);

  const isSectionFullySelected = useCallback(
    (sectionId: string) => {
      let targetSection = undefined;
      for (const mod of PERMISSION_MODULES) {
        const found = mod.sections.find((s) => s.id === sectionId);
        if (found) {
          targetSection = found;
          break;
        }
      }
      if (!targetSection || targetSection.actions.length === 0) return false;
      return targetSection.actions.every((act) => selectedActions[act.id]);
    },
    [selectedActions],
  );

  const isSectionPartiallySelected = useCallback(
    (sectionId: string) => {
      let targetSection = undefined;
      for (const mod of PERMISSION_MODULES) {
        const found = mod.sections.find((s) => s.id === sectionId);
        if (found) {
          targetSection = found;
          break;
        }
      }
      if (!targetSection || targetSection.actions.length === 0) return false;
      const some = targetSection.actions.some((act) => selectedActions[act.id]);
      const every = targetSection.actions.every(
        (act) => selectedActions[act.id],
      );
      return some && !every;
    },
    [selectedActions],
  );

  const isModuleFullySelected = useCallback(
    (moduleId: string) => {
      const targetModule = PERMISSION_MODULES.find((m) => m.id === moduleId);
      if (!targetModule) return false;
      return targetModule.sections.every((sec) =>
        sec.actions.every((act) => selectedActions[act.id]),
      );
    },
    [selectedActions],
  );

  const isModulePartiallySelected = useCallback(
    (moduleId: string) => {
      const targetModule = PERMISSION_MODULES.find((m) => m.id === moduleId);
      if (!targetModule) return false;
      const allActions = targetModule.sections.flatMap((s) => s.actions);
      if (allActions.length === 0) return false;
      const some = allActions.some((act) => selectedActions[act.id]);
      const every = allActions.every((act) => selectedActions[act.id]);
      return some && !every;
    },
    [selectedActions],
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
    selectedActions,
    expandedSections,
    setNombre,
    setDescripcion,
    toggleMainCard: () => setIsMainCardOpen((v) => !v),
    toggleAction,
    toggleSection,
    toggleModule,
    toggleSectionAccordion,
    isSectionFullySelected,
    isSectionPartiallySelected,
    isModuleFullySelected,
    isModulePartiallySelected,
    saveRole,
  };
}

export type RolePermissionsManager = ReturnType<
  typeof useRolePermissionsManager
>;
