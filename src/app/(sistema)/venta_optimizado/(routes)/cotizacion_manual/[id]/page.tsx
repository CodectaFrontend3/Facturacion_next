// (routes)/cotizacion_manual/[id]/page.tsx
import { DocumentoDetail } from "../../../_components/documentos/detail/DocumentoDetail"

export default async function CotizacionManualDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DocumentoDetail tipo="cotizacion_manual" id={id} />
}
