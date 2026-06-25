// _components/documentos/detail/DocumentoDetail.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentDetailTemplate } from "@/components/shared/DocumentDetailTemplate"
import { showToast } from "@/components/shared/custom-toast"
import { ConfirmModal } from "../../shared/ConfirmModal"

import { documentoService } from "../../../_services/documentoService"
import { clienteService } from "../../../_services/clienteService"
import { catalogoService } from "../../../_services/catalogoService"

import {
  calcularTotalesCotizacion,
  calcularTotalesCotizacionManual,
  calcularTotalesNotaVenta,
  calcularFechaVencimiento,
  calcularDiasRestantes,
} from "../../../_utils/calculations"
import { simboloDesdeMoneda } from "../../../_utils/format"
import { areIdsEqual } from "../../../_utils/idNormalizer"
import { mapToClienteFilaLista } from "../../../_domain/mappers"
import { getEmpresaConfig, getEmpresaLogoUrl, BANCOS_DEFAULT } from "../../../_config/empresa.config"

import { DocumentoTipo } from "../../../_domain/types/shared.types"
import {
  CotizacionDetalle,
  CotizacionManualDetalle,
  NotaVentaDetalle,
} from "../../../_domain/types/documento.types"
import { ArticuloDetalle, ComisionistaDetalle, AlmacenDetalle, TipoOperacionDetalle } from "../../../_domain/types/catalogo.types"
import { ClienteDetalle, ClienteFilaLista } from "../../../_domain/types/cliente.types"

import { HeaderSection } from "./sections/HeaderSection"
import { DocumentInfoSection, CondicionesEditables } from "./sections/DocumentInfoSection"
import { ItemsTable } from "./sections/ItemsTable"
import { TotalesDetailSection } from "./sections/TotalesDetailSection"
import { BancosInfo } from "./sections/BancosInfo"
import { MandatarioSection } from "./sections/MandatarioSection"

// El documento finalizado se marca con este campo extra en memoria.
// No forma parte del dominio persistido — es solo control de UI.
type DocumentoCualquiera = (CotizacionDetalle | CotizacionManualDetalle | NotaVentaDetalle) & {
  _bloqueado?: boolean
}

const TITULOS: Record<DocumentoTipo, string> = {
  cotizacion: "COTIZACIÓN",
  cotizacion_manual: "COTIZACIÓN MANUAL",
  nota_venta: "NOTA DE VENTA",
}

const RUTA_LISTA: Record<DocumentoTipo, string> = {
  cotizacion: "/venta_optimizado/cotizacion",
  cotizacion_manual: "/venta_optimizado/cotizacion_manual",
  nota_venta: "/venta_optimizado/nota_venta",
}

interface DocumentoDetailProps {
  tipo: DocumentoTipo
  id: string
}

export function DocumentoDetail({ tipo, id }: DocumentoDetailProps) {
  const router = useRouter()

  const [documento, setDocumento] = useState<DocumentoCualquiera | null>(null)
  const [cliente, setCliente] = useState<ClienteDetalle | undefined>(undefined)
  const [clientesLista, setClientesLista] = useState<ClienteFilaLista[]>([])
  const [articulosMaster, setArticulosMaster] = useState<ArticuloDetalle[]>([])
  const [comisionistas, setComisionistas] = useState<ComisionistaDetalle[]>([])
  const [almacenes, setAlmacenes] = useState<AlmacenDetalle[]>([])
  const [tiposOperacion, setTiposOperacion] = useState<TipoOperacionDetalle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // --- Modo edición ---
  const [isEditing, setIsEditing] = useState(false)
  const [editItems, setEditItems] = useState<any[]>([])
  const [editValues, setEditValues] = useState<CondicionesEditables | null>(null)
  const [editClienteId, setEditClienteId] = useState("")

  // --- Modales de confirmación (replican el flujo de las capturas) ---
  const [showConfirmFinalizar, setShowConfirmFinalizar] = useState(false)
  const [showCanceladoInfo, setShowCanceladoInfo] = useState(false)
  const [showCerradoInfo, setShowCerradoInfo] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      const [cotizaciones, manuales, notas, clientes, articulos, comisionistasData, almacenesData, tiposOperacionData] = await Promise.all([
        documentoService.getCotizaciones(),
        documentoService.getCotizacionesManuales(),
        documentoService.getNotasVenta(),
        clienteService.getAll(),
        catalogoService.getArticulos(),
        catalogoService.getComisionistas(),
        catalogoService.getAlmacenes(),
        catalogoService.getTiposOperacion(),
      ])

      if (!isMounted) return

      let doc: DocumentoCualquiera | undefined
      if (tipo === "cotizacion") doc = cotizaciones.find((c) => areIdsEqual(c.id, id))
      if (tipo === "cotizacion_manual") doc = manuales.find((c) => areIdsEqual(c.id, id))
      if (tipo === "nota_venta") doc = notas.find((c) => areIdsEqual(c.id, id))

      if (!doc) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setDocumento(doc)
      setCliente(clientes.find((c) => areIdsEqual(c.id, doc!.clienteId)))
      setClientesLista(clientes.map(mapToClienteFilaLista))
      setArticulosMaster(articulos)
      setComisionistas(comisionistasData)
      setAlmacenes(almacenesData)
      setTiposOperacion(tiposOperacionData)
      setIsLoading(false)
    }

    fetchAll()
    return () => { isMounted = false }
  }, [tipo, id])

  // --- Entrar / salir del modo edición ---
  const handleToggleEditar = () => {
    if (!documento || documento._bloqueado) return

    if (!isEditing) {
      // Al entrar a edición: clona items y condiciones actuales como punto de partida
      setEditItems(JSON.parse(JSON.stringify(documento.items)))
      setEditValues({
        formaPago: documento.formaPago,
        validez: "validez" in documento ? documento.validez : "",
        garantia: "garantia" in documento ? documento.garantia : "",
        moneda: documento.moneda,
        tipoDocumento: "tipoDocumento" in documento ? documento.tipoDocumento : "Boleta",
        observacion: documento.observacion ?? "",
        renovacionActiva: "renovacion" in documento ? documento.renovacion.isActive : false,
        fechaRenovacion: "renovacion" in documento ? (documento.renovacion.fechaRenovacion ?? "") : "",
        almacenId: "almacenId" in documento ? documento.almacenId : "",
        tipoOperacionId: "tipoOperacionId" in documento ? documento.tipoOperacionId : "",
      })
      setEditClienteId(documento.clienteId)
      setIsEditing(true)
    } else {
      // Cancelar edición sin guardar (botón ✕ del header)
      setIsEditing(false)
      setEditItems([])
      setEditValues(null)
      setEditClienteId("")
    }
  }

  const handleEditItemChange = (itemId: string, field: string, value: any) => {
    setEditItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item))
    )
  }

  // Agrega una fila vacía al editar — mismo patrón que useDocumentoForm del formulario de creación.
  const handleEditAddEmpty = () => {
    const nuevoItem =
      tipo === "cotizacion"
        ? { id: Math.random().toString(36).substring(2, 9), articuloId: "", descripcion: "", cantidad: 0, descuentoPorcentajeAplicado: false }
        : { id: Math.random().toString(36).substring(2, 9), articuloId: "", descripcion: "", cantidad: 0, precioAsignado: 0 }

    setEditItems((prev) => [...prev, nuevoItem])
  }

  const handleEditRemoveItem = (itemId: string) => {
    setEditItems((prev) => {
      if (prev.length <= 1) return prev // no se permite dejar la tabla sin filas
      return prev.filter((item) => item.id !== itemId)
    })
  }

  const handleEditValuesChange = (field: keyof CondicionesEditables, value: any) => {
    setEditValues((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // Construye el documento actualizado a partir de los datos en edición.
  const construirDocumentoActualizado = (): DocumentoCualquiera | null => {
    if (!documento || !editValues) return null

    const actualizado: any = {
      ...documento,
      items: editItems,
      clienteId: editClienteId || documento.clienteId,
      formaPago: editValues.formaPago,
      moneda: editValues.moneda,
      observacion: editValues.observacion,
    }

    if ("validez" in documento) actualizado.validez = editValues.validez
    if ("garantia" in documento) actualizado.garantia = editValues.garantia
    if ("tipoDocumento" in documento) actualizado.tipoDocumento = editValues.tipoDocumento
    if ("almacenId" in documento) actualizado.almacenId = editValues.almacenId
    if ("tipoOperacionId" in documento) actualizado.tipoOperacionId = editValues.tipoOperacionId
    if ("renovacion" in documento) {
      actualizado.renovacion = {
        isActive: editValues.renovacionActiva,
        fechaRenovacion: editValues.renovacionActiva ? editValues.fechaRenovacion || null : null,
      }
    }

    return actualizado
  }

  // Actualiza también el objeto `cliente` completo cuando el clienteId cambió durante la edición.
  const sincronizarClienteSeleccionado = () => {
    if (editClienteId && !areIdsEqual(editClienteId, documento?.clienteId ?? "")) {
      const nuevoCliente = clientesLista.find((c) => areIdsEqual(c.id, editClienteId))
      if (nuevoCliente) {
        setCliente({
          id: nuevoCliente.id,
          nombre: nuevoCliente.nombre,
          numeroDocumento: nuevoCliente.numeroDocumento,
          tipoDocumento: nuevoCliente.tipoDocumento,
          celular: nuevoCliente.celular,
          correo: nuevoCliente.correo,
          fechaRegistro: nuevoCliente.fechaRegistro,
        } as ClienteDetalle)
      }
    }
  }

  // --- "Guardar" (sin finalizar): persiste en memoria y SALE de edición,
  //     pero el documento sigue editable más adelante. ---
  const handleGuardar = () => {
    const actualizado = construirDocumentoActualizado()
    if (!actualizado) return

    sincronizarClienteSeleccionado()
    setDocumento(actualizado)
    setIsEditing(false)
    setEditItems([])
    setEditValues(null)
    setEditClienteId("")

    showToast("Documento actualizado correctamente", 1)
  }

  // --- "Guardar y Finalizar": pide confirmación primero ---
  const handleGuardarYFinalizarClick = () => {
    setShowConfirmFinalizar(true)
  }

  const handleConfirmarFinalizar = () => {
    const actualizado = construirDocumentoActualizado()
    setShowConfirmFinalizar(false)
    if (!actualizado) return

    // Se marca como bloqueado: a partir de aquí no se puede volver a editar.
    actualizado._bloqueado = true

    sincronizarClienteSeleccionado()
    setDocumento(actualizado)
    setIsEditing(false)
    setEditItems([])
    setEditValues(null)
    setEditClienteId("")

    setShowCerradoInfo(true)
  }

  const handleCancelarFinalizar = () => {
    setShowConfirmFinalizar(false)
    // Los cambios en pantalla se mantienen — no se descartan ni se persisten.
    setShowCanceladoInfo(true)
  }


  // --- Generar Nota de Venta a partir de esta cotización ---
  const handleGenerarNotaVenta = () => {
    if (!documento) return
    showToast("Redirigiendo a Nota de Venta...", 4)
    router.push(`/venta_optimizado/nota_venta/crear?origen=${tipo}&origenId=${documento.id}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Cargando documento...
      </div>
    )
  }

  if (notFound || !documento) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400 text-sm">
        <span>No se encontró el documento solicitado.</span>
        <button onClick={() => router.push(RUTA_LISTA[tipo])} className="text-blue-500 hover:underline">
          Volver a la lista
        </button>
      </div>
    )
  }

  const moneda = isEditing && editValues ? editValues.moneda : documento.moneda
  const currencySymbol = simboloDesdeMoneda(moneda)

  // Comisionista (solo cotización tiene este campo)
  const comisionistaId = "comisionistaId" in documento ? documento.comisionistaId : undefined
  const comisionista = comisionistas.find((c) => areIdsEqual(c.id, comisionistaId))
  const porcentajeComision = comisionista?.porcentajeComision ?? 0
  const comisionistaLabel = comisionista ? `${comisionista.nombre} - ${comisionista.porcentajeComision}%` : undefined

  // Almacén y T. Operación (solo cotización manual; cotización tradicional no los tiene)
  const almacenId = "almacenId" in documento ? documento.almacenId : undefined
  const almacen = almacenes.find((a) => areIdsEqual(a.id, almacenId))
  const almacenLabel = almacen ? `${almacen.codigo} - ${almacen.nombre}` : undefined

  const tipoOperacionId = "tipoOperacionId" in documento ? documento.tipoOperacionId : undefined
  const tipoOperacion = tiposOperacion.find((t) => areIdsEqual(t.id, tipoOperacionId))
  const tipoOperacionLabel = tipoOperacion ? `${tipoOperacion.codigo} - ${tipoOperacion.nombre}` : undefined

  // Items vigentes: los editados en memoria si está en modo edición, o los originales
  const itemsVigentes = isEditing ? editItems : documento.items

  // Totales recalculados en vivo según los items vigentes
  const totals = useMemo(() => {
    // Filtramos filas sin artículo seleccionado (recién agregadas en modo edición)
    // para no disparar el warning de integridad de calculations.ts.
    const itemsConArticulo = (itemsVigentes as any[]).filter((item) => item.articuloId)

    if (tipo === "cotizacion") {
      return calcularTotalesCotizacion(itemsConArticulo, articulosMaster, porcentajeComision)
    }
    if (tipo === "cotizacion_manual") {
      return calcularTotalesCotizacionManual(itemsConArticulo)
    }
    return calcularTotalesNotaVenta(itemsConArticulo)
  }, [tipo, itemsVigentes, articulosMaster, porcentajeComision])

  // Renovación (solo cotización / cotización_manual)
  const renovacion = "renovacion" in documento ? documento.renovacion : undefined

  // F. Vencimiento: fechaEmision + validez, independiente de si hay renovación activa.
  const fechaVencimiento =
    "validez" in documento ? calcularFechaVencimiento(documento.fechaEmision, documento.validez) : undefined
  const diasRestantesVencimiento = fechaVencimiento ? calcularDiasRestantes(fechaVencimiento) : undefined

  return (
    <div className="p-4 bg-[#f5f5f5]">
      <DocumentDetailTemplate
        onClose={() => router.push(RUTA_LISTA[tipo])}
        topHeader={
          <HeaderSection
            tipo={tipo}
            numero={documento.numero}
            documentTitle={TITULOS[tipo]}
            cliente={cliente}
            clienteCelular={cliente?.celular}
            isEditing={isEditing}
            // El botón Editar no se muestra (ni puede activarse) si el documento ya fue finalizado.
            puedeEditar={!documento._bloqueado}
            onEditar={handleToggleEditar}
            onGenerarNotaVenta={tipo !== "nota_venta" ? handleGenerarNotaVenta : undefined}
          />
        }
        topBody={
          <DocumentInfoSection
            tipo={tipo}
            cliente={cliente}
            fechaEmision={documento.fechaEmision}
            validez={"validez" in documento ? documento.validez : undefined}
            garantia={"garantia" in documento ? documento.garantia : undefined}
            formaPago={documento.formaPago}
            moneda={moneda}
            comisionistaLabel={comisionistaLabel}
            almacenLabel={almacenLabel}
            tipoOperacionLabel={tipoOperacionLabel}
            almacenes={almacenes}
            tiposOperacion={tiposOperacion}
            observacion={documento.observacion}
            fechaVencimiento={fechaVencimiento}
            diasRestantesVencimiento={diasRestantesVencimiento}
            fechaRenovacion={renovacion?.isActive ? renovacion.fechaRenovacion : undefined}
            empresa={tipo === "nota_venta" ? getEmpresaConfig() : undefined}
            logoUrl={tipo === "nota_venta" ? getEmpresaLogoUrl() : undefined}
            documentTitle={TITULOS[tipo]}
            numero={documento.numero}
            isEditing={isEditing}
            editValues={editValues ?? undefined}
            onEditValuesChange={handleEditValuesChange}
            clientes={clientesLista}
            clienteIdSeleccionado={editClienteId}
            onClienteChange={setEditClienteId}
          />
        }
        tableBody={
          <ItemsTable
            tipo={tipo}
            items={itemsVigentes as any}
            articulosMaster={articulosMaster}
            porcentajeComision={porcentajeComision}
            currencySymbol={currencySymbol}
            isEditing={isEditing}
            onItemChange={handleEditItemChange}
            onAddEmpty={handleEditAddEmpty}
            onRemoveItem={handleEditRemoveItem}
          />
        }
        summarySection={
          <TotalesDetailSection
            tipo={tipo}
            totals={totals}
            moneda={moneda}
            currencySymbol={currencySymbol}
            isEditing={isEditing}
            onGuardar={handleGuardar}
            onGuardarYFinalizar={handleGuardarYFinalizarClick}
          />
        }
        actions={
          <div className="space-y-6">
            <BancosInfo
              bancos={BANCOS_DEFAULT}
              moneda={moneda}
              variant={tipo === "nota_venta" ? "compact" : "rounded"}
            />
            {tipo !== "nota_venta" && (
              <MandatarioSection
                mandatario={{
                  telefono: "999 999 999",
                  celular: "999 999 999",
                  email: "demo@mi-empresa.com",
                  web: "https://www.demo.com/",
                }}
              />
            )}
          </div>
        }
      />

      {/* Modal 1: confirmar Finalizar */}
      <ConfirmModal
        isOpen={showConfirmFinalizar}
        variant="warning"
        title="¿Estás seguro que deseas Finalizar?"
        description="Una vez Finalizado, no podrás editar esta Cotización"
        confirmText="Si, Finalizar"
        cancelText="Cancelar!"
        onConfirm={handleConfirmarFinalizar}
        onCancel={handleCancelarFinalizar}
      />

      {/* Modal 2: resultado si se cancela el finalizar */}
      <ConfirmModal
        isOpen={showCanceladoInfo}
        variant="error"
        title="Cancelado"
        description="Cancelando el Finalizar"
        onOk={() => setShowCanceladoInfo(false)}
      />

      {/* Modal 3: resultado si se confirma el finalizar */}
      <ConfirmModal
        isOpen={showCerradoInfo}
        variant="success"
        title="Edición de Cotización Cerrado"
        description="No se va a poder editar de nuevo"
        onOk={() => setShowCerradoInfo(false)}
      />
    </div>
  )
}
