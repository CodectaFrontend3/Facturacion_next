"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import bbvaLogo from "@/assets/img/bancos/BBVA.png"
import interbankLogo from "@/assets/img/bancos/Interbank.png"
import scotiabankLogo from "@/assets/img/bancos/Scotiabank.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type {
  DocumentDetailBanco,
  DocumentDetailData,
  DocumentDetailItem,
  DocumentDetailVariant,
} from "@/app/(sistema)/ventas/_domain/legacy/document-detail.types"
import { numeroALetras, simboloDesdeMoneda } from "@/app/(sistema)/ventas/_utils/legacy/document-detail-utils"
import { ActionButton } from "@/components/common/ActionButton"
import { WhatsappShareButton } from "@/app/(sistema)/ventas/_components/shared/WhatsappShareButton"

interface DocumentDetailViewProps {
  variant: DocumentDetailVariant
  data: DocumentDetailData
  /** Activa las acciones unificadas del módulo de ventas. */
  useActionButtons?: boolean
}

export function DocumentDetailView({
  variant,
  data,
  useActionButtons = false,
}: DocumentDetailViewProps) {
  const router = useRouter()
  const [showDocumentHeader, setShowDocumentHeader] = React.useState(true)
  const currencySymbol = simboloDesdeMoneda(data.moneda)
  const isCotizacion = variant === "cotizacion" || variant === "cotizacion-manual"
  const isNotaVenta = variant === "nota-venta"
  const handleGenerarNotaVenta = () => {
    const origen = variant === "cotizacion" ? "cotizacion" : "cotizacion_manual"
    const origenId = data.id ?? data.numero

    router.push(`/ventas/nota_venta/crear?origen=${origen}&origenId=${encodeURIComponent(String(origenId))}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6 pb-10 font-sans text-sm text-[#676a6c]">
      <Accordion
        type="single"
        collapsible
        value={showDocumentHeader ? "document-header" : ""}
        onValueChange={(value) => setShowDocumentHeader(value === "document-header")}
        className="w-full overflow-hidden border border-gray-200 bg-white shadow-sm"
      >
        <AccordionItem value="document-header" className="border-none">
          <DocumentToolbar
            onBack={() => router.back()}
            onToggleHeader={() => setShowDocumentHeader((current) => !current)}
            showDocumentHeader={showDocumentHeader}
            useActionButtons={useActionButtons}
          />

          <div className={`px-8 ${isCotizacion ? "pb-8" : "pb-10"}`}>
            <AccordionContent className="pb-0">
              <DocumentHeaderBar
                variant={variant}
                numero={data.numero}
                rucDni={isCotizacion ? data.rucDni : data.empresa?.ruc ?? data.rucDni}
                documentTitle={data.documentTitle}
                numeroDoc={data.numero}
                useActionButtons={useActionButtons}
                onGenerarNotaVenta={useActionButtons && isCotizacion ? handleGenerarNotaVenta : undefined}
              />
            </AccordionContent>

            {isCotizacion ? (
              <CotizacionTopSection data={data} showDocumentHeader={showDocumentHeader} />
            ) : (
              <NotaVentaTopSection data={data} showDocumentHeader={showDocumentHeader} />
            )}

            {data.observacion && (
              <p className={`pl-2 ${isCotizacion ? "mx-4 mb-6" : "mt-6 pl-3"}`}>
                <span className="font-bold">{isCotizacion ? "Observaciones:" : "observaciones:"}</span>{" "}
                {data.observacion}
              </p>
            )}

            {variant === "cotizacion" && (
              <CotizacionItemsTable items={data.items} />
            )}
            {variant === "cotizacion-manual" && (
              <CotizacionManualItemsTable items={data.items} currencySymbol={currencySymbol} />
            )}
            {variant === "nota-venta" && (
              <NotaVentaItemsTable items={data.items} currencySymbol={currencySymbol} />
            )}

            {isCotizacion ? (
              <CotizacionTotals data={data} currencySymbol={currencySymbol} />
            ) : (
              <NotaVentaTotals data={data} currencySymbol={currencySymbol} />
            )}

            {data.bancos && data.bancos.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${isCotizacion ? "mx-4 mb-8" : "mt-10"
                  }`}
              >
                {data.bancos.map((banco) => (
                  <BankCard
                    key={banco.nombre}
                    banco={banco}
                    currency={data.moneda}
                    rounded={isCotizacion ? "rounded-[12px]" : "rounded-[8px]"}
                  />
                ))}
              </div>
            )}

            {isCotizacion && data.mandatario && (
              <MandatarioSection mandatario={data.mandatario} />
            )}
          </div>
        </AccordionItem>
      </Accordion>
      <div aria-hidden="true" className="h-12" />
    </div>
  )
}

