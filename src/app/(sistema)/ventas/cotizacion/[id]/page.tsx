"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/(sistema)/ventas/components/DocumentDetailView"
import cotizacionData from "../../data/cotizacion.json"
import { mapCotizacionDetail, normalizeCotizacionRawRow } from "../../utils/mapDocumentDetail"

export default function CotizacionDetailPage() {
  const { id } = useParams()
  const rawRow = (cotizacionData as any[]).find(
    (item) => String(item.id) === String(id)
  )

  if (!rawRow) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Cotización no encontrada.
      </div>
    )
  }

  return <DocumentDetailView variant="cotizacion" data={mapCotizacionDetail(normalizeCotizacionRawRow(rawRow))} />
}
