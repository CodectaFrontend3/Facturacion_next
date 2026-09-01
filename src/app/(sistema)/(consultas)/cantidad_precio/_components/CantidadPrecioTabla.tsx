"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { cantidadPrecioColumns } from "./cantidadPrecioColumns";
import { mockCantidadPrecioData } from "../_data/mockCantidadPrecio";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";

export function CantidadPrecioTabla() {
  const pathname = usePathname();
  const activeTab: "producto" | "servicio" = pathname.includes("/servicio")
    ? "servicio"
    : "producto";

  // Estado de filtros (igual que garantia/ventas)
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  // Término aplicado tras click en "Buscar"
  const [appliedFilters, setAppliedFilters] = useState({
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setAppliedFilters({ ...filters });
  };

  const handleReset = () => {
    const empty = { dateFrom: "", dateTo: "", search: "" };
    setFilters(empty);
    setAppliedFilters(empty);
  };

  const productosCount = useMemo(
    () => mockCantidadPrecioData.filter((item) => item.tipo === "producto").length,
    []
  );
  const serviciosCount = useMemo(
    () => mockCantidadPrecioData.filter((item) => item.tipo === "servicio").length,
    []
  );

  const filteredData = useMemo(() => {
    return mockCantidadPrecioData.filter((item) => {
      if (item.tipo !== activeTab) return false;
      if (!appliedFilters.search) return true;
      const term = appliedFilters.search.toLowerCase();
      return (
        item.codigoProducto.toLowerCase().includes(term) ||
        item.nombre.toLowerCase().includes(term) ||
        item.marca.toLowerCase().includes(term) ||
        item.garantia.toLowerCase().includes(term)
      );
    });
  }, [activeTab, appliedFilters]);

  return (
    <section className="bg-white rounded-none border border-gray-200 shadow-sm p-5">
      <div className="w-full">
        {/* Pestañas con navegación de rutas */}
        <div className="flex items-end justify-between border-b border-gray-200 w-full text-gray-500">
          <div className="flex items-center">
            <Link
              href="/cantidad_precio"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all relative top-[1px] ${
                activeTab === "producto"
                  ? "bg-white border-x border-t border-gray-200 text-gray-800 rounded-none"
                  : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-none text-white text-[10px] bg-[#E50914] font-bold">
                {productosCount}
              </span>
              Productos
            </Link>

            <Link
              href="/cantidad_precio/servicio"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all relative top-[1px] ${
                activeTab === "servicio"
                  ? "bg-white border-x border-t border-gray-200 text-gray-800 rounded-none"
                  : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-none text-white text-[10px] bg-[#F59E0B] font-bold">
                {serviciosCount}
              </span>
              Servicios
            </Link>
          </div>
        </div>

        {/* Filtros usando DataFilters (igual que garantia/ventas) */}
        <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-none">
          <DataFilters onSearch={handleSearch} onReset={handleReset}>
            <FilterDateRange
              nameFrom="dateFrom"
              nameTo="dateTo"
              valueFrom={filters.dateFrom}
              valueTo={filters.dateTo}
              onChange={handleFilterChange}
            />
            <FilterSearch
              name="search"
              placeholder="Buscar"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </DataFilters>

          {/* Tabla de Datos */}
          <div className="bg-white overflow-x-auto">
            <DataTable
              columns={cantidadPrecioColumns}
              data={filteredData}
              pageSize={10}
              showSelection={false}
              showPagination={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
