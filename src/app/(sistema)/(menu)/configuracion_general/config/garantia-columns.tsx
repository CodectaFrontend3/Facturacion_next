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
        <div className="flex items-center justify-between group">
          <span className="text-[13px] text-[#676a6c]">
            {row.original.descripcion}
          </span>
          <button
            type="button"
            onClick={() => onEdit(row.original.id)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity cursor-pointer"
            title="Editar descripción"
          >
            <Pencil className="size-3.5" />
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
            onClick={() => onToggleStatus(row.original.id)}
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
