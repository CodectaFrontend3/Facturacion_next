"use client";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { useEntradaTable } from "../../hooks/useEntradaTable";
import EntradaProducto from "../../data/EntradaProducto.json";
import { KardexEntradaRow } from "../../types/kardex";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = EntradaProducto as KardexEntradaRow[];

export const columns: ColumnDef<KardexEntradaRow>[] = [
  { header: "ID", accessorKey: "id", size: 60 },
  { header: "Código", accessorKey: "codigo", size: 150 },
  { header: "Motivo", accessorKey: "motivo", size: 180 },
  { header: "Proveedor", accessorKey: "proveedor", size: 250 },
  { header: "Fecha Subida", accessorKey: "fecha_subida", size: 130 },
  { header: "Nº de G. Remisión", accessorKey: "numero_remision", size: 140 },
  { header: "Nº de Factura", accessorKey: "numero_factura", size: 130 },
  {
    header: "Ver",
    size: 80,
    cell: ({ row }) => (
      <Button
        size="sm"
        className="bg-[#1A5EB3] hover:bg-[#154b91] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
      >
        Ver
      </Button>
    ),
  },
  {
    header: "Anular",
    size: 160,
    cell: ({ row }) => {
      const { estado, codigo, id } = row.original;

      if (codigo === "INVENTARIO INICIAL") return null;

      // w-[134px] o w-36 le da el tamaño exacto para que "Guía en circulación" entre holgado en una sola línea
      const badgeClass =
        "inline-flex items-center justify-center text-[12px] font-medium h-8 w-[134px] rounded-sm select-none text-white text-center leading-none shadow-sm";

      if (estado === "ANULADO") {
        return <span className={`${badgeClass} bg-[#64748B]`}>Anulado</span>;
      }

      if (estado === "CIRCULACION") {
        return (
          <span className={`${badgeClass} bg-[#06B6D4]`}>
            Guía en circulación
          </span>
        );
      }

      return (
        <Button
          size="sm"
          onClick={() => console.log("Anulando ID:", id)}
          className="h-8 w-[134px] gap-1.5 text-[12px] font-medium rounded-sm shadow-sm bg-[#eb4a4a] hover:bg-[#eb3636] text-white"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
          Anular
        </Button>
      );
    },
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
  } = useEntradaTable(data);
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
