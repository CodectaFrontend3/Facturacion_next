"use client";

import { PERMISSION_MODULES } from "../data/permissions-modules";
import type { RolePermissionsManager } from "../hooks/useRolePermissionsManager";
import type { PermissionModule } from "../types/role-permissions";
import { PermissionsModuleCard } from "./PermissionsModuleCard";

interface RolePermissionsGridProps {
  manager: RolePermissionsManager;
}

export function RolePermissionsGrid({ manager }: RolePermissionsGridProps) {
  const {
    selectedActions,
    expandedSections,
    toggleAction,
    toggleSection,
    toggleModule,
    toggleSectionAccordion,
    isSectionFullySelected,
    isSectionPartiallySelected,
    isModuleFullySelected,
    isModulePartiallySelected,
  } = manager;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 items-start">
      {PERMISSION_MODULES.map((module: PermissionModule) => (
        <PermissionsModuleCard
          key={module.id}
          module={module}
          selectedActions={selectedActions}
          expandedSections={expandedSections}
          onToggleAction={toggleAction}
          onToggleSection={toggleSection}
          onToggleModule={toggleModule}
          onToggleSectionAccordion={toggleSectionAccordion}
          isSectionFullySelected={isSectionFullySelected}
          isSectionPartiallySelected={isSectionPartiallySelected}
          isModuleFullySelected={isModuleFullySelected(module.id)}
          isModulePartiallySelected={isModulePartiallySelected(module.id)}
        />
      ))}
    </div>
  );
}
