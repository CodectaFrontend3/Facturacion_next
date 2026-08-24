import type { ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Motivo } from "../types/motivo";

interface MotivoColumnActions {
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function getMotivoColumns({
  onEdit,
  onToggleStatus,
}: MotivoColumnActions): ColumnDef<Motivo>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 380,
      cell: ({ row }) => (
        <div className="flex items-center justify-between gap-2">
          <span className="font-normal text-[#676a6c]">
            {row.original.nombre}
          </span>
          <button
            type="button"
            onClick={() => onEdit(row.original.id)}
            className="flex shrink-0 items-center gap-1 rounded p-1 text-[#1d5fbf] transition-colors hover:bg-blue-50 hover:text-[#154a96]"
            title={`Editar ${row.original.nombre}`}
            aria-label={`Editar ${row.original.nombre}`}
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      size: 240,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.tipo}</span>
      ),
    },
    {
      id: "estado",
      header: "Estado",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
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
                ? "size-7 rounded-full bg-[#26c3ca] text-white hover:bg-[#1daab0]"
                : "size-7 rounded-full bg-[#ed5565] text-white hover:bg-[#d94656]"
            }
          />
        </div>
      ),
    },
  ];
}
