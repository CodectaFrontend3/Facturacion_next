"use client";

import ServicioTecnicoTabs from "@/app/servicio-tecnico/components/ServicioTecnicoTabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Cotizacion } from "@/app/servicio-tecnico/types/cotizacion/Cotizacion";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, DownloadIcon, EyeIcon, Printer } from "lucide-react";

import CotizacionData from "@/app/servicio-tecnico/data/cotizacionData.json";
import { useCotizacionTable } from "../../hooks/useCotizacionTable";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSelect } from "@/components/DataFilters/FilterSelect";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { useRouter } from "next/navigation";

const data: Cotizacion[] = CotizacionData;

// Botones para la parte superior derecha
const misBotones = (
  <div className="flex gap-2">
    <button
      onClick={() => alert("Imprimiendo...")}
      className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all shadow-sm"
    >
      <Printer size={20} strokeWidth={2.5} />
    </button>
    <button
      onClick={() => alert("Descargando...")}
      className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all shadow-sm"
    >
      <DownloadIcon size={20} strokeWidth={2.5} />
    </button>
  </div>
);

const tipoDocOptions = [
  { label: "Todos los Comprobantes", value: "todos" },
  { label: "Factura", value: "Factura" },
  { label: "Boleta", value: "Boleta" },
  { label: "Nota Venta", value: "NotaVenta" },
];

function page() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useCotizacionTable(data);

  const router = useRouter();

  const columns: ColumnDef<Cotizacion>[] = [
    { accessorKey: "id", header: "ID", size: 200 },
    { accessorKey: "numero", header: "Nº", size: 220 },
    { accessorKey: "ruc_dni", header: "RUC-DNI", size: 150 },
    { accessorKey: "fecha_emision", header: "Emision", size: 160 },
    { accessorKey: "forma_pago", header: "Forma de Pago", size: 160 },
    { accessorKey: "importe_total", header: "Importe Total", size: 160 },
    {
      id: "actions",
      header: "Acciones",
      size: 120,
      cell: ({ row }) => (
        <>
          <Button
            size="icon-sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            onClick={() =>
              router.push(`/servicio-tecnico/cotizacion/${row.original.id}`)
            }
          >
            <EyeIcon className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full ml-2"
            onClick={() => alert(`Servicio pendiente: ${row.original.id}`)}
          >
            <Clock9 className="size-4" />
          </Button>
        </>
      ),
    },
  ];
  return (
    <ServicioTecnicoTabs actions={misBotones}>
      {/* Filtros */}
      <div className="flex items-center justify-between mb-4">
        <DataFilters onSearch={applyFilters} onReset={resetFilters}>
          <FilterDateRange
            nameFrom="fechaDesde"
            nameTo="fechaHasta"
            valueFrom={pendingFilters.fechaDesde}
            valueTo={pendingFilters.fechaHasta}
            onChange={setFilterValue}
          />
          <FilterSelect
            name="tipoDoc"
            value={pendingFilters.tipoDoc}
            onChange={setFilterValue}
            options={tipoDocOptions}
          />
          <FilterSearch
            name="search"
            value={pendingFilters.search}
            onChange={setFilterValue}
          />
        </DataFilters>
      </div>

      {/* Aquí se renderiza la tabla con los datos */}
      <DataTable
        columns={columns}
        data={filteredData}
        showSelection={true}
        isLoading={false}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
      />
    </ServicioTecnicoTabs>
  );
}

export default page;
