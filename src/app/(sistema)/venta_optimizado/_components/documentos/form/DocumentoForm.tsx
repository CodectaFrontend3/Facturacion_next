// _components/documentos/form/DocumentoForm.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentFormTemplate } from "@/components/shared/DocumentFormTemplate"
import { ActionButton } from "@/components/common/ActionButton"
import { Save } from "lucide-react"
import { showToast } from "@/components/shared/custom-toast"

import { useVentasContext } from "../../../VentasContext"
import { useDocumentoForm } from "../../../_hooks/useDocumentoForm"
import { DocumentoTipo } from "../../../_domain/types/shared.types"
import { catalogoService } from "../../../_services/catalogoService"
import { AlmacenDetalle, ComisionistaDetalle, TipoOperacionDetalle, ArticuloDetalle } from "../../../_domain/types/catalogo.types"

import { ClienteModal } from "../../clientes/ClienteModal"
import { ArticuloSelectorModal } from "./ArticuloSelectorModal"
import { ClienteSelector } from "./sections/ClienteSelector"
import { CondicionesSection, CondicionesValues } from "./sections/CondicionesSection"
import { ArticulosTable } from "./sections/ArticulosTable"
import { TotalesSection } from "./sections/TotalesSection"

// Título y ruta de retorno según el tipo de documento
const CONFIG_POR_TIPO: Record<DocumentoTipo, { titulo: string; rutaLista: string }> = {
  cotizacion: { titulo: "Generar Cotización", rutaLista: "/venta_optimizado/cotizacion" },
  cotizacion_manual: { titulo: "Generar Cotización Manual", rutaLista: "/venta_optimizado/cotizacion_manual" },
  nota_venta: { titulo: "Generar Nota de Venta", rutaLista: "/venta_optimizado/nota_venta" },
}

const VALORES_INICIALES: CondicionesValues = {
  validez: "1 DIA",
  tipoOperacionId: "",
  almacenId: "",
  observacion: "Emitimos el siguiente documento a vuestra solicitud",
  comisionistaId: "",
  tipoDocumento: "Boleta",
  moneda: "soles",
  garantia: "6 MESES",
  formaPago: "Contado",
}

interface DocumentoFormProps {
  tipo: DocumentoTipo
}

export function DocumentoForm({ tipo }: DocumentoFormProps) {
  const router = useRouter()
  const { clientes } = useVentasContext()
  const config = CONFIG_POR_TIPO[tipo]

  // --- Catálogos auxiliares (almacenes, comisionistas, tipo de operación) ---
  const [almacenes, setAlmacenes] = useState<AlmacenDetalle[]>([])
  const [comisionistas, setComisionistas] = useState<ComisionistaDetalle[]>([])
  const [tiposOperacion, setTiposOperacion] = useState<TipoOperacionDetalle[]>([])
  const [articulosMaster, setArticulosMaster] = useState<ArticuloDetalle[]>([])
  const [catalogosLoading, setCatalogosLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    Promise.all([
      catalogoService.getAlmacenes(),
      catalogoService.getComisionistas(),
      catalogoService.getTiposOperacion(),
      catalogoService.getArticulos(),
    ]).then(([alm, com, top, art]) => {
      if (!isMounted) return
      setAlmacenes(alm)
      setComisionistas(com)
      setTiposOperacion(top)
      setArticulosMaster(art)
      setCatalogosLoading(false)
    })
    return () => { isMounted = false }
  }, [])

  // --- Estado del formulario (items + renovación + totales) ---
  const { items, renovacion, totals, actions } = useDocumentoForm({ tipo, articulosMaster })

  // --- Cliente seleccionado ---
  const [selectedClienteId, setSelectedClienteId] = useState("")
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)

  // --- Condiciones del documento (campos variables del topForm) ---
  const [condiciones, setCondiciones] = useState<CondicionesValues>(VALORES_INICIALES)
  const handleCondicionChange = (field: keyof CondicionesValues, value: string) => {
    setCondiciones((prev) => ({ ...prev, [field]: value }))
  }

  // --- Modal de selección de artículo ---
  const [isArticuloModalOpen, setIsArticuloModalOpen] = useState(false)

  const handleAddArticulo = (articuloId: string, qty: number) => {
    const filaVacia = items.find((item) => !item.articuloId)
    if (filaVacia) {
      actions.updateItem(filaVacia.id, "articuloId", articuloId)
      actions.updateItem(filaVacia.id, "cantidad", qty)
    } else {
      actions.addItem(articuloId, qty)
    }
  }

  const handleClose = () => router.push(config.rutaLista)

  const handleGuardar = (finalizar: boolean) => {
    if (!selectedClienteId) {
      showToast("Debe seleccionar un cliente antes de guardar", 3)
      return
    }
    const itemsValidos = items.filter((item) => item.articuloId)
    if (itemsValidos.length === 0) {
      showToast("Agregue al menos un artículo al documento", 3)
      return
    }

    // TODO: reemplazar por la llamada real al servicio (documentoService.crear...)
    console.log("Guardar documento", {
      tipo,
      clienteId: selectedClienteId,
      condiciones,
      items: itemsValidos,
      renovacion,
      totals,
      finalizar,
    })

    showToast(
      finalizar ? "Documento guardado y finalizado correctamente" : "Documento guardado correctamente",
      1
    )

    if (finalizar) handleClose()
  }

  if (catalogosLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Cargando catálogos...
      </div>
    )
  }

  return (
    <div className=" bg-[#f5f5f5]">
      <DocumentFormTemplate
        title={config.titulo}
        onClose={handleClose}
        topForm={
          <CondicionesSection
            tipo={tipo}
            values={condiciones}
            onChange={handleCondicionChange}
            almacenes={almacenes}
            comisionistas={comisionistas}
            tiposOperacion={tiposOperacion}
            renovacion={tipo !== "nota_venta" ? renovacion : undefined}
            onRenovacionChange={tipo !== "nota_venta" ? actions.setRenovacion : undefined}
            clienteSelector={
              <ClienteSelector
                clientes={clientes}
                value={selectedClienteId}
                onChange={setSelectedClienteId}
                onAddClienteClick={() => setIsClienteModalOpen(true)}
              />
            }
          />
        }
        tableBody={
          <ArticulosTable
            tipo={tipo}
            items={items}
            articulosMaster={articulosMaster}
            onUpdate={actions.updateItem}
            onRemove={actions.removeItem}
            onAddEmpty={() => setIsArticuloModalOpen(true)}
          />
        }
        summarySection={
          <TotalesSection {...totals} hideIgv={tipo === "nota_venta"} />
        }
        actions={
          <div className="flex gap-3">
            <ActionButton
              text="Guardar"
              variant="outline"
              icon={<Save className="w-4 h-4" />}
              onClick={() => handleGuardar(false)}
            />
            <ActionButton
              text="Guardar y Finalizar"
              variant="filled"
              icon={<Save className="w-4 h-4" />}
              onClick={() => handleGuardar(true)}
            />
          </div>
        }
      />

      <ClienteModal
        isOpen={isClienteModalOpen}
        onClose={() => setIsClienteModalOpen(false)}
        onSave={() => setIsClienteModalOpen(false)}
      />

      <ArticuloSelectorModal
        isOpen={isArticuloModalOpen}
        onClose={() => setIsArticuloModalOpen(false)}
        onAdd={handleAddArticulo}
        articulosMaster={articulosMaster}
      />
    </div>
  )
}
