import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { TipoCambio } from "../types/tipo-cambio";

interface TipoCambioColumnActions {
  onEdit: (id: number) => void;
}

export function getTipoCambioColumns({
  onEdit,
}: TipoCambioColumnActions): ColumnDef<TipoCambio>[] {
  return [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 180,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.fecha}</span>
      ),
    },
    {
      accessorKey: "compra",
      header: "Compra",
      size: 180,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.compra.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "venta",
      header: "Venta",
      size: 180,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">{row.original.venta.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "paralelo",
      header: "Paralelo",
      size: 180,
      cell: ({ row }) => (
        <span className="text-[#676a6c]">
          {row.original.paralelo.toFixed(2)}
        </span>
      ),
    },
    {
      id: "acciones",
      header: "Acciones",
      size: 100,
      cell: ({ row }) => {
        const isLatest = row.index === 0 && row.original.id === 1;

        if (isLatest) {
          return (
            <div className="flex items-center justify-center">
              <ActionButton
                label={`Editar tipo de cambio ${row.original.fecha}`}
                icon={<Pencil className="size-4" />}
                onClick={() => onEdit(row.original.id)}
                className="size-7 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
              />
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center">
            <span
              title="Solo el último registro se puede editar"
              className="flex size-7 items-center justify-center rounded-[2px] bg-[#26c3ca]/80 text-white cursor-default"
            >
              <Pencil className="size-4 opacity-75" />
            </span>
          </div>
        );
      },
    },
  ];
}
