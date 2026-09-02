"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/(sistema)/ventas/_components/legacy/DocumentDetailView"
import cotizacionData from "@/app/(sistema)/ventas/data/legacy/cotizacion.json"
import { mapCotizacionManualDetail, normalizeCotizacionRawRow } from "@/app/(sistema)/ventas/_utils/legacy/mapDocumentDetail"

export default function CotizacionManualDetailPage() {
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

  return <DocumentDetailView variant="cotizacion-manual" data={mapCotizacionManualDetail(normalizeCotizacionRawRow(rawRow))} useActionButtons />
}
