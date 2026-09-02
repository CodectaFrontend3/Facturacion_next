import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Marca } from "../types/marca";

interface MarcaColumnActions {
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onViewPhoto: (nombre: string, foto: string) => void;
}

export function getMarcaColumns({
  onEdit,
  onToggleStatus,
  onViewPhoto,
}: MarcaColumnActions): ColumnDef<Marca>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 180,
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
      accessorKey: "abreviatura",
      header: "Abreviatura",
      size: 120,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">
          {row.original.abreviatura || "-"}
        </span>
      ),
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
      size: 130,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">
          {row.original.telefono || ""}
        </span>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      size: 260,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">
          {row.original.descripcion || "Sin descripcion"}
        </span>
      ),
    },
    {
      id: "foto",
      header: "Foto",
      size: 100,
      cell: ({ row }) => {
        const foto = row.original.foto;
        if (!foto) {
          return (
            <span className="text-[13px] italic text-gray-500">
              Sin Imagen
            </span>
          );
        }

        return (
          <div className="flex items-center justify-center">
            <ActionButton
              label="Ver imagen"
              icon={<Eye className="size-4" />}
              onClick={() => onViewPhoto(row.original.nombre, foto)}
              className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
            />
          </div>
        );
      },
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
