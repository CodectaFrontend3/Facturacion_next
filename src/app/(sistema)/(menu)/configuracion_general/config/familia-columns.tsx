import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Familia } from "../types/familia";

interface FamiliaColumnActions {
  onView: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function getFamiliaColumns({
  onView,
  onToggleStatus,
}: FamiliaColumnActions): ColumnDef<Familia>[] {
  return [
    {
      accessorKey: "codigo",
      header: "Código",
      size: 100,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.codigo}</span>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      size: 320,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.descripcion}</span>
      ),
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
      size: 160,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.ubicacion}</span>
      ),
    },
    {
      accessorKey: "subfamiliasCount",
      header: "# SubFamilias",
      size: 140,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.subfamiliasCount}</span>
      ),
    },
    {
      id: "accion",
      header: "Acción",
      size: 90,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <ActionButton
            label={`Ver subfamilias de ${row.original.descripcion}`}
            icon={<Eye className="size-4" />}
            onClick={() => onView(row.original.id)}
            className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
          />
        </div>
      ),
    },
    {
      id: "estado",
      header: "Estado",
      size: 90,
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
