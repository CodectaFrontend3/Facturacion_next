import type { ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Garantia } from "../types/garantia";

interface GarantiaColumnActions {
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
}

export function getGarantiaColumns({
  onToggleStatus,
  onEdit,
}: GarantiaColumnActions): ColumnDef<Garantia>[] {
  return [
    {
      accessorKey: "descripcion",
      header: "Descripción",
      size: 400,
      cell: ({ row }) => (
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] text-[#676a6c]">
            {row.original.descripcion}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(row.original.id);
            }}
            className="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[12px] text-[#1d5fbf] transition-colors hover:bg-blue-50 hover:text-[#154a96]"
            title="Editar descripción"
            aria-label={`Editar ${row.original.descripcion}`}
          >
            <Pencil className="size-3.5" />
            Editar
          </button>
        </div>
      ),
    },
    {
      id: "estado",
      header: "Estado",
      size: 80,
      cell: ({ row }) => (
        <div className="flex justify-center">
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
                ? "size-7 rounded-full bg-[#26c3ca] hover:bg-[#1daab0] text-white flex items-center justify-center"
                : "size-7 rounded-full bg-[#ed5565] hover:bg-[#d94656] text-white flex items-center justify-center"
            }
          />
        </div>
      ),
    },
  ];
}
