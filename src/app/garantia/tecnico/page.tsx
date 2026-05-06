"use client";

import SummaryCards from "@/app/garantia/components/SummaryCards";
import TabsBar from "@/app/garantia/components/tabsBar";
import FilterBar from "../components/filterBar";
import DataTable from "../tables/dataTable";

export default function TecnicoPage() {
    return (
        <main className="min-h-screen bg-gray-100 space-y-6">
            <div className="pl-5 pr-5 mt-5">

                <SummaryCards />

                <div className="bg-white p-6 rounded shadow space-y-4">

                    <TabsBar />

                    <FilterBar type="tecnico" />

                    <DataTable type="tecnico" />

                </div>
            </div>
        </main>
    );
}