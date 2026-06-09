"use client";

import { useSearchParams } from "next/navigation";

import SummaryCards from "../components/summaryCards";
import TabsBar from "../components/tabsBar";
import FilterBar from "../components/filterBar";
import DataTable from "../tables/dataTable";
import { Suspense, useState } from "react";

function IngresoContent() {
    const searchParams = useSearchParams();

    const filters = {
        fechaInicio: searchParams.get("fechaInicio") || "",
        fechaFin: searchParams.get("fechaFin") || "",
        marca: searchParams.get("marca") || "",
        estado: searchParams.get("estado") || "",
        search: searchParams.get("search") || "",
    }
    return (
        <main className="min-h-screen bg-gray-100 space-y-6">
            <div className="pl-5 pr-5 mt-5">
                <SummaryCards />

                <div className="bg-white p-6 rounded shadow space-y-4">

                    <TabsBar />

                    <FilterBar type="ingreso" />

                    <DataTable
                        type="ingreso"
                        filters={filters}
                    />
                </div>
            </div>
        </main>
    );
}

export default function IngresoPage() {
    return (
        <Suspense fallback={<div>Cargando</div>}>
            <IngresoContent />
        </Suspense>
    )
}