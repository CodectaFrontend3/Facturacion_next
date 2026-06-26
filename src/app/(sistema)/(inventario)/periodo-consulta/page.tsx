"use client";

import { ColumnDef } from "@tanstack/react-table";
import FiltroInventario from "../components/FiltroInventario";
import { ConsultaCompra, ConsultaVenta } from "../types/ConsultaInventario";
import { Button } from "@/components/ui/button";
import router from "next/router";
import { Clock, Eye } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const columnsCompra: ColumnDef<ConsultaCompra>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre Producto",
    size: 250,
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
    size: 120,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.cantidad}</span>
    ),
  },
  {
    accessorKey: "precio_nacional",
    header: "Precio Nac.",
    size: 150,
    cell: ({ row }) => (
      <span>S/. {row.original.precio_nacional.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "precio_extranjero",
    header: "Precio Ext.",
    size: 150,
    cell: ({ row }) => (
      <span>$ {row.original.precio_extranjero.toFixed(2)}</span>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    size: 180,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="bg-[#1A5EB3] hover:bg-[#164e96] text-white rounded-none h-8 w-8 p-0"
          onClick={() =>
            router.push(`/servicio-tecnico/compra/${row.original.id}`)
          }
          aria-label="Ver detalle compra"
        >
          <Eye size={16} />
        </Button>

        <Button
          size="icon"
          className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-none h-8 w-8 p-0"
          onClick={() => alert(`Pendiente compra ID: ${row.original.id}`)}
          aria-label="Tiempo pendiente"
        >
          <Clock size={16} />
        </Button>
      </div>
    ),
  },
];

export const columnsVenta: ColumnDef<ConsultaVenta>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 160,
    // Si 'tipo' es un enum u objeto, puedes renderizarlo de forma personalizada aquí
    cell: ({ row }) => (
      <span className="capitalize">{String(row.original.tipo)}</span>
    ),
  },
  {
    accessorKey: "nombre",
    header: "Nombre Producto / Ítem",
    size: 250,
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
    size: 120,
  },
  {
    accessorKey: "precio_nacional",
    header: "Precio Nac.",
    size: 150,
    cell: ({ row }) => (
      <span>S/. {row.original.precio_nacional.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "precio_extranjero",
    header: "Precio Ext.",
    size: 150,
    cell: ({ row }) => (
      <span>$ {row.original.precio_extranjero.toFixed(2)}</span>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    size: 180,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="bg-[#1A5EB3] hover:bg-[#164e96] text-white rounded-none h-8 w-8 p-0"
          onClick={() =>
            router.push(`/servicio-tecnico/venta/${row.original.id}`)
          }
          aria-label="Ver detalle venta"
        >
          <Eye size={16} />
        </Button>

        <Button
          size="icon"
          className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-none h-8 w-8 p-0"
          onClick={() => alert(`Pendiente venta ID: ${row.original.id}`)}
          aria-label="Tiempo pendiente"
        >
          <Clock size={16} />
        </Button>
      </div>
    ),
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white p-6 flex flex-col space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black">
          Consultas Inventario
        </h2>
      </div>

      {/* Filtros de Inventario */}
      <FiltroInventario />

      {/* Tabla de Compras */}
      <Card className="rounded-none border border-slate-200 shadow-none bg-white">
        <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
          <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
            Compras
          </CardTitle>
        </CardHeader>
        <div className="p-4">
          <DataTable
            columns={columnsCompra}
            data={[]}
            showSelection={false}
            isLoading={false}
          />
        </div>
      </Card>

      {/* Tabla de Ventas */}
      <Card className="rounded-none border border-slate-200 shadow-none bg-white">
        <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
          <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
            Ventas
          </CardTitle>
        </CardHeader>
        <div className="p-4">
          <DataTable
            columns={columnsVenta}
            data={[]}
            showSelection={false}
            isLoading={false}
          />
        </div>
      </Card>
    </main>
  );
}
