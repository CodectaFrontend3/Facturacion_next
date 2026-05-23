"use client"

import React from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import renovacionData from "../../data/renovacion.json"
import bbvaLogo from "@/assets/img/bancos/BBVA.png"
import interbankLogo from "@/assets/img/bancos/Interbank.png"
import scotiabankLogo from "@/assets/img/bancos/Scotiabank.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function montoSinSimbolo(value?: string) {
  return (value || "0.00").replace(/S\/|\$/g, "").replace(/,/g, "").trim()
}

function numeroALetras(numStr: string, moneda: string = "Soles"): string {
  const num = parseFloat(numStr.replace(/,/g, ""))
  if (isNaN(num)) return ""

  const unidades = (u: number) => {
    switch (u) {
      case 1: return "un"
      case 2: return "dos"
      case 3: return "tres"
      case 4: return "cuatro"
      case 5: return "cinco"
      case 6: return "seis"
      case 7: return "siete"
      case 8: return "ocho"
      case 9: return "nueve"
      default: return ""
    }
  }

  const decenas = (d: number) => {
    switch (d) {
      case 10: return "diez"
      case 11: return "once"
      case 12: return "doce"
      case 13: return "trece"
      case 14: return "catorce"
      case 15: return "quince"
      case 20: return "veinte"
      default:
        if (d > 15 && d < 20) return "dieci" + unidades(d - 10)
        if (d > 20 && d < 30) return "veinti" + unidades(d - 20)
        const u = d % 10
        const dec = Math.floor(d / 10)
        let text = ""
        switch (dec) {
          case 3: text = "treinta"; break
          case 4: text = "cuarenta"; break
          case 5: text = "cincuenta"; break
          case 6: text = "sesenta"; break
          case 7: text = "setenta"; break
          case 8: text = "ochenta"; break
          case 9: text = "noventa"; break
        }
        return u > 0 ? text + " y " + unidades(u) : text
    }
  }

  const centenas = (c: number) => {
    const cent = Math.floor(c / 100)
    const resto = c % 100
    let text = ""
    switch (cent) {
      case 1: text = resto === 0 ? "cien" : "ciento"; break
      case 2: text = "doscientos"; break
      case 3: text = "trescientos"; break
      case 4: text = "cuatrocientos"; break
      case 5: text = "quinientos"; break
      case 6: text = "seiscientos"; break
      case 7: text = "setecientos"; break
      case 8: text = "ochocientos"; break
      case 9: text = "novecientos"; break
    }
    if (resto === 0) return text
    return `${text} ${resto < 10 ? unidades(resto) : decenas(resto).toLowerCase()}`
  }

  const miles = (m: number) => {
    const mil = Math.floor(m / 1000)
    const resto = m % 1000
    let text = mil === 1 ? "mil" : `${mil < 10 ? unidades(mil) : mil < 100 ? decenas(mil) : centenas(mil)} mil`
    if (resto > 0) text += ` ${resto < 100 ? decenas(resto).toLowerCase() : centenas(resto).toLowerCase()}`
    return text
  }

  const entero = Math.floor(num)
  const decimals = Math.round((num - entero) * 100).toString().padStart(2, "0")
  let letras = "cero"
  if (entero > 0 && entero < 10) letras = unidades(entero)
  else if (entero < 100) letras = decenas(entero)
  else if (entero < 1000) letras = centenas(entero)
  else if (entero < 1000000) letras = miles(entero)
  else letras = "monto grande"

  letras = letras.trim()
  letras = letras.charAt(0).toUpperCase() + letras.slice(1)

  return `${letras} con ${decimals}/100 ${moneda}`
}

