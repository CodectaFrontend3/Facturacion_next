// src/app/(sistema)/venta_optimizado/_components/documentos/detail/DocumentoDetail.tsx
// _components/documentos/detail/DocumentoDetail.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentDetailTemplate } from "@/components/shared/DocumentDetailTemplate"

import { documentoService } from "../../../_services/documentoService"
import { clienteService } from "../../../_services/clienteService"
import { catalogoService } from "../../../_services/catalogoService"

import {
  calcularTotalesCotizacion,
  calcularTotalesCotizacionManual,
  calcularTotalesNotaVenta,
} from "../../../_utils/calculations"
import { simboloDesdeMoneda } from "../../../_utils/format"
import { areIdsEqual } from "../../../_utils/idNormalizer"
import { getEmpresaConfig, getEmpresaLogoUrl, BANCOS_DEFAULT } from "../../../_config/empresa.config"

import { DocumentoTipo } from "../../../_domain/types/shared.types"
import {
  CotizacionDetalle,
  CotizacionManualDetalle,
  NotaVentaDetalle,
} from "../../../_domain/types/documento.types"
import { ArticuloDetalle, ComisionistaDetalle } from "../../../_domain/types/catalogo.types"
import { ClienteDetalle } from "../../../_domain/types/cliente.types"

import { HeaderSection } from "./sections/HeaderSection"
import { ItemsTable } from "./sections/ItemsTable"
import { TotalesDetailSection } from "./sections/TotalesDetailSection"
import { BancosInfo } from "./sections/BancosInfo"
import { MandatarioSection } from "./sections/MandatarioSection"

type DocumentoCualquiera = CotizacionDetalle | CotizacionManualDetalle | NotaVentaDetalle

const TITULOS: Record<DocumentoTipo, string> = {
  cotizacion: "COTIZACIÓN",
  cotizacion_manual: "COTIZACIÓN",
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
  const [articulosMaster, setArticulosMaster] = useState<ArticuloDetalle[]>([])
  const [comisionistas, setComisionistas] = useState<ComisionistaDetalle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchAll = async () => {
      const [cotizaciones, manuales, notas, clientes, articulos, comisionistasData] = await Promise.all([
        documentoService.getCotizaciones(),
        documentoService.getCotizacionesManuales(),
        documentoService.getNotasVenta(),
        clienteService.getAll(),
        catalogoService.getArticulos(),
        catalogoService.getComisionistas(),
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
      setArticulosMaster(articulos)
      setComisionistas(comisionistasData)
      setIsLoading(false)
    }

    fetchAll()
    return () => { isMounted = false }
  }, [tipo, id])

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

  const moneda = documento.moneda
  const currencySymbol = simboloDesdeMoneda(moneda)

  // Comisionista (solo cotización tiene este campo)
  const comisionistaId = "comisionistaId" in documento ? documento.comisionistaId : undefined
  const comisionista = comisionistas.find((c) => areIdsEqual(c.id, comisionistaId))
  const porcentajeComision = comisionista?.porcentajeComision ?? 0
  const comisionistaLabel = comisionista ? `${comisionista.nombre} - ${comisionista.porcentajeComision}%` : undefined

  // Totales según el tipo, reutilizando la misma lógica del formulario de creación
  const totals =
    tipo === "cotizacion"
      ? calcularTotalesCotizacion(documento.items as any, articulosMaster, porcentajeComision)
      : tipo === "cotizacion_manual"
      ? calcularTotalesCotizacionManual(documento.items as any)
      : calcularTotalesNotaVenta(documento.items as any)

  // Renovación (solo cotización / cotización_manual)
  const renovacion = "renovacion" in documento ? documento.renovacion : undefined

  return (
    <div className="p-4 bg-[#f5f5f5]">
      <DocumentDetailTemplate
        title={`${TITULOS[tipo]} ${documento.numero}`}
        onClose={() => router.push(RUTA_LISTA[tipo])}
        topHeader={null}
        topBody={
          <HeaderSection
            tipo={tipo}
            numero={documento.numero}
            documentTitle={TITULOS[tipo]}
            cliente={cliente}
            fechaEmision={documento.fechaEmision}
            validez={"validez" in documento ? documento.validez : undefined}
            garantia={"garantia" in documento ? documento.garantia : undefined}
            formaPago={documento.formaPago}
            moneda={moneda}
            comisionistaLabel={comisionistaLabel}
            fechaRenovacion={renovacion?.isActive ? renovacion.fechaRenovacion : undefined}
            empresa={tipo === "nota_venta" ? getEmpresaConfig() : undefined}
            logoUrl={tipo === "nota_venta" ? getEmpresaLogoUrl() : undefined}
          />
        }
        tableBody={
          <ItemsTable
            tipo={tipo}
            items={documento.items as any}
            articulosMaster={articulosMaster}
            porcentajeComision={porcentajeComision}
            currencySymbol={currencySymbol}
          />
        }
        summarySection={
          <TotalesDetailSection tipo={tipo} totals={totals} moneda={moneda} currencySymbol={currencySymbol} />
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
                  web: "https://www.demo.com/",
                }}
              />
            )}
          </div>
        }
      />
    </div>
  )
}
