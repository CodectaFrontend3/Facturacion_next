import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, Key, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Usuario } from "../types/usuario";

interface UsuarioColumnActions {
  onView: (usuario: Usuario) => void;
  onChangePassword: (usuario: Usuario) => void;
  onToggleStatus: (id: string) => void;
}

export function getUsuarioColumns({
  onView,
  onChangePassword,
  onToggleStatus,
}: UsuarioColumnActions): ColumnDef<Usuario>[] {
  return [
    {
      accessorKey: "nombresApellidos",
      header: "Nombres y Apellidos",
      cell: ({ row }) => (
        <span className="font-medium text-[#676a6c]">
          {row.original.nombresApellidos}
        </span>
      ),
    },
    {
      accessorKey: "dni",
      header: "DNI",
      size: 110,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.dni}</span>
      ),
    },
    {
      accessorKey: "rol",
      header: "Rol Asignado",
      size: 130,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.rol}</span>
      ),
    },
    {
      accessorKey: "correo",
      header: "Correo",
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.correo}</span>
      ),
    },
    {
      accessorKey: "celular",
      header: "Celular",
      size: 110,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.celular}</span>
      ),
    },
    {
      accessorKey: "almacen",
      header: "Almacen",
      size: 160,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.almacen}</span>
      ),
    },
    {
      id: "ver",
      header: () => <div className="text-center">Ver</div>,
      size: 60,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <ActionButton
            type="button"
            label={`Ver usuario ${row.original.nombresApellidos}`}
            icon={<Eye className="size-3.5" />}
            onClick={() => onView(row.original)}
            className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
          />
        </div>
      ),
    },
    {
      id: "acciones",
      header: () => <div className="text-center">Acciones</div>,
      size: 90,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.5">
          {/* Key / Change Password Button */}
          <ActionButton
            type="button"
            label={`Cambiar contraseña de ${row.original.nombresApellidos}`}
            icon={<Key className="size-3.5" />}
            onClick={() => onChangePassword(row.original)}
            className="size-7 rounded-[2px] bg-[#26c3ca] text-white hover:bg-[#1daab0]"
          />

          {/* Status Toggle Circle Button */}
          <ActionButton
            type="button"
            label={row.original.activo ? "Desactivar" : "Activar"}
            icon={
              row.original.activo ? (
                <Check className="size-3.5 stroke-[3]" />
              ) : (
                <X className="size-3.5 stroke-[3]" />
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
