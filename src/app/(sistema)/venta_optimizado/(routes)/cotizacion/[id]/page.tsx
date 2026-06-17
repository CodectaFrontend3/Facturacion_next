"use client"

import { useRouter } from "next/navigation"

export default function CotizacionDetalleePage() {
  const router = useRouter()

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-200 rounded">
        Atrás
      </button>
      <h1 className="text-2xl font-bold">Detalle de Cotización</h1>
      <p className="text-gray-500 mt-2">Página de detalle en construcción</p>
    </div>
  )
}
