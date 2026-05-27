"use client";

import { useSearchParams } from "next/navigation";

import TabsBar from "../components/tabsBar";
import VehiculoFilterBar from "../components/filterBar";
import VehiculoTable from "../../tables/vehiculo/VehiculoTable";
import { Suspense } from "react";

function VehiculoPrivadoContent() {
    const searchParams = useSearchParams();

    const filters = {
        search: searchParams.get("search") || "",
    };

    return (
        <main className="min-h-screen bg-gray-100 space-y-6">
            <div className="pl-5 pr-5 mt-5">
                <div className="bg-white p-6 rounded shadow space-y-4">
                    <TabsBar />
                    <VehiculoFilterBar type="privado" />
                    <VehiculoTable
                        type="privado"
                        filters={filters}
                    />
                </div>
            </div>
        </main>
    );
}

export default function VehiculoPrivadoPage() {
    return (
        <Suspense fallback={<div>Cargando</div>}>
            <VehiculoPrivadoContent />
        </Suspense>
    )
}