"use client";

import ServicioTecnicoTabs from "@/app/(sistema)/servicio-tecnico/components/ServicioTecnicoTabs";
import { Cotizacion } from "@/app/(sistema)/servicio-tecnico/types/cotizacion/Cotizacion";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, DownloadIcon, EyeIcon, Printer } from "lucide-react";

import CotizacionData from "@/app/(sistema)/servicio-tecnico/data/cotizacionData.json";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { FilterSelect } from "@/components/DataFilters/FilterSelect";
import { useRouter } from "next/navigation";
import { useCotizacionTable } from "@/app/(sistema)/servicio-tecnico/hooks/useCotizacionTable";

const data: Cotizacion[] = CotizacionData;

// Botones para la parte superior derecha
const misBotones = (
  <div className="flex gap-2">
    <button
      onClick={() => alert("Imprimiendo...")}
      className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all"
      aria-label="Imprimir"
    >
      <Printer size={16} strokeWidth={3} />
    </button>

    <button
      onClick={() => alert("Descargando...")}
      className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all"
      aria-label="Descargar"
    >
      <DownloadIcon size={16} strokeWidth={3} />
    </button>
  </div>
);

const tipoDocOptions = [
  { label: "Todos los Comprobantes", value: "todos" },
  { label: "Factura", value: "Factura" },
  { label: "Boleta", value: "Boleta" },
  { label: "Nota Venta", value: "NotaVenta" },
];

function Cotizacionpage() {
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
            className="bg-[#1A5EB3] hover:bg-[#164e96] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
            onClick={() =>
              router.push(`/servicio-tecnico/cotizacion/${row.original.id}`)
            }
            aria-label="Ver detalle"
          >
            <EyeIcon size={16} />
          </Button>

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
        totals={{ total: totalFormatted, totalG: totalGFormatted }}
        onPageChange={setPageIndex}
      />
    </ServicioTecnicoTabs>
  );
}

export default Cotizacionpage;
