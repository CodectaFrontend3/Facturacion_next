"use client";

import { KardexTrasladoRow } from "../../types/kardex";
import TrasladoProducto from "../../data/TrasladoProducto.json";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useTrasladoTable } from "../../hooks/useTrasladoTable";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";

const data = TrasladoProducto as unknown as KardexTrasladoRow[];

export const columns: ColumnDef<KardexTrasladoRow>[] = [
  {
    header: "ID",
    accessorKey: "id",
    size: 60,
  },
  {
    header: "Código",
    accessorKey: "codigo",
    size: 180,
  },
  {
    header: "Almacén Emisor",
    accessorKey: "almacen_origen",
    size: 180,
  },
  {
    header: "Almacén Receptor",
    accessorKey: "almacen_destino",
    size: 180,
  },
  {
    header: "Ver",
    size: 100,
    cell: ({ row }) => (
      <Button
        size="sm"
        onClick={() => console.log("Viendo traslado ID:", row.original.id)}
        className="bg-[#23C6C8] hover:bg-[#1ab394] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
      >
        Ver
      </Button>
    ),
  },
  {
    header: "Anular",
    size: 120,
    cell: ({ row }) => (
      <Button
        size="sm"
        onClick={() => console.log("Anulando traslado ID:", row.original.id)}
        className="bg-[#64748B] hover:bg-[#475569] text-white font-medium text-[12px] h-8 w-20 rounded-sm shadow-sm"
      >
        Anular
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
  } = useTrasladoTable(data);
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
