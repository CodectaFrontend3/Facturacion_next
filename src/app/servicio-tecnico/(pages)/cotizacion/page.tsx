"use client";

import ServicioTecnicoTabs from "@/app/servicio-tecnico/components/ServicioTecnicoTabs";
import { Cotizacion } from "@/app/servicio-tecnico/types/cotizacion/Cotizacion";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, DownloadIcon, EyeIcon, Printer } from "lucide-react";

import CotizacionData from "@/app/servicio-tecnico/data/cotizacionData.json";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { FilterSelect } from "@/components/DataFilters/FilterSelect";
import { useRouter } from "next/navigation";
import { useCotizacionTable } from "../../hooks/useCotizacionTable";

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
    totalFormatted,
    totalGFormatted,
  } = useCotizacionTable(data);

  const router = useRouter();

  const columns: ColumnDef<Cotizacion>[] = [
    { accessorKey: "id", header: "ID", size: 120 },
    { accessorKey: "numero", header: "Nº", size: 220 },
    { accessorKey: "ruc_dni", header: "RUC-DNI", size: 160 },
    { accessorKey: "fecha_emision", header: "Emision", size: 160 },
    { accessorKey: "forma_pago", header: "Forma de Pago", size: 160 },
    { accessorKey: "importe_total", header: "Importe Total", size: 160 },
    {
      id: "actions",
      header: "Acciones",
      size: 180,
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
        footerContent={
          <div className="flex justify-end bg-white border border-gray-200 border-t-0 -mt-4 relative z-10">
            <div
              className="border-l border-gray-200 px-4 py-3 font-bold text-gray-700 text-[13px] whitespace-nowrap text-right"
              style={{ width: 161.7 }}
            >
              Total: {totalFormatted}
            </div>
            <div
              className="border-l border-gray-200 px-4 py-3 font-bold text-gray-700 text-[13px] whitespace-nowrap text-right"
              style={{ width: 181.86 }}
            >
              Total G.: {totalGFormatted}
            </div>
          </div>
        }
        onPageChange={setPageIndex}
      />
    </ServicioTecnicoTabs>
  );
}

export default page;
