"use client"

import { useParams } from "next/navigation"
import { DocumentDetailView } from "@/app/(sistema)/ventas/_components/legacy/DocumentDetailView"
import {
  mapNotaVentaDetail,
  normalizeCotizacionRawRow,
} from "@/app/(sistema)/ventas/_utils/legacy/mapDocumentDetail"
import clientesData from "@/app/(sistema)/ventas/data/cliente-mock.json"
import notasVentaData from "@/app/(sistema)/ventas/data/notas-venta-mock.json"

export default function NotaVentaDetailPage() {
  const { id } = useParams()
  const nota = notasVentaData.find((item) => String(item.id) === String(id))

  if (!nota) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Nota de venta no encontrada.
      </div>
    )
  }

  const cliente = clientesData.find(
    (item) => String(item.id) === String(nota.clienteId)
  )
  const total = nota.items.reduce(
    (sum, item) => sum + item.cantidad * item.precioAsignado,
    0
  )
  const simbolo = nota.moneda.toLowerCase().includes("dolar") ? "$" : "S/"

  const normalized = normalizeCotizacionRawRow({
    ...nota,
    clienteNombre: cliente?.nombre ?? "",
    rucDni: cliente?.numeroDocumento ?? "",
    items: nota.items.map((item) => ({
      ...item,
      codigo: item.articuloId,
      precioUnitario: item.precioAsignado,
      total: item.cantidad * item.precioAsignado,
    })),
    totales: {
      subtotal: total,
      igv: 0,
      total,
    },
  })

  normalized.importeT = `${simbolo} ${total.toFixed(2)}`

  return (
    <DocumentDetailView
      variant="nota-venta"
      data={mapNotaVentaDetail(normalized)}
      useActionButtons
    />
  )
}
