"use client";

import ServicioTecnicoTabs from "@/components/servicio-tecnico/ServicioTecnicoTabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Servicio } from "@/types/servicio-tecnico/servicios/Servicio";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, EyeIcon, PlusIcon } from "lucide-react";
import ServicioTecnicoData from "@/app/servicio-tecnico/data/servicioData.json";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { useServicioTecnicoTable } from "../hooks/useServicioTecnicoTable";

const data: Servicio[] = ServicioTecnicoData;

// Botones para la parte superior derecha
const misBotones = (
  <button
    onClick={() => alert("Botón de acción presionado")}
    className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all"
  >
    <PlusIcon size={20} strokeWidth={2.5} />
  </button>
);

const columns: ColumnDef<Servicio>[] = [
  { accessorKey: "cliente", header: "Cliente", size: 200 },
  { accessorKey: "servicio_tecnico", header: "Servicio Tec.", size: 220 },
  { accessorKey: "orden_servicio", header: "Orden Servicio.", size: 150 },
  { accessorKey: "fecha_registrada", header: "Fecha Registrada", size: 160 },
  {
    id: "actions",
    header: "Acciones",
    size: 120,
    cell: ({ row }) => (
      <>
        <Button
          size="icon-sm"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          onClick={() => alert(`Visualizando cliente: ${row.original.cliente}`)}
        >
          <EyeIcon className="size-4" />
        </Button>
        <Button
          size="icon-sm"
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full ml-2"
          onClick={() => alert(`Servicio pendiente: ${row.original.cliente}`)}
        >
          <Clock9 className="size-4" />
        </Button>
      </>
    ),
  },
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
  } = useServicioTecnicoTable(data);
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
        showSelection={false}
        isLoading={false}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
      />
    </ServicioTecnicoTabs>
  );
}

export default page;
