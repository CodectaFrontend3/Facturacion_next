// (routes)/nota_venta/[id]/page.tsx
import { DocumentoDetail } from "../../../_components/documentos/detail/DocumentoDetail"

export default async function NotaVentaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DocumentoDetail tipo="nota_venta" id={id} />
}
