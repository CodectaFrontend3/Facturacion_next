// (routes)/cotizacion/[id]/page.tsx
import { DocumentoDetail } from "../../../_components/documentos/detail/DocumentoDetail"

// Next.js 15+: params llega como Promise, hay que resolverlo con await
export default async function CotizacionDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DocumentoDetail tipo="cotizacion" id={id} />
}
