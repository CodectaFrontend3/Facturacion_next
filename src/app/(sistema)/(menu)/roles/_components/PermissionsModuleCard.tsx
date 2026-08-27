"use client";

import { ChevronDown, ChevronUp, Info } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import type {
  PermissionAction,
  PermissionModule,
  PermissionSection,
} from "../types/role-permissions";

interface PermissionsModuleCardProps {
  module: PermissionModule;
  selectedActions: Record<string, boolean>;
  expandedSections: Record<string, boolean>;
  onToggleAction: (id: string) => void;
  onToggleSection: (sectionId: string, checked: boolean) => void;
  onToggleModule: (moduleId: string, checked: boolean) => void;
  onToggleSectionAccordion: (sectionId: string) => void;
  isSectionFullySelected: (sectionId: string) => boolean;
  isSectionPartiallySelected: (sectionId: string) => boolean;
  isModuleFullySelected: boolean;
  isModulePartiallySelected: boolean;
}

export function PermissionsModuleCard({
  module,
  selectedActions,
  expandedSections,
  onToggleAction,
  onToggleSection,
  onToggleModule,
  onToggleSectionAccordion,
  isSectionFullySelected,
  isSectionPartiallySelected,
  isModuleFullySelected,
  isModulePartiallySelected,
}: PermissionsModuleCardProps) {
  return (
    <div className="flex flex-col rounded border border-gray-200 bg-white shadow-xs">
      {/* Module Header with Master Checkbox */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f9fafb] px-3.5 py-2.5">
        <Checkbox
          id={`module-${module.id}`}
          checked={
            isModuleFullySelected
              ? true
              : isModulePartiallySelected
                ? "indeterminate"
                : false
          }
          onCheckedChange={(checked) =>
            onToggleModule(module.id, Boolean(checked))
          }
          className="size-4 rounded-[2px] border-gray-300"
        />
        <label
          htmlFor={`module-${module.id}`}
          className="cursor-pointer text-[13px] font-bold text-[#4b4d50]"
        >
          {module.title}
        </label>
      </div>

      {/* Sections Grid inside Module */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 p-3.5 sm:grid-cols-2">
        {module.sections.map((section: PermissionSection) => {
          const isSectionChecked = isSectionFullySelected(section.id);
          const isSectionPartial = isSectionPartiallySelected(section.id);
          const isExpanded = Boolean(expandedSections[section.id]);

          return (
            <div
              key={section.id}
              className="flex flex-col border-b border-gray-100 pb-2.5 last:border-b-0 sm:border-b-0"
            >
              {/* Section Header Row */}
              <div className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Checkbox
                    id={`sec-${section.id}`}
                    checked={
                      isSectionChecked
                        ? true
                        : isSectionPartial
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={(checked) =>
                      onToggleSection(section.id, Boolean(checked))
                    }
                    className="size-4 rounded-[2px] border-gray-300 shrink-0"
                  />
                  <label
                    htmlFor={`sec-${section.id}`}
                    className="cursor-pointer truncate text-[12px] font-semibold text-[#4b4d50]"
                  >
                    {section.label}
                  </label>
                </div>

                {/* Accordion Toggle Square Button */}
                <button
                  type="button"
                  onClick={() => onToggleSectionAccordion(section.id)}
                  className="flex size-5 shrink-0 items-center justify-center rounded-[2px] border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  title={isExpanded ? "Ocultar acciones" : "Ver acciones"}
                >
                  {isExpanded ? (
                    <ChevronUp className="size-3.5 stroke-[2.5]" />
                  ) : (
                    <ChevronDown className="size-3.5 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Sub-actions Accordion Panel */}
              {isExpanded && (
                <div className="mt-1 flex flex-col gap-1.5 pl-6 pt-1 border-l-2 border-gray-100 ml-2">
                  {section.actions.map((act: PermissionAction) => {
                    const isActChecked = Boolean(selectedActions[act.id]);

                    return (
                      <div
                        key={act.id}
                        className="group/act relative flex items-center justify-between gap-2 pr-1"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Checkbox
                            id={`act-${act.id}`}
                            checked={isActChecked}
                            onCheckedChange={() => onToggleAction(act.id)}
                            className="size-3.5 rounded-[2px] border-gray-300"
                          />
                          <label
                            htmlFor={`act-${act.id}`}
                            className="cursor-pointer text-[11px] text-[#676a6c] hover:text-[#2c3e50]"
                          >
                            {act.label}
                          </label>
                        </div>

                        {/* Info Tooltip Icon */}
                        {act.description && (
                          <div className="relative flex items-center">
                            <Info className="size-3 cursor-pointer text-[#1ab394] hover:text-[#18a689]" />
                            {/* Hover Tooltip Box */}
                            <div className="pointer-events-none absolute right-0 top-5 z-50 hidden whitespace-nowrap rounded bg-[#374151] px-2.5 py-1 text-[10px] font-medium text-white shadow-lg group-hover/act:block">
                              {act.description}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
