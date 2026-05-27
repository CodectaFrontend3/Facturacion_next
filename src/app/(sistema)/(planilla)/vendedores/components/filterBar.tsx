"use client";
import { useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterSearch } from "../../../../../components/DataFilters/FilterSearch"
import { DataFilters } from "../../../../../components/DataFilters/DataFilters"

import VendedorEditModal from "./VendedorEditModal"

type TableType = "vendedores"

export default function VendedoresFilterBar({ type }: { type: TableType }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const vendedorDemo = {
        "item": 1,
        "codigo_c": "VEN-001",
        "codigo_bf": "BF-784512",
        "tipo": "Interno",
        "costo": 1500,
        "estado": "Activo",
        "comision": 100,
        "liquidacion": "Pendiente",
        "observacion": "Sin incidencias"
    };

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
                <div className="flex flex-row gap-3 items-center">
                    <p>Saldo a pagar</p>
                    <p className="border border-gray-300 px-5 py-1.5 transition-all duration-200 hover:translate-y-[-2px] cursor-pointer">6.73</p>
                    <p className="border border-gray-300 px-5 py-1.5 transition-all duration-200 hover:translate-y-[-2px] cursor-pointer">751</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="self-end bg-[#23c6c8] text-white rounded px-5 py-2 cursor-pointer hover:translate-y-[-3px] transition duration-300 hover:shadow-[0_4px_30px_rgb(0,0,0,0.15)]"
                    >
                        Editar vendedor
                    </button>
                </div>
                <FilterSearch
                    name="search"
                    placeholder="Buscar"
                    value={filters.search}
                    onChange={handleFilterChange}
                />
            </DataFilters>

            {isOpen &&
                <VendedorEditModal
                    onClose={() => setIsOpen(false)} vendedor={vendedorDemo} />
            }
        </div>
    );
}