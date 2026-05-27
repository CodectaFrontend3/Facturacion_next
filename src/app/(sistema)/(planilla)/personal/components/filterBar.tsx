"use client";
import { useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FilterDateRange } from "../../../../../components/DataFilters/FilterDateRange";
import { FilterSearch } from "../../../../../components/DataFilters/FilterSearch";
import { DataFilters } from "../../../../../components/DataFilters/DataFilters";

type TableType = "activos" | "inactivos"

export default function FilterBar({ type }: { type: TableType }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);

        Object.entries(filters).forEach(([Key, value]) => {
            if (value) {
                params.set(Key, value);
            } else {
                params.delete(Key);
            }
        });

        router.push(`${pathname}?${params.toString()}`);
    };

    const [filters, setFilters] = useState<Record<string, string>>({
        fechaInicio: "",
        fechaFin: "",
        search: "",
    });

    const handleFilterChange = (name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        const empty = {
            fechaInicio: "",
            fechaFin: "",
            search: "",
        };

        setFilters(empty);

        router.push(pathname);
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