"use client";

import ServicioTecnicoTabs from "@/app/servicio-tecnico/components/ServicioTecnicoTabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Servicio } from "@/app/servicio-tecnico/types/servicios/Servicio";
import { ColumnDef } from "@tanstack/react-table";
import { Clock9, ExternalLink, PlusIcon } from "lucide-react";
import ServicioTecnicoData from "@/app/servicio-tecnico/data/servicioData.json";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { useServicioTecnicoTable } from "../../hooks/useServicioTecnicoTable";
import { useRouter } from "next/navigation";

const data: Servicio[] = ServicioTecnicoData;

function ServiciosPage() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    pageSize,
    setPageIndex,
  } = useServicioTecnicoTable(data);

  const router = useRouter();

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
            className="bg-[#1A5EB3] hover:bg-[#164e96] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
            onClick={() =>
              router.push(
                `/servicio-tecnico/servicios/proceso/${row.original.id}/ingresos`,
              )
            }
            aria-label="Ver detalle"
          >
            <ExternalLink size={16} />
          </Button>
          <Button
            size="icon-sm"
            className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
            onClick={() => alert(`Servicio pendiente: ${row.original.cliente}`)}
          >
            <Clock9 size={16} />
          </Button>
        </>
      ),
    },
  ];

  // Botones para la parte superior derecha
  const misBotones = (
    <button
      onClick={() => router.push("/servicio-tecnico/servicios/create")}
      className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-md hover:bg-[#164e96] transition-all"
      style={{ fontFamily: "'Outfit', sans-serif", fontSize: "15px" }}
      aria-label="Agregar servicio"
    >
      <PlusIcon size={16} strokeWidth={5} />
    </button>
  );
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
        pageSize={pageSize}
        onPageChange={setPageIndex}
      />
    </ServicioTecnicoTabs>
  );
}

export default ServiciosPage;
