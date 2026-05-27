"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/ventas/components/DocumentDetailView"
import notaVentaData from "../../data/nota_venta.json"
import { mapNotaVentaDetail, type VentaDocumentRawRow } from "../../utils/mapDocumentDetail"

export default function NotaVentaDetailPage() {
  const { id } = useParams()
  const row = (notaVentaData as VentaDocumentRawRow[]).find(
    (item) => String(item.id) === String(id)
  )

  if (!row) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Nota de venta no encontrada.
      </div>
    )
  }

  return <DocumentDetailView variant="nota-venta" data={mapNotaVentaDetail(row)} />
}
