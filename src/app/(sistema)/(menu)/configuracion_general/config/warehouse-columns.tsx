import type { ColumnDef } from "@tanstack/react-table";
import { Check, Eye, Pencil, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { Warehouse } from "../types/warehouse";

interface WarehouseColumnActions {
  onView: (warehouse: Warehouse) => void;
  onEdit: (warehouse: Warehouse) => void;
  onToggleStatus: (warehouseId: number) => void;
}

export function getWarehouseColumns({
  onView,
  onEdit,
  onToggleStatus,
}: WarehouseColumnActions): ColumnDef<Warehouse>[] {
  return [
    { accessorKey: "id", header: "ID", size: 42 },
    { accessorKey: "nombre", header: "Nombre", size: 120 },
    { accessorKey: "abreviatura", header: "Abreviatura", size: 115 },
    { accessorKey: "direccion", header: "Dirección", size: 145 },
    { accessorKey: "responsable", header: "Responsable", size: 260 },
    {
      id: "acciones",
      header: "Acciones",
      size: 88,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <ActionButton
            label={`Ver almacén ${row.original.nombre}`}
            icon={<Eye className="size-4" />}
            onClick={() => onView(row.original)}
            className="size-7 rounded-[2px] bg-[#2C1FF3] text-white hover:bg-[#190FCE]"
          />
          <ActionButton
            label={`Editar almacén ${row.original.nombre}`}
            icon={<Pencil className="size-4" />}
            onClick={() => onEdit(row.original)}
            className="size-7 rounded-[2px] bg-[#f8a756] text-white hover:bg-[#ea9138]"
          />
        </div>
      ),
    },
    {
      id: "estado",
      header: "Estado",
      size: 60,
      cell: ({ row }) => (
        <ActionButton
          label={row.original.activo ? "Desactivar almacén" : "Activar almacén"}
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
              ? "size-7 rounded-[2px] bg-[#26c3ca] text-white hover:bg-[#1daab0]"
              : "size-7 rounded-[2px] bg-[#ed5565] text-white hover:bg-[#d94656]"
          }
        />
      ),
    },
  ];
}
