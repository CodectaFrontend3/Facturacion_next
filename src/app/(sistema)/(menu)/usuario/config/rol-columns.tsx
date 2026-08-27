import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, User } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Rol } from "../types/usuario";

interface RolColumnActions {
  onEdit: (rol: Rol) => void;
  onViewUsers: (rol: Rol) => void;
}

export function getRolColumns({
  onEdit,
  onViewUsers,
}: RolColumnActions): ColumnDef<Rol>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Nombre del Rol",
      size: 200,
      cell: ({ row }) => (
        <span className="font-medium text-[#676a6c]">
          {row.original.nombre}
        </span>
      ),
    },
    {
      accessorKey: "usuariosAsignados",
      header: "Usuarios Asignados",
      size: 160,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">
          {row.original.usuariosAsignados}
        </span>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.descripcion}</span>
      ),
    },
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      size: 90,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.5">
          {/* Edit Rol Button */}
          <ActionButton
            type="button"
            label={`Editar rol ${row.original.nombre}`}
            icon={<Pencil className="size-3.5" />}
            onClick={() => onEdit(row.original)}
            className={
              row.original.nombre === "Vendedor"
                ? "size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
                : "size-7 rounded-[2px] bg-[#26c3ca] text-white hover:bg-[#1daab0]"
            }
          />

          {/* User Icon Button */}
          <ActionButton
            type="button"
            label={`Usuarios del rol ${row.original.nombre}`}
            icon={<User className="size-3.5" />}
            onClick={() => onViewUsers(row.original)}
            className="size-7 rounded-[2px] bg-[#4b5563] text-white hover:bg-[#374151]"
          />
        </div>
      ),
    },
  ];
}
