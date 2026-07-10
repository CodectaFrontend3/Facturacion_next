"use client";

import { DataTable } from "@/components/shared/DataTable";
import FacturasManualTabs from "../../../components/facturas/facturas_manuales/FacturasManualTabs";
import { getColumns } from "../../../components/Columns";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { useComprobanteTable } from "../../../hooks/useComprobanteTable";
import Facturas from "../../../data/facturas.json";
import { ComprobanteBase } from "../../../types/ComprobanteBase";

const FacturasData = Facturas as ComprobanteBase[];
const FacturasDataPagadas = FacturasData.filter((b) => b.estado === "Pagado");

function page() {
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
    filteredData,
    clientesOptions,
    estadosOptions,
    formasDePagoOptions,
  } = useComprobanteTable({ data: FacturasDataPagadas, tipo: "Factura" }); // Usamos el hook para obtener los datos y funciones de filtrado

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <FacturasManualTabs>
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
                options={clientesOptions}
                placeholder="Seleccionar Cliente"
              />
              <FilterSearchSelect
                name="estado"
                value={pendingFilters.estado || "todos"}
                onChange={setFilterValue}
                options={estadosOptions}
                placeholder="Seleccionar Estado"
              />
              <FilterSearchSelect
                name="formaPago"
                value={pendingFilters.formaPago || "todos"}
                onChange={setFilterValue}
                options={formasDePagoOptions}
                placeholder="Seleccionar Forma de Pago"
              />
            </DataFilters>
          </div>

          {/* Aquí se renderiza la tabla con los datos */}
          <DataTable
            columns={getColumns({ tipo: "Factura", esPagado: true })} // Pasamos el tipo de comprobante para obtener las columnas correctas
            data={filteredData}
            showSelection={true}
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
