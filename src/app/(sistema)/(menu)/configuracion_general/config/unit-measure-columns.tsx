import type { ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { UnitMeasure } from "../types/unit-measure";

interface UnitMeasureColumnActions {
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function getUnitMeasureColumns({
  onEdit,
  onToggleStatus,
}: UnitMeasureColumnActions): ColumnDef<UnitMeasure>[] {
  return [
    {
      accessorKey: "simbolo",
      header: "Símbolo",
      size: 220,
    },
    {
      accessorKey: "medida",
      header: "Medida",
      size: 420,
    },
    {
      accessorKey: "unidad",
      header: "Unidad",
      size: 160,
    },
    {
      id: "estado",
      header: "Estado",
      size: 120,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(row.original.id);
            }}
            className="flex shrink-0 items-center gap-1 rounded p-1 text-[#1d5fbf] transition-colors hover:bg-blue-50 hover:text-[#154a96]"
            title={`Editar ${row.original.medida}`}
            aria-label={`Editar ${row.original.medida}`}
          >
            <Pencil className="size-4" />
          </button>
          <ActionButton
            label={row.original.activo ? "Desactivar" : "Activar"}
            icon={
              row.original.activo ? (
                <Check className="size-4 stroke-[3]" />
              ) : (
                <X className="size-4 stroke-[3]" />
              )
            }
            onClick={(event) => {
              event.stopPropagation();
              onToggleStatus(row.original.id);
            }}
            className={
              row.original.activo
                ? "size-7 rounded-full bg-[#26c3ca] text-white hover:bg-[#1daab0]"
                : "size-7 rounded-full bg-[#ed5565] text-white hover:bg-[#d94656]"
            }
          />
        </div>
      ),
    },
  ];
}
