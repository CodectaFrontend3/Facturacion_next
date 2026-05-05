"use client";
import { useState } from "react";

import { FilterDateRange } from "../../filters/FilterDateRange";
import { FilterSearch } from "../../filters/FilterSearch";
import { FilterSelect, SelectOption } from "../../filters/FilterSelect";
import { DataFilters } from "../../filters/DataFilters";

import { marcaOptions, estadoIngresoOptions, estadoEgresoOptions } from "../../filters/selectOptions";

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

    const handleReset = () => {
        const empty = {
            fechaInicio: "",
            fechaFin: "",
            marca: "",
            estado: "",
            search: "",
        };

        setFilters(empty);
        setAppliedFilters(empty);
    };

    return (
        <div className="flex flex-col gap-4 text-gray-500 border-t border-l border-r border-gray-200 p-5 mb-0">
            <DataFilters
                onSearch={handleSearch}
                onReset={handleReset}
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