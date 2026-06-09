"use client";

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import VendedoresFilterBar from "./components/filterBar"
import VendedoresTable from "../tables/vendedor/VendedorTable"
import VendedorCard from "./components/vendedorCard"

import vendedoresData from "../data/vendedor/vendedores.json"

function VendedorContent() {
  const searchParams = useSearchParams();
  const [vendedores, setVendedores] = useState(vendedoresData);

  const filters = {
    search: searchParams.get("search") || "",
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="pl-5 pr-5 mt-5 flex gap-5">
        <div className="w-[240px] border-r border-gray-200 bg-white">
          {vendedores.map((vendedor) => (
            <VendedorCard
              key={vendedor.item}
              header={vendedor.codigo_c}
              correo={vendedor.codigo_bf}
              document={String(vendedor.item)}
              tipo={vendedor.tipo}
              porcentaje={vendedor.comision}
            />
          ))}
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
