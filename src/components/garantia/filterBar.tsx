"use client";
import DateRangeInput from "./dateRange";

type TableType = "ingreso" | "egreso" | "tecnico";

export default function FilterBar({ type }: { type: TableType }) {
    const filtersByType: Record<TableType, string[]> = {
        ingreso: ["estado1"],
        egreso: ["estado2"],
        tecnico: [],
    };

    const filterOptions: Record<string, string[]> = {
        estado1: ["Todos", "Egresados", "Sin egresar", "Anulados"],
        estado2: ["Procesado", "Sin procesar"],
    };

    return (
        <div className="flex flex-col gap-4 text-gray-500 border-t border-l border-r border-gray-200 p-5 mb-0">
            <div className="flex w-full gap-5 items-end">
                <DateRangeInput />

                <select className="flex-1 border p-2.5 rounded">
                    <option>LENOVO</option>
                    <option>SAMSUNG</option>
                </select>

                {filtersByType[type].map((filter) => (
                    <select key={filter} className="flex-1 border p-2.5 rounded">
                        {filterOptions[filter]?.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                ))}
                
                <input placeholder="Buscar" className="flex-1 border border-gray-400 p-2 rounded"/>
                <button className="search-btn flex-1 bg-blue-700 text-white p-2 px-4 rounded">Buscar</button>
            </div>
        </div>
    );
}