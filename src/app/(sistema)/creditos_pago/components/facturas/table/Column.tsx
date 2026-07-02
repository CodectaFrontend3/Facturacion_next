"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9 } from "lucide-react";
import { Factura } from "../../../types/Factura";

export const columns: ColumnDef<Factura>[] = [
  { accessorKey: "item", header: "Item", size: 120 },
  { accessorKey: "estado", header: "Estado", size: 120 },
  { accessorKey: "numero_factura", header: "Nº Factura", size: 120 },
  { accessorKey: "cliente", header: "Cliente", size: 120 },
  { accessorKey: "fecha_emision", header: "Emisión", size: 120 },
  { accessorKey: "monto_total", header: "Monto Total", size: 120 },
  { accessorKey: "numero_cuotas", header: "Nº Cuotas", size: 120 },
  { accessorKey: "saldo", header: "Saldo", size: 120 },
  { accessorKey: "fecha_vencimiento", header: "Vencimiento", size: 120 },
  { accessorKey: "observaciones", header: "Obs.", size: 120 },
  {
    id: "actions",
    header: "Acciones",
    size: 180,
    cell: ({ row }) => (
      <>
        <Button
          size="icon-sm"
          className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
          onClick={() => alert(`Servicio pendiente: ${row.original.id}`)}
          aria-label="Tiempo pendiente"
        >
          <Clock9 size={16} />
        </Button>
      </>
    ),
  },
];
