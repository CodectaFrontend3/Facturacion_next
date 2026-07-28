"use client";

import { useSearchParams } from "next/navigation";

import SummaryCards from "../components/summaryCards"
import TabsBar from "../components/tabsBar"
import FilterBar from "../components/filterBar"
import DataTable from "../tables/dataTable"
import { Suspense } from "react";

function EgresoContent() {
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
            <div className="pl-5 pr-5 mt-5 pb-5">
                <SummaryCards />

                <section className="bg-white rounded-md border border-gray-200 shadow-sm p-5">
                    <div className="w-full">
                        <TabsBar type="egreso" />

                        <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-b-sm">
                            <FilterBar type="egreso" />
                            <div className="bg-white fixed-table custom-checkbox-table">
                                <DataTable
                                    type="egreso"
                                    filters={filters}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default function EgresoPage() {
    return (
        <Suspense fallback={<div>Cargando</div>}>
            <EgresoContent />
        </Suspense>
    )
}