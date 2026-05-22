"use client";

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import VendedoresFilterBar from "./components/filterBar"
import VendedoresTable from "../tables/vendedor/VendedorTable"
import VendedorCard from "./components/vendedorCard";

function VendedorContent() {
  const searchParams = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="pl-5 pr-5 mt-5 flex gap-5">
        <div className="inline">
          <VendedorCard
            header="VE001-Demo Demo"
            document="0000000"
            correo="abc@gmail.com"
            tipo="Interno"
            porcentaje={100}
          />

          <VendedorCard
            header="VE001-Demo Demo"
            document="0000000"
            correo="abc@gmail.com"
            tipo="Interno"
            porcentaje={100}
          />
        </div>
        <div className="flex-1">
          <div className="bg-white p-6 rounded shadow space-y-4">
            <VendedoresFilterBar type="vendedores" />

            <div>
              <VendedoresTable filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VendedorPage() {
  return (
    <Suspense fallback={<div>Cargando</div>}>
      <VendedorContent />
    </Suspense>
  );
}