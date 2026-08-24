import type { ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Validez } from "../types/validez";

interface ValidezColumnActions {
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function getValidezColumns({
  onEdit,
  onToggleStatus,
}: ValidezColumnActions): ColumnDef<Validez>[] {
  return [
    {
      accessorKey: "descripcion",
      header: "Descripción",
      size: 500,
      cell: ({ row }) => (
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] text-[#676a6c]">
            {row.original.descripcion}
          </span>
          <button
            type="button"
            onClick={() => onEdit(row.original.id)}
            className="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[12px] text-[#1d5fbf] transition-colors hover:bg-blue-50 hover:text-[#154a96]"
            title={`Editar ${row.original.descripcion}`}
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
      size: 90,
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
            onClick={() => onToggleStatus(row.original.id)}
            className={
              row.original.activo
                ? "size-7 rounded-full bg-[#26c3ca] text-white hover:bg-[#1daab0] flex items-center justify-center"
                : "size-7 rounded-full bg-[#ed5565] text-white hover:bg-[#d94656] flex items-center justify-center"
            }
          />
        </div>
      ),
    },
  ];
}
