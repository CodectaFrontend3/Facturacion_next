"use client";

import { PERMISSION_MODULES } from "../data/permissions-modules";
import type { RolePermissionsManager } from "../hooks/useRolePermissionsManager";
import { PermissionsModuleCard } from "./PermissionsModuleCard";

interface RolePermissionsGridProps {
  manager: RolePermissionsManager;
}

export function RolePermissionsGrid({ manager }: RolePermissionsGridProps) {
  const {
    selectedPermissions,
    togglePermission,
    toggleModulePermissions,
    isModuleFullySelected,
    isModulePartiallySelected,
  } = manager;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 items-start">
      {PERMISSION_MODULES.map((module) => (
        <PermissionsModuleCard
          key={module.id}
          module={module}
          selectedPermissions={selectedPermissions}
          onTogglePermission={togglePermission}
          onToggleModule={toggleModulePermissions}
          isModuleFullySelected={isModuleFullySelected(module.id)}
          isModulePartiallySelected={isModulePartiallySelected(module.id)}
        />
      ))}
    </div>
  );
}
