"use client";

import { Checkbox } from "@/components/ui/checkbox";

import type { PermissionModule } from "../types/role-permissions";

interface PermissionsModuleCardProps {
  module: PermissionModule;
  selectedPermissions: Record<string, boolean>;
  onTogglePermission: (id: string) => void;
  onToggleModule: (moduleId: string, checked: boolean) => void;
  isModuleFullySelected: boolean;
  isModulePartiallySelected: boolean;
}

export function PermissionsModuleCard({
  module,
  selectedPermissions,
  onTogglePermission,
  onToggleModule,
  isModuleFullySelected,
  isModulePartiallySelected,
}: PermissionsModuleCardProps) {
  const isChecked = isModuleFullySelected;
  const isIndeterminate = isModulePartiallySelected;

  return (
    <div className="flex flex-col rounded border border-gray-200 bg-white shadow-xs">
      {/* Module Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f9fafb] px-3.5 py-2">
        <Checkbox
          id={`module-${module.id}`}
          checked={isChecked ? true : isIndeterminate ? "indeterminate" : false}
          onCheckedChange={(checked) =>
            onToggleModule(module.id, Boolean(checked))
          }
          className="size-4 rounded-[2px] border-gray-300"
        />
        <label
          htmlFor={`module-${module.id}`}
          className="cursor-pointer text-[12px] font-bold text-[#4b4d50]"
        >
          {module.title}
        </label>
      </div>

      {/* Permissions List / Grid */}
      <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
        {module.permissions.map((perm) => {
          const permChecked = Boolean(selectedPermissions[perm.id]);

          return (
            <div
              key={perm.id}
              className="flex items-center justify-between gap-2 px-1 py-1"
            >
              <label
                htmlFor={`perm-${perm.id}`}
                className="cursor-pointer text-[12px] text-[#676a6c]"
              >
                {perm.label}
              </label>

              <Checkbox
                id={`perm-${perm.id}`}
                checked={permChecked}
                onCheckedChange={() => onTogglePermission(perm.id)}
                className="size-4 rounded-[2px] border-gray-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
