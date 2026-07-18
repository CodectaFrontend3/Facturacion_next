"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HistorialPago } from "../types/ComprobanteBase";

interface ColumnsProps {
  onVerDetalle: (pago: HistorialPago) => void;
}

export const getHistorialPagoColumns = ({
  onVerDetalle,
}: ColumnsProps): ColumnDef<HistorialPago>[] => [
  {
    accessorKey: "id",
    header: "Id",
    size: 60,
  },
  {
    accessorKey: "tipo_pago",
    header: "Tipo de Pago",
    size: 130,
    cell: ({ row }) => {
      const valor = row.original.tipo_pago;
      return (
        <span className="inline-block bg-[#1d4ed8] text-white text-[11px] font-medium px-2 py-0.5 rounded-sm">
          {valor}
        </span>
      );
    },
  },
  {
    accessorKey: "monto_pagado",
    header: "Monto Pagado",
    size: 130,
    cell: ({ row }) => {
      const monto = row.original.monto_pagado;
      return <span>S/ {monto.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "metodo_pago",
    header: "Método de Pago",
    size: 140,
  },
  {
    accessorKey: "emisor",
    header: "Emisor",
    size: 120,
  },
  {
    accessorKey: "fecha_pago",
    header: "Fecha de Pago",
    size: 130,
  },
  {
    id: "detalles",
    header: "Detalles",
    size: 100,
    cell: ({ row }) => (
      <Button
        type="button"
        size="icon"
        onClick={() => onVerDetalle(row.original)} // Llama a la acción que viene del padre
        className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded shadow-sm h-7 w-7 cursor-pointer flex items-center justify-center transition-colors"
      >
        <Eye className="h-3.5 w-3.5" />
      </Button>
    ),
  },
];
