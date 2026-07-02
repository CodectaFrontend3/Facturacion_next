"use client";

import { Button } from "@/components/ui/button";
import FacturasManualTabs from "../../../components/facturas_manuales/FacturasManualTabs";
import { useFacturaTable } from "../../../hooks/useFacturaTable";
import { Banknote } from "lucide-react";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "../../../components/facturas/table/Column";

function page() {
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
    filteredDataSinPagoManual,
  } = useFacturaTable([]); // Usamos el hook para obtener los datos y funciones de filtrado

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
        <FacturasManualTabs actions={acciones}>
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
            columns={columns}
            data={filteredDataSinPagoManual}
            showSelection={false}
            isLoading={false}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            showPagination={true}
          />
        </FacturasManualTabs>
      </div>
    </main>
  );
}

export default page;