export default function RenovacionDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [showDocumentHeader, setShowDocumentHeader] = React.useState(true)
  const row = (renovacionData as any[]).find(c => String(c.id) === String(id))

  if (!row) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Cotizacion no encontrada.
      </div>
    )
  }

  const amount = montoSinSimbolo(row.importeT)
  const renovacion = {
    moneda: "Soles",
    total: amount,
    subtotal: amount,
    opGravada: amount,
    opInafecta: "0.00",
    opExonerada: "0.00",
    igv: "0.00",
    diasRestantes: row.dias || "-",
    validez: "1 DIAS",
    garantia: "6 MESES",
    observacion: "Emitimos la siguiente Cotizacion a vuestra solicitud",
    comisionista: "VE001 - Demo - 100%",
    direccion: "-",
    nContrato: "0000000 / 00000",
    items: [{
      item: "1",
      codigo: row.numero,
      descripcion: "Servicio / producto renovado",
      cantidad: "1",
      descuento: "0%",
      puDescuento: amount,
      puComision: "0%",
      total: amount,
    }],
    bancos: [
      { nombre: "Interbank", cuenta: "Cta: 8-012-091-2901005" },
      { nombre: "Scotiabank", cuenta: "Cta: 8-011-20017" },
      { nombre: "BNA Transnetel", cuenta: "Cta: 61-9013410001" },
    ],
    mandatario: {
      telefono: "999999999999",
      celular: "999-999-9999",
      web: "https://www.demo.com/",
    },
    ...row,
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6 font-sans text-sm text-[#676a6c]">
      <Accordion
        type="single"
        collapsible
        value={showDocumentHeader ? "document-header" : ""}
        onValueChange={(value) => setShowDocumentHeader(value === "document-header")}
        className="w-full overflow-hidden border border-gray-200 bg-white shadow-sm"
      >
        <AccordionItem value="document-header" className="border-none">
          <div className="flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4">
            <button onClick={() => router.back()} className="flex items-center transition-colors hover:text-gray-800">
              <i className="bi bi-arrow-left text-[16px] font-bold" />
            </button>
            <div className="flex items-center gap-3">
              <AccordionTrigger
                className="flex-none cursor-pointer rounded-md bg-white p-0 hover:bg-white hover:no-underline [&>svg]:!hidden"
                title={showDocumentHeader ? "Ocultar cabecera" : "Mostrar cabecera"}
              >
                <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
              </AccordionTrigger>
              <button onClick={() => router.back()} className="flex items-center transition-colors hover:text-gray-800" title="Cerrar">
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="px-8 pb-8">
            <AccordionContent className="pb-0">
              <div className="-mx-8 flex h-[4.5rem] items-center justify-between border-b border-gray-200 px-8">
                <div className="text-left">
                  <h2 className="font-extrabold tracking-wide">{renovacion.numero}</h2>
                  <p className="mt-0.5 font-bold">R.U.C : {renovacion.rucDni}</p>
                </div>

                <h1 className="text-[20px] font-light uppercase tracking-[0.25em]">
                  COTIZACION
                </h1>

                <div className="flex items-center gap-1">
                  <ActionBtn icon="bi-share-fill" color="bg-[#6c757d]" />
                  <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#007bff]" />
                  <ActionBtn icon="bi-printer" color="bg-[#17a2b8]" />
                  <ActionBtn icon="bi-envelope" color="bg-[#6c757d]" />
                  <ActionBtn icon="bi-whatsapp" color="bg-[#28a745]" />
                  <ActionBtn icon="bi-pencil-fill" color="bg-[#ffc107]" />
                </div>
              </div>
            </AccordionContent>

            <div className={`mx-4 mb-6 grid grid-cols-1 gap-6 transition-all duration-200 md:grid-cols-2 ${showDocumentHeader ? "mt-16" : "mt-6"}`}>
              <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
                <p className="mb-4 text-center font-bold">Contacto Cliente</p>
                <div className="space-y-1 pl-2 leading-relaxed">
                  <p><span className="font-bold">Senor(es):</span> {renovacion.cliente}</p>
                  <p><span className="font-bold">RUC :</span> {renovacion.rucDni}</p>
                  <p><span className="font-bold">Direccion:</span> {renovacion.direccion}</p>
                  <p><span className="font-bold">Nro Contacto:</span> {renovacion.nContrato}</p>
                  <p>
                    <span className="font-bold">F. Vencimiento:</span> {renovacion.vencimiento}
                    <span className="ml-4 font-bold">Dias restantes:</span> {renovacion.diasRestantes}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
                <p className="mb-4 text-center font-bold">Condiciones Generales</p>
                <div className="space-y-1 pl-2 leading-relaxed">
                  <div className="flex justify-between gap-4">
                    <p className="flex-1"><span className="font-bold">Forma De Pago:</span> {renovacion.forma}</p>
                    <p className="flex-1"><span className="font-bold">Fecha:</span> {renovacion.emision}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="flex-1"><span className="font-bold">Validez :</span> {renovacion.validez}</p>
                    <p className="flex-1"><span className="font-bold">Garantia:</span> {renovacion.garantia}</p>
                  </div>
                  <p><span className="font-bold">Tipo de Moneda:</span> {renovacion.moneda}</p>
                  <p><span className="font-bold">Comisionista:</span> {renovacion.comisionista}</p>
                </div>
              </div>
            </div>

            <p className="mx-4 mb-6 pl-2">
              <span className="font-bold">Observaciones:</span> {renovacion.observacion}
            </p>

            <div className="mx-4 mb-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 font-bold tracking-wide">
                    <th className="w-12 py-2.5 text-left uppercase">ITEM</th>
                    <th className="py-2.5 text-left">Codigo</th>
                    <th className="py-2.5 text-left">Descripcion</th>
                    <th className="py-2.5 text-center">Cantidad</th>
                    <th className="py-2.5 text-center">Dscto.</th>
                    <th className="py-2.5 text-center">P.Unitario Desc.</th>
                    <th className="py-2.5 text-center">Comision</th>
                    <th className="py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {renovacion.items.map((item: any, idx: number) => (
                    <tr key={item.item || idx}>
                      <td className="py-3 text-left font-medium">{item.item}</td>
                      <td className="py-3 text-left font-mono">{item.codigo}</td>
                      <td className="py-3 text-left">{item.descripcion}</td>
                      <td className="py-3 text-center">{item.cantidad}</td>
                      <td className="py-3 text-center">{item.descuento}</td>
                      <td className="py-3 text-center">S/ {item.puDescuento}</td>
                      <td className="py-3 text-center">{item.puComision}</td>
                      <td className="py-3 text-right font-bold">S/ {item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mx-4 mb-8 flex flex-col items-start justify-between gap-6 pt-4 md:flex-row">
              <div className="pt-1">
                <span className="font-bold">Son : {numeroALetras(renovacion.total, renovacion.moneda)}</span>
              </div>

              <div className="w-full rounded-[12px] border border-gray-200 bg-white p-4 md:w-[270px]">
                <div className="space-y-1.5 font-medium">
                  <TotalRow label="Subtotal:" value={renovacion.subtotal} />
                  <TotalRow label="Op. Gravada:" value={renovacion.opGravada} />
                  <TotalRow label="Op. Inafecta:" value={renovacion.opInafecta} />
                  <TotalRow label="Op. Exonerada:" value={renovacion.opExonerada} />
                  <TotalRow label="I.G.V.:" value={renovacion.igv} />
                  <div className="mt-1.5 flex justify-between border-t border-gray-100 pt-1.5 font-bold">
                    <span>Importe Total:</span>
                    <span>S/ {renovacion.total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-4 mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {renovacion.bancos.map((banco: any) => (
                <BankCard key={banco.nombre} banco={banco} />
              ))}
            </div>

            {renovacion.mandatario && (
              <div className="mx-4 flex flex-col items-end justify-between gap-6 pt-6 sm:flex-row">
                <div className="space-y-1 leading-relaxed">
                  <p className="font-bold underline">Atendido por:</p>
                  <p><span className="font-bold">Telefono:</span> {renovacion.mandatario.telefono}</p>
                  <p><span className="font-bold">Celular:</span> {renovacion.mandatario.celular || "95555 SIN CORRIENTE"}</p>
                  <p>
                    <span className="font-bold">Web:</span>{" "}
                    <a
                      href={renovacion.mandatario.web}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-gray-800"
                    >
                      {renovacion.mandatario.web}
                    </a>
                  </p>
                </div>
                <div className="w-[280px] pr-12 pb-2 text-center">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold uppercase tracking-wide">SSSS</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ActionBtn({ icon, color }: { icon: string; color: string }) {
  return (
    <button className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}>
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>S/ {value}</span>
    </div>
  )
}

function BankCard({ banco }: { banco: any }) {
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

  const rawNumber = (banco.cuenta || "")
    .replace(/Cta C\.\s*[\$|S\/]*:\s*/i, "")
    .replace(/Cta:\s*/i, "")
    .replace(/Cta\s*/i, "")
    .trim()

  return (
    <div className="flex min-h-[95px] flex-col justify-between rounded-[12px] border border-gray-200 bg-white p-5 text-center shadow-sm">
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={logoSrc}
          alt={logoAlt}
          className="max-h-[24px] w-auto object-contain"
        />
      </div>
      <p className="mt-4 font-bold tracking-wide">Cta C. S/: {rawNumber}</p>
    </div>
  )
}
