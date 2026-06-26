"use client";

import FiltroInventario from "@/app/(sistema)/(inventario)/components/FiltroInventario";
import { ColumnDef } from "@tanstack/react-table";
import { ComprasProduco, VentasProducto } from "../types/MoviminetoConsulta";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";

export const columnsCompra: ColumnDef<ComprasProduco>[] = [
  { accessorKey: "id", header: "ID", size: 80 },
  { accessorKey: "numero_documento", header: "Nº Documento", size: 150 },
  { accessorKey: "proveedor", header: "Proveedor", size: 200 },
  { accessorKey: "ruc", header: "RUC", size: 130 },
  {
    accessorKey: "numero_documento_provedor",
    header: "Doc. Proveedor",
    size: 150,
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    size: 120,
    cell: ({ row }) => <span>S/. {row.original.subtotal.toFixed(2)}</span>,
  },
  {
    accessorKey: "igv",
    header: "IGV",
    size: 100,
    cell: ({ row }) => <span>S/. {row.original.igv.toFixed(2)}</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 130,
    cell: ({ row }) => (
      <span className="font-semibold">S/. {row.original.total.toFixed(2)}</span>
    ),
  },
];

export const columnsVenta: ColumnDef<VentasProducto>[] = [
  { accessorKey: "id", header: "ID", size: 80 },
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 120,
    cell: ({ row }) => <span className="capitalize">{row.original.tipo}</span>,
  },
  { accessorKey: "numero_documento", header: "Nº Documento", size: 150 },
  { accessorKey: "proveedor", header: "Proveedor", size: 200 },
  { accessorKey: "ruc", header: "RUC", size: 130 },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    size: 120,
    cell: ({ row }) => <span>S/. {row.original.subtotal.toFixed(2)}</span>,
  },
  {
    accessorKey: "igv",
    header: "IGV",
    size: 100,
    cell: ({ row }) => <span>S/. {row.original.igv.toFixed(2)}</span>,
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 130,
    cell: ({ row }) => (
      <span className="font-semibold">S/. {row.original.total.toFixed(2)}</span>
    ),
  },
];

export default function Page() {
  return (
    <main className="block w-full h-auto bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">
          Movimientos Inventario
        </h2>
      </div>

      {/* Filtros de Inventario */}
      <div className="mb-6">
        <FiltroInventario />
      </div>

      {/* Contenedor de las tarjetas */}
      <div className="flex flex-col gap-6">
        {/* Tabla de Compras */}
        <Card className="rounded-none border border-slate-200 shadow-none bg-white w-full h-auto">
          <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
            <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
              Compras Productos
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

        {/* Tabla de Facturas */}
        <Card className="rounded-none border border-slate-200 shadow-none bg-white w-full h-auto">
          <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
            <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
              Facturas
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

        {/* Tabla de Boletas */}
        <Card className="rounded-none border border-slate-200 shadow-none bg-white w-full h-auto">
          <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
            <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
              Boletas
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
      </div>
    </main>
  );
}
