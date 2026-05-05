"use client";
import { useState } from "react";
import { useDateRangeFilter } from "@/hooks/useDateRangeFilter";
import { FilterSelect, SelectOption } from "../../filters/FilterSelect";
import { marcaOptions, estadoIngresoOptions, estadoEgresoOptions } from "../../filters/selectOptions";
import { FilterSearch } from "../../filters/FilterSearch";
import { DataFilters } from "../../filters/DataFilters";
import { FilterDateRange } from "../../filters/FilterDateRange";

type TableType = "ingreso" | "egreso" | "tecnico";

export default function FilterBar({ type }: { type: TableType }) {
    const [filters, setFilters] = useState<Record<string, string>>({
        fechaInicio: "",
        fechaFin: "",
        marca: "",
        estado: "",
        search: "",
    }); 

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const estadoOptionsByType: Record<TableType, SelectOption[]> = {
        ingreso: estadoIngresoOptions,
        egreso: estadoEgresoOptions,
        tecnico: [],
    };

    const handleFilterChange = (name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        setAppliedFilters(filters);
    };

    return (
        <div className="flex flex-col gap-4 text-gray-500 border-t border-l border-r border-gray-200 p-5 mb-0">
            <DataFilters
                onSearch={handleSearch}
                onReset={handleSearch}
            >

                <FilterDateRange 
                    nameFrom="fechaInicio"
                    nameTo="fechaFin"
                    valueFrom={filters.fechaInicio}
                    valueTo={filters.fechaFin}
                    onChange={handleFilterChange}
                />

                <FilterSelect
                    name="marca"
                    value={filters.marca}
                    onChange={handleFilterChange}
                    options={marcaOptions}
                />

                {type !== "tecnico" && (
                    <FilterSelect
                        name="estado"
                        value={filters.estado}
                        onChange={handleFilterChange}
                        options={estadoOptionsByType[type]}
                    />
                )}

                <FilterSearch
                    name="search"
                    placeholder="Buscar"
                    value={filters.search}
                    onChange={handleFilterChange}
                />

            </DataFilters>
        </div>
    );
}