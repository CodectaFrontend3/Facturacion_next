"use client";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import FacturasTabs from "../../../components/facturas/_facturas/FacturasTabs";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { DataTable } from "@/components/shared/DataTable";
import { getColumns } from "../../../components/Columns";
import { useComprobanteTable } from "../../../hooks/useComprobanteTable";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";

function page() {
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
    filteredDataSinPagoAutomatica,
  } = useComprobanteTable({ data: [], tipo: "Factura" }); // Usamos el hook para obtener los datos y funciones de filtrado

  const acciones = (
    <Button
      size="icon"
      className="bg-[#18A689] hover:bg-[#116d5b] text-white rounded-md h-9 w-10 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
      aria-label="Registrar pago"
    >
      <Banknote size={24} strokeWidth={1.8} />
    </Button>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <FacturasTabs actions={acciones}>
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
              <FilterSearchSelect
                name="cliente"
                value={pendingFilters.cliente || "todos"}
                onChange={setFilterValue}
                options={[]}
                placeholder="Seleccionar Cliente"
              />
              <FilterSearchSelect
                name="estado"
                value={pendingFilters.estado || "todos"}
                onChange={setFilterValue}
                options={[]}
                placeholder="Seleccionar Estado"
              />
              <FilterSearchSelect
                name="Forma de Pago"
                value={pendingFilters.formaDePago || "todos"}
                onChange={setFilterValue}
                options={[]}
                placeholder="Seleccionar Forma de Pago"
              />
            </DataFilters>
          </div>

          {/* Aquí se renderiza la tabla con los datos */}
          <DataTable
            columns={getColumns({ tipo: "Factura", esPagado: false })}
            data={filteredDataSinPagoAutomatica}
            showSelection={false}
            isLoading={false}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            showPagination={true}
          />
        </FacturasTabs>
      </div>
    </main>
  );
}

export default page;
