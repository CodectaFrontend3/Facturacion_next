"use client";

import { KardexDistribucionRow } from "../../types/kardex";
import DistribucionProducto from "../../data/DistribucionProducto.json";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";
import { useDistribucionTable } from "../../hooks/useDistribucionTable";

const data = DistribucionProducto as unknown as KardexDistribucionRow[];

export const columns: ColumnDef<KardexDistribucionRow>[] = [
  { header: "ID", accessorKey: "id", size: 60 },
  { header: "Código", accessorKey: "codigo", size: 150 },
  {
    header: "Fecha Distribución",
    accessorKey: "fecha_distribucion",
    size: 130,
  },
  {
    header: "Cantidad de Productos",
    accessorKey: "cantidad_productos",
    size: 150,
    cell: ({ row }) => {
      const cantidad = row.original.cantidad_productos;
      return <span>{cantidad} producto</span>;
    },
  },
  {
    header: "Cantidad Distribuida",
    accessorKey: "cantidad_distribuida",
    size: 150,
    cell: ({ row }) => {
      const cantidad = row.original.cantidad_distribuida;
      return <span>{cantidad} items</span>;
    },
  },
  { header: "Almacen", accessorKey: "almacen", size: 180 },
  { header: "Guia de Remisión", accessorKey: "guia_remision", size: 250 },
  {
    header: "Ver",
    size: 120,
    cell: ({ row }) => (
      <Button
        size="sm"
        className="bg-[#23C6C8] hover:bg-[#0d898b] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
      >
        Ver
      </Button>
    ),
  },
];

export default function Page() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useDistribucionTable(data);
  return (
    <>
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
    </>
  );
}
