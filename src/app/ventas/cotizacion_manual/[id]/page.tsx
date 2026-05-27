"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/ventas/components/DocumentDetailView"
import cotizacionManualData from "../../data/cotizacion_manual.json"
import { mapCotizacionManualDetail, type VentaDocumentRawRow } from "../../utils/mapDocumentDetail"

export default function CotizacionManualDetailPage() {
  const { id } = useParams()
  const row = (cotizacionManualData as VentaDocumentRawRow[]).find(
    (item) => String(item.id) === String(id)
  )

  if (!row) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Cotización no encontrada.
      </div>
    )
  }

  return <DocumentDetailView variant="cotizacion" data={mapCotizacionManualDetail(row)} />
}
