"use client";

import FiltroInventario from "@/app/(sistema)/(inventario)/components/FiltroInventario";
import { ColumnDef } from "@tanstack/react-table";
import { ComprasProduco, VentasProducto } from "../types/MoviminetoConsulta";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";

// Importación de datos y del hook
import { useFiltroInventario } from "../hooks/useInventarioFilter";
import MovimientoConsultaData from "../data/MovimientoConsulta.json";

// Forzamos el tipado correcto de los JSON cargados
const comprasData = MovimientoConsultaData as ComprasProduco[];
const ventasData = MovimientoConsultaData as VentasProducto[];

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
  // Instanciamos el hook para compras generales
  const filterCompras = useFiltroInventario<ComprasProduco>({
    dataOriginal: comprasData,
    dateKey: "fecha_registro" as any, // Cambiar por tu propiedad real de fecha si existe
  });

  // Instanciamos el hook para ventas/documentos segmentados
  const filterVentas = useFiltroInventario<VentasProducto>({
    dataOriginal: ventasData,
    dateKey: "fecha_registro" as any,
  });

  const handleConsultar = () => {
    filterCompras.ejecutarFiltro();
    filterVentas.ejecutarFiltro();
  };

  // Separamos sublistas en caliente usando la utilitaria del hook
  const filterdataFacturas = filterVentas.separarPorTipo("tipo", "Factura");
  const filterdataBoletas = filterVentas.separarPorTipo("tipo", "Boleta");

  return (
    <main className="block w-full h-auto bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">
          Movimientos Inventario
        </h2>
      </div>

      {/* Enviamos las props del hook unificado al componente de UI */}
      <div className="mb-6">
        <FiltroInventario
          titulo="Nueva Entradas"
          {...filterCompras}
          onConsultar={handleConsultar}
        />
      </div>

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
              data={filterCompras.dataFiltrada}
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
              data={filterdataFacturas}
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
              data={filterdataBoletas}
              showSelection={false}
              isLoading={false}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}
