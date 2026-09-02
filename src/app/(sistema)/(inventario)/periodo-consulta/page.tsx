"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import FiltroInventario from "../components/FiltroInventario";
import { ConsultaCompra, ConsultaVenta } from "../types/ConsultaInventario";
import { DataTable } from "@/components/shared/DataTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Importación de datos y del hook
import { useFiltroInventario } from "../hooks/useInventarioFilter";
import ConsultaInventarioData from "../data/ConsultaInventario.json";

const comprasInventario = ConsultaInventarioData as ConsultaCompra[];
const ventasInventario = ConsultaInventarioData as ConsultaVenta[];

export const columnsCompra = (router: any): ColumnDef<ConsultaCompra>[] => [
  { accessorKey: "nombre", header: "Nombre Producto", size: 250 },
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
];

export const columnsVenta = (router: any): ColumnDef<ConsultaVenta>[] => [
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 160,
    cell: ({ row }) => (
      <span className="capitalize">{String(row.original.tipo)}</span>
    ),
  },
  { accessorKey: "nombre", header: "Nombre Producto / Ítem", size: 250 },
  { accessorKey: "cantidad", header: "Cantidad", size: 120 },
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
];

export default function Page() {
  const router = useRouter();

  const filterCompras = useFiltroInventario<ConsultaCompra>({
    dataOriginal: comprasInventario,
    dateKey: "fecha" as any,
  });

  const filterVentas = useFiltroInventario<ConsultaVenta>({
    dataOriginal: ventasInventario,
    dateKey: "fecha" as any,
  });

  const handleConsultar = () => {
    filterCompras.ejecutarFiltro();
    filterVentas.ejecutarFiltro();
  };

  return (
    <main className="block w-full h-auto bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">
          Movimientos Inventario
        </h2>
      </div>

      {/* Filtros de Inventario */}
      <div className="mb-6">
        <FiltroInventario
          titulo="Consultas Generales"
          {...filterCompras}
          onConsultar={handleConsultar}
        />
      </div>

      {/* Contenedor de las tarjetas */}
      <div className="flex flex-col gap-6">
        {/* Tabla de Compras */}
        <Card className="rounded-none border border-slate-200 shadow-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4 border-b border-slate-200">
            <CardTitle className="text-[14px] font-bold text-slate-700 tracking-wide">
              Compras
            </CardTitle>
          </CardHeader>
          <div className="p-4">
            <DataTable
              columns={columnsCompra(router)}
              data={filterCompras.dataFiltrada}
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
              columns={columnsVenta(router)}
              data={filterVentas.dataFiltrada}
              showSelection={false}
              isLoading={false}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}
