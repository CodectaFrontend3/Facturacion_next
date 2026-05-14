"use client";

import ServicioTecnicoTabs from "@/app/servicio-tecnico/components/ServicioTecnicoTabs";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Clock9, EyeIcon } from "lucide-react";
import { useEntregadoTable } from "../../hooks/useEntregadoTable";
import { Entregados } from "../../types/entregados/Entregados";

function EntregadosPage() {
  const {
    pendingFilters,
    applyFilters,
    resetFilters,
    setFilterValue,
    filteredData,
    pageIndex,
    setPageIndex,
  } = useEntregadoTable([]);

  const columns: ColumnDef<Entregados>[] = [
    { accessorKey: "cliente", header: "Cliente", size: 200 },
    { accessorKey: "servicio_tecnico", header: "Servicio Técnico", size: 220 },
    { accessorKey: "orden_servicio", header: "Orden de Servicio", size: 150 },
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
            onClick={() =>
              alert(`Ver detalles de la orden: ${row.original.id}`)
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
    <ServicioTecnicoTabs>
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

export default EntregadosPage;