function DocumentToolbar({
  onBack,
  onToggleHeader,
  showDocumentHeader,
  useActionButtons,
}: {
  onBack: () => void
  onToggleHeader: () => void
  showDocumentHeader: boolean
  useActionButtons: boolean
}) {
  if (useActionButtons) {
    const plainControlClass = "flex h-8 w-8 cursor-pointer items-center justify-center bg-transparent p-0 text-[#676a6c] shadow-none transition-none hover:bg-transparent hover:text-[#676a6c] hover:shadow-none"

    return (
      <div className="flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4">
        <button type="button" aria-label="Volver" title="Volver" className={plainControlClass} onClick={onBack}>
          <i className="bi bi-arrow-left text-[16px]" />
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Mostrar u ocultar cabecera"
            title="Mostrar u ocultar cabecera"
            className={plainControlClass}
            onClick={onToggleHeader}
          >
            <i className={`bi bi-chevron-up text-[14px] ${showDocumentHeader ? "" : "rotate-180"}`} />
          </button>
          <button type="button" aria-label="Cerrar" title="Cerrar" className={plainControlClass} onClick={onBack}>
            <i className="bi bi-x-lg text-[14px]" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4">
      <button onClick={onBack} className="flex items-center transition-colors hover:text-gray-800" title="Volver">
        <i className="bi bi-arrow-left text-[16px] font-bold" />
      </button>
      <div className="flex items-center gap-3">
        <AccordionTrigger
          className="flex-none cursor-pointer rounded-md bg-white p-0 hover:bg-white hover:no-underline [&>svg]:!hidden"
          title="Mostrar u ocultar cabecera"
        >
          <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
        </AccordionTrigger>
        <button onClick={onBack} className="flex items-center transition-colors hover:text-gray-800" title="Cerrar">
          <i className="bi bi-x-lg cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

function DocumentHeaderBar({
  variant,
  numero,
  rucDni,
  documentTitle,
  numeroDoc,
  useActionButtons,
  onGenerarNotaVenta,
}: {
  variant: DocumentDetailVariant
  numero: string
  rucDni: string
  documentTitle: string
  numeroDoc: string
  useActionButtons: boolean
  onGenerarNotaVenta?: () => void
}) {
  return (
    <div className="-mx-8 flex h-[4.5rem] items-center justify-between border-b border-gray-200 px-8">
      <div className="text-left">
        <h2 className="font-extrabold tracking-wide">{numero}</h2>
        <p className="mt-0.5 font-bold">R.U.C : {rucDni}</p>
      </div>

      <h1 className="text-[20px] font-light uppercase tracking-[0.25em]">{documentTitle}</h1>

      <div className="flex items-center gap-1">
        {variant === "cotizacion" || variant === "cotizacion-manual" ? (
          <CotizacionHeaderActions
            numeroDoc={numeroDoc}
            useActionButtons={useActionButtons}
            onGenerarNotaVenta={onGenerarNotaVenta}
          />
        ) : (
          <NotaVentaHeaderActions
            numeroDoc={numeroDoc}
            useActionButtons={useActionButtons}
          />
        )}
      </div>
    </div>
  )
}

function CotizacionHeaderActions({
  numeroDoc,
  useActionButtons,
  onGenerarNotaVenta,
}: {
  numeroDoc: string
  useActionButtons: boolean
  onGenerarNotaVenta?: () => void
}) {
  const [showGenerarVenta, setShowGenerarVenta] = React.useState(false)

  if (useActionButtons) {
    return (
      <>
        {showGenerarVenta && (
          <ActionButton
            icon={<i className="bi bi-file-earmark-text text-[14px]" />}
            label="Generar nota de venta"
            className="h-8 w-8 rounded-[4px] bg-[#1ab394] text-white"
            hoverClassName="hover:bg-[#159c80]"
            isPopover
            popoverContent={
              <div className="flex w-[220px] flex-col gap-2 p-1">
                <p className="px-1 text-[12px] text-[#676a6c]">
                  ¿Generar Nota de Venta a partir de esta cotización?
                </p>
                <button
                  type="button"
                  onClick={onGenerarNotaVenta}
                  className="rounded bg-[#1ab394] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#159c80]"
                >
                  Sí, generar
                </button>
              </div>
            }
          />
        )}
        <ActionButton
          icon={<i className={`bi bi-chevron-right text-[16px] transition-transform duration-300 ${showGenerarVenta ? "rotate-180" : ""}`} />}
          label="Mostrar generación de nota de venta"
          className="h-8 w-8 rounded-[4px] border border-gray-300 bg-white text-[#6c757d]"
          hoverClassName="hover:bg-gray-50"
          onClick={() => setShowGenerarVenta((current) => !current)}
        />
        <DetailActionButton icon="bi-share-fill" label="Compartir" color="bg-[#6c757d]" hoverColor="hover:bg-[#545b62]" />
        <DetailActionButton icon="bi-file-earmark-pdf" label="PDF" color="bg-[#007bff]" hoverColor="hover:bg-[#0069d9]" />
        <DetailActionButton icon="bi-printer" label="Imprimir" color="bg-[#17a2b8]" hoverColor="hover:bg-[#138496]" />
        <DetailActionButton icon="bi-envelope" label="Correo" color="bg-[#6c757d]" hoverColor="hover:bg-[#545b62]" />
        <WhatsappShareButton numeroDoc={numeroDoc} className="h-8 w-8 rounded-[4px] bg-[#28a745] text-white" />
        <DetailActionButton icon="bi-pencil-fill" label="Editar" color="bg-[#ffc107]" hoverColor="hover:bg-[#e0a800]" />
      </>
    )
  }

  return (
    <>
      <ActionBtn icon="bi-share-fill" color="bg-[#6c757d]" />
      <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#007bff]" />
      <ActionBtn icon="bi-printer" color="bg-[#17a2b8]" />
      <ActionBtn icon="bi-envelope" color="bg-[#6c757d]" />
      <ActionBtn icon="bi-whatsapp" color="bg-[#28a745]" />
      <ActionBtn icon="bi-pencil-fill" color="bg-[#ffc107]" />
    </>
  )
}

function NotaVentaHeaderActions({
  numeroDoc,
  useActionButtons,
}: {
  numeroDoc: string
  useActionButtons: boolean
}) {
  if (useActionButtons) {
    return (
      <>
        <DetailActionButton icon="bi-file-earmark-pdf" label="PDF" color="bg-[#1b86c9]" hoverColor="hover:bg-[#166ba2]" />
        <DetailActionButton icon="bi-tag" label="Etiqueta" color="bg-[#27c7c9]" hoverColor="hover:bg-[#1fa5a7]" />
        <DetailActionButton icon="bi-printer" label="Imprimir" color="bg-[#1b86c9]" hoverColor="hover:bg-[#166ba2]" />
        <DetailActionButton icon="bi-envelope-fill" label="Correo" color="bg-[#6c757d]" hoverColor="hover:bg-[#545b62]" />
        <WhatsappShareButton numeroDoc={numeroDoc} className="h-8 w-8 rounded-[4px] bg-[#008000] text-white" />
      </>
    )
  }

  return (
    <>
      <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
      <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
      <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
      <ActionBtn icon="bi-envelope-fill" color="bg-[#6c757d]" title="Correo" />
      <ActionBtn icon="bi-whatsapp" color="bg-[#008000]" title="WhatsApp" />
    </>
  )
}

function CotizacionTopSection({
  data,
  showDocumentHeader,
}: {
  data: DocumentDetailData
  showDocumentHeader: boolean
}) {
  return (
    <div
      className={`mx-4 mb-6 grid grid-cols-1 gap-6 transition-all duration-200 md:grid-cols-2 ${showDocumentHeader ? "mt-16" : "mt-6"
        }`}
    >
      <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
        <p className="mb-4 text-center font-bold">Contacto Cliente</p>
        <div className="space-y-1 pl-2 leading-relaxed">
          <p><span className="font-bold">Señor(es):</span> {data.cliente}</p>
          <p><span className="font-bold">RUC :</span> {data.rucDni}</p>
          <p><span className="font-bold">Dirección:</span> {data.direccion}</p>
          <p><span className="font-bold">N° Contacto:</span> {data.nContrato}</p>
          <p>
            <span className="font-bold">F. Vencimiento:</span> {data.vencimiento}
            <span className="ml-4 font-bold">Días restantes:</span> {data.diasRestantes}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
        <p className="mb-4 text-center font-bold">Condiciones Generales</p>
        <div className="space-y-1 pl-2 leading-relaxed">
          <div className="flex justify-between gap-4">
            <p className="flex-1"><span className="font-bold">Forma De Pago:</span> {data.forma}</p>
            <p className="flex-1"><span className="font-bold">Fecha:</span> {data.emision}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="flex-1"><span className="font-bold">Validez :</span> {data.validez}</p>
            <p className="flex-1"><span className="font-bold">Garantía:</span> {data.garantia}</p>
          </div>
          <p><span className="font-bold">Tipo de Moneda:</span> {data.moneda}</p>
          <p><span className="font-bold">Comisionista:</span> {data.comisionista}</p>
        </div>
      </div>
    </div>
  )
}

function NotaVentaTopSection({
  data,
  showDocumentHeader,
}: {
  data: DocumentDetailData
  showDocumentHeader: boolean
}) {
  const empresa = data.empresa

  if (!empresa) return null

  return (
    <>
      <div
        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr_430px] ${showDocumentHeader ? "mt-16" : "mt-8"
          }`}
      >
        <div className="flex flex-wrap items-center gap-4">
          {data.logoUrl && (
            <Image
              src={data.logoUrl}
              alt="Logo de la empresa"
              width={420}
              height={158}
              className="max-h-[158px] w-auto max-w-full object-contain"
              unoptimized={true}
            />
          )}
        </div>

        <div className="text-center leading-snug">
          <p className="font-bold">{empresa.nombre}</p>
          <p>Tel.: {empresa.telefono} / Movil: {empresa.movil}</p>
          <p>{empresa.correo}</p>
          <p>{empresa.direccion}</p>
        </div>

        <div className="rounded-[8px] border border-gray-200 px-8 py-7 text-center">
          <p className="text-[16px] font-extrabold">R.U.C {empresa.ruc}</p>
          <p className="mt-4 text-[18px] font-light uppercase tracking-[0.16em]">{data.documentTitle}</p>
          <p className="mt-4 font-extrabold">{data.numero}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-[8px] border border-gray-200 px-4 py-4">
          <h2 className="mb-4 text-center text-[16px] font-extrabold">Contacto Cliente</h2>
          <div className="space-y-1 leading-relaxed">
            <p><span className="font-bold">Señor(es):</span> {data.cliente}</p>
            <p><span className="font-bold">RUC :</span> {data.rucDni}</p>
            <p><span className="font-bold">Fecha:</span> {data.emision}</p>
          </div>
        </section>

        <section className="rounded-[8px] border border-gray-200 px-4 py-4">
          <h2 className="mb-4 text-center text-[16px] font-extrabold">Condiciones Generales</h2>
          <div className="space-y-1 leading-relaxed">
            <p><span className="font-bold">Garantia:</span> {data.garantia}</p>
            <p><span className="font-bold">Tipo de Moneda:</span> {data.moneda}</p>
          </div>
        </section>
      </div>
    </>
  )
}

function CotizacionItemsTable({ items }: { items: DocumentDetailItem[] }) {
  return (
    <div className="mx-4 mb-6 overflow-x-auto">
      <table className="document-detail-items-table w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 font-bold tracking-wide">
            <th className="w-12 py-2.5 text-left uppercase">ITEM</th>
            <th className="py-2.5 text-left uppercase">Código</th>
            <th className="py-2.5 text-left uppercase">Descripción</th>
            <th className="py-2.5 text-center uppercase">Cantidad</th>
            <th className="py-2.5 text-center uppercase">Dscto.</th>
            <th className="py-2.5 text-center uppercase">P.Unitario Desc.</th>
            <th className="py-2.5 text-center uppercase">Comisión</th>
            <th className="py-2.5 text-center uppercase">P.Unitario Com.</th>
            <th className="py-2.5 text-right uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={item.item || idx}>
              <td className="py-3 text-left font-medium">{item.item}</td>
              <td className="py-3 text-left font-mono">{item.codigo}</td>
              <td className="py-3 text-left">
                <div className="leading-tight">{item.descripcion}</div>
              </td>
              <td className="py-3 text-center">{item.cantidad}</td>
              <td className="py-3 text-center">{item.descuento || "0%"}</td>
              <td className="py-3 text-center">{item.puDescuento || "0.00"}</td>
              <td className="py-3 text-center">{item.puComision || "0%"}</td>
              <td className="py-3 text-center">{item.precioUnitario ?? item.puDescuento ?? "0.00"}</td>
              <td className="py-3 text-right font-bold">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .document-detail-items-table th:not(:first-child) {
          text-transform: none;
        }
      `}</style>
    </div>
  )
}

function CotizacionManualItemsTable({
  items,
  currencySymbol,
}: {
  items: DocumentDetailItem[]
  currencySymbol: string
}) {
  return (
    <div className="mx-4 mb-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 font-bold tracking-wide">
            <th className="w-12 py-2.5 text-left uppercase">ITEM</th>
            <th className="py-2.5 text-left">Código</th>
            <th className="py-2.5 text-left">Descripción</th>
            <th className="py-2.5 text-center">Cantidad</th>
            <th className="py-2.5 text-center">P. Unitario</th>
            <th className="py-2.5 text-right">P. Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={item.item || idx}>
              <td className="py-3 text-left font-medium">{item.item}</td>
              <td className="py-3 text-left font-mono">{item.codigo}</td>
              <td className="py-3 text-left">
                <div className="leading-tight">{item.descripcion}</div>
              </td>
              <td className="py-3 text-center">{item.cantidad}</td>
              <td className="py-3 text-center">
                {currencySymbol} {item.precioUnitario ?? item.puDescuento ?? "0.00"}
              </td>
              <td className="py-3 text-right font-bold">
                {currencySymbol} {item.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NotaVentaItemsTable({
  items,
  currencySymbol,
}: {
  items: DocumentDetailItem[]
  currencySymbol: string
}) {
  return (
    <div className="mt-9 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 font-bold">
            <th className="w-24 py-3 text-left">ITEM</th>
            <th className="py-3 text-left">Descripcion</th>
            <th className="w-40 py-3 text-center">Cantidad</th>
            <th className="w-44 py-3 text-center">P.Unitario</th>
            <th className="w-44 py-3 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.item || index}>
              <td className="py-3 text-left">{item.item}</td>
              <td className="py-3 text-left">{item.descripcion}</td>
              <td className="py-3 text-center">{item.cantidad}</td>
              <td className="py-3 text-center">
                {currencySymbol} {item.precioUnitario ?? item.puDescuento}
              </td>
              <td className="py-3 text-center">{currencySymbol} {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CotizacionTotals({
  data,
  currencySymbol,
}: {
  data: DocumentDetailData
  currencySymbol: string
}) {
  return (
    <div className="mx-4 mb-8 flex flex-col items-start justify-between gap-6 pt-4 md:flex-row">
      <div className="pt-1">
        <span className="font-bold">Son : {numeroALetras(data.total, data.moneda)}</span>
      </div>

      <div className="w-full rounded-[12px] border border-gray-200 bg-white p-4 md:w-[270px]">
        <div className="space-y-1.5 font-medium">
          <TotalRow label="Subtotal:" value={data.subtotal ?? data.total} symbol={currencySymbol} />
          <TotalRow label="Op. Gravada:" value={data.opGravada ?? data.total} symbol={currencySymbol} />
          <TotalRow label="Op. Inafecta:" value={data.opInafecta ?? "0.00"} symbol={currencySymbol} />
          <TotalRow label="Op. Exonerada:" value={data.opExonerada ?? "0.00"} symbol={currencySymbol} />
          <TotalRow label="I.G.V.:" value={data.igv ?? "0.00"} symbol={currencySymbol} />
          <div className="mt-1.5 flex justify-between border-t border-gray-100 pt-1.5 font-bold">
            <span>Importe Total:</span>
            <span>{currencySymbol} {data.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotaVentaTotals({
  data,
  currencySymbol,
}: {
  data: DocumentDetailData
  currencySymbol: string
}) {
  return (
    <div className="mt-8 flex flex-col items-start justify-between gap-8 lg:flex-row">
      <p className="text-[16px] font-extrabold">Son : {numeroALetras(data.total, data.moneda)}</p>

      <div className="w-full rounded-[8px] border border-gray-200 px-8 py-5 text-center lg:w-[420px]">
        <p className="font-extrabold">Importe Total</p>
        <p className="mt-6 text-[16px]">
          {currencySymbol} {Number(data.total).toFixed(2)}
        </p>
      </div>
    </div>
  )
}

function MandatarioSection({ mandatario }: { mandatario: NonNullable<DocumentDetailData["mandatario"]> }) {
  return (
    <div className="mx-4 flex flex-col items-end justify-between gap-6 pt-6 sm:flex-row">
      <div className="space-y-1 leading-relaxed">
        <p className="font-bold underline">Atendido por:</p>
        <p><span className="font-bold">Teléfono:</span> {mandatario.telefono}</p>
        {mandatario.email && (
          <p><span className="font-bold">Email:</span> {mandatario.email}</p>
        )}
        <p><span className="font-bold">Celular:</span> {mandatario.celular || "95555 SIN CORRIENTE"}</p>
        {mandatario.web && (
          <p>
            <span className="font-bold">Web:</span>{" "}
            <a href={mandatario.web} target="_blank" rel="noreferrer" className="underline hover:text-gray-800">
              {mandatario.web}
            </a>
          </p>
        )}
      </div>
      <div className="w-[280px] pr-12 pb-2 text-center">
        <div className="border-t border-gray-200 pt-4">
          <p className="font-bold uppercase tracking-wide">SSSS</p>
        </div>
      </div>
    </div>
  )
}

function DetailActionButton({
  icon,
  label,
  color,
  hoverColor,
}: {
  icon: string
  label: string
  color: string
  hoverColor: string
}) {
  return (
    <ActionButton
      icon={<i className={`bi ${icon} text-[14px]`} />}
      label={label}
      className={`h-8 w-8 rounded-[4px] ${color} text-white`}
      hoverClassName={hoverColor}
    />
  )
}

function ActionBtn({ icon, color, title }: { icon: string; color: string; title?: string }) {
  return (
    <button
      className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}
      title={title}
    >
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

function TotalRow({ label, value, symbol }: { label: string; value: string; symbol: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{symbol} {value}</span>
    </div>
  )
}

function BankCard({
  banco,
  currency,
  rounded,
}: {
  banco: DocumentDetailBanco
  currency: string
  rounded: string
}) {
  const bankName = banco.nombre?.toLowerCase() || ""
  let logoSrc = bbvaLogo
  let logoAlt = "BBVA"

  if (bankName.includes("interbank")) {
    logoSrc = interbankLogo
    logoAlt = "Interbank"
  } else if (bankName.includes("scotiabank")) {
    logoSrc = scotiabankLogo
    logoAlt = "Scotiabank"
  }

  const cleanAccount = banco.cuenta || ""
  let symbolPrefix = ""
  if (cleanAccount.includes("$")) {
    symbolPrefix = "$: "
  } else if (cleanAccount.includes("S/")) {
    symbolPrefix = "S/: "
  } else {
    symbolPrefix = currency?.toLowerCase() === "soles" ? "S/: " : "$: "
  }

  const rawNumber = cleanAccount
    .replace(/Cta C\.\s*[\$|S\/]*:\s*/i, "")
    .replace(/Cta:\s*/i, "")
    .replace(/Cta\s*/i, "")
    .trim()

  return (
    <div className={`flex min-h-[95px] flex-col justify-between border border-gray-200 bg-white p-5 text-center shadow-sm ${rounded}`}>
      <div className="flex flex-1 items-center justify-center">
        <Image src={logoSrc} alt={logoAlt} className="max-h-[24px] w-auto object-contain" />
      </div>
      <p className="mt-4 tracking-wide">
        <span className="font-bold">Cta C. {symbolPrefix}</span>
        {rawNumber}
      </p>
    </div>
  )
}
