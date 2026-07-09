"use client";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import NotaVentaTabs from "../../../components/nota_venta/NotaVentaTabs";
import { useComprobanteTable } from "../../../hooks/useComprobanteTable";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { DataTable } from "@/components/shared/DataTable";
import { getColumns } from "../../../components/Columns";

import NotaVenta from "../../../data/notas_venta.json";
import { ComprobanteBase } from "../../../types/ComprobanteBase";

const NotaVentaData = NotaVenta as ComprobanteBase[];
const NotaVentaPagado = NotaVentaData.filter((b) => b.estado === "Pagado");

function page() {
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
    filteredData,
  } = useComprobanteTable({ data: NotaVentaPagado, tipo: "NotaVenta" }); // Usamos el hook para obtener los datos y funciones de filtrado

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <NotaVentaTabs>
          {/* Filtros */}
          <div className="flex items-center mb-4">
            <div className="w-full max-w-2xl">
              {" "}
              <DataFilters onSearch={applyFilters} onReset={resetFilters}>
                <FilterDateRange
                  nameFrom="fechaDesde"
                  nameTo="fechaHasta"
                  valueFrom={pendingFilters.fechaDesde}
                  valueTo={pendingFilters.fechaHasta}
                  onChange={setFilterValue}
                />
              </DataFilters>
            </div>
          </div>

          {/* Aquí se renderiza la tabla con los datos */}
          <DataTable
            columns={getColumns({ tipo: "NotaVenta", esPagado: true })} // Pasamos el tipo de comprobante para obtener las columnas correctas
            data={filteredData}
            showSelection={false}
            isLoading={false}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            showPagination={true}
          />
        </NotaVentaTabs>
      </div>
    </main>
  );
}

export default page;
