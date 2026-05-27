"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/ventas/components/DocumentDetailView"
import renovacionData from "../../data/renovacion.json"
import { mapRenovacionDetail, type VentaDocumentRawRow } from "../../utils/mapDocumentDetail"

export default function RenovacionDetailPage() {
  const { id } = useParams()
  const row = (renovacionData as VentaDocumentRawRow[]).find(
    (item) => String(item.id) === String(id)
  )

  if (!row) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Cotización no encontrada.
      </div>
    )
  }

  return <DocumentDetailView variant="cotizacion" data={mapRenovacionDetail(row)} />
}
