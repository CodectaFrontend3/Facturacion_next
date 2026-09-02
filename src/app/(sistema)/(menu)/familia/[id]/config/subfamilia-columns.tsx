import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus, Save, X } from "lucide-react";

import type { Subfamilia } from "@/app/(sistema)/(menu)/configuracion_general/types/familia";
import { ActionButton } from "@/components/common/ActionButton";
import { Input } from "@/components/ui/input";

interface SubfamiliaColumnActions {
  onAddSubfamilia: () => void;
  editingSubfamiliaId?: number;
  editingSubfamiliaDesc: string;
  onEditDescChange: (desc: string) => void;
  onStartEdit: (item: Subfamilia) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onToggleStatus: (id: number) => void;
}

export function getSubfamiliaColumns({
  onAddSubfamilia,
  editingSubfamiliaId,
  editingSubfamiliaDesc,
  onEditDescChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onToggleStatus,
}: SubfamiliaColumnActions): ColumnDef<Subfamilia>[] {
  return [
    {
      id: "dot",
      size: 50,
      header: () => (
        <div className="flex items-center justify-center">
          <ActionButton
            type="button"
            label="Agregar subfamilia"
            icon={<Plus className="size-4 stroke-[3]" />}
            onClick={onAddSubfamilia}
            className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
          />
        </div>
      ),
      cell: () => (
        <div className="flex items-center justify-center">
          <span className="inline-block size-2.5 rounded-full bg-[#10b981]" />
        </div>
      ),
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: ({ row }) => {
        const isEditing = editingSubfamiliaId === row.original.id;

        if (isEditing) {
          return (
            <Input
              value={editingSubfamiliaDesc}
              onChange={(e) => onEditDescChange(e.target.value)}
              autoFocus
              className="h-8 rounded-[2px] border-gray-300 bg-white px-2 text-[13px] font-medium text-[#676a6c] focus-visible:border-[#18a689] focus-visible:ring-0"
            />
          );
        }

        return (
          <span className="text-[13px] text-[#676a6c]">
            {row.original.descripcion}
          </span>
        );
      },
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicacion",
      size: 200,
      cell: ({ row }) => (
        <span className="text-[13px] text-[#676a6c]">
          {row.original.ubicacion}
        </span>
      ),
    },
    {
      id: "estado",
      header: () => <div className="text-center">Estado</div>,
      size: 130,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <button
            type="button"
            role="switch"
            aria-checked={row.original.activo}
            onClick={() => onToggleStatus(row.original.id)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              row.original.activo ? "bg-[#7dd3fc]" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                row.original.activo ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      ),
    },
    {
      id: "editar",
      header: () => <div className="text-center">Editar</div>,
      size: 120,
      cell: ({ row }) => {
        const isEditing = editingSubfamiliaId === row.original.id;

        if (isEditing) {
          return (
            <div className="flex items-center justify-center gap-1.5">
              <ActionButton
                type="button"
                label="Guardar cambios"
                icon={<Save className="size-3.5" />}
                onClick={onSaveEdit}
                className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
              />
              <ActionButton
                type="button"
                label="Cancelar edición"
                icon={<X className="size-3.5" />}
                onClick={onCancelEdit}
                className="size-7 rounded-[2px] bg-[#f59e0b] text-white hover:bg-[#d97706]"
              />
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center">
            <ActionButton
              type="button"
              label={`Editar ${row.original.descripcion}`}
              icon={<Pencil className="size-3.5" />}
              onClick={() => onStartEdit(row.original)}
              className="size-7 rounded-[2px] bg-[#f59e0b] text-white hover:bg-[#d97706]"
            />
          </div>
        );
      },
    },
  ];
}
