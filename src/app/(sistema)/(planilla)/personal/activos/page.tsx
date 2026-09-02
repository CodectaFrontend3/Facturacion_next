"use client";

import { useSearchParams } from "next/navigation";

import TabsBar from "../components/tabsBar";
import FilterBar from "../components/filterBar";
import PersonalTable from "../../tables/personal/PersonalTable";
import { Suspense } from "react";

function PersonalActivoContent() {
    const searchParams = useSearchParams();

    const filters = {
        fechaInicio: searchParams.get("fechaInicio") || "",
        fechaFin: searchParams.get("fechaFin") || "",
        search: searchParams.get("search") || "",
    };

    return (
        <main className="min-h-screen bg-gray-100 space-y-6">
            <div className="pl-5 pr-5 mt-5">
                <div className="bg-white p-6 rounded shadow space-y-4">
                    <TabsBar />
                    <FilterBar type="activos" />
                    <PersonalTable
                        type="activos"
                        filters={filters}
                    />
                </div>
            </div>
        </main>
    );
}

export default function PersonalActivoPage() {
    return (
        <Suspense fallback={<div>Cargando</div>}>
            <PersonalActivoContent />
        </Suspense>
    )
}