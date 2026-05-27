"use client"

import React from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import cotizacionManualData from "../../data/cotizacion_manual.json"
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
  return (value || "0.00").replace(/S\/|\$/g, "").trim()
}

function numeroALetras(numStr: string, moneda: string = "Dólares"): string {
  const num = parseFloat(numStr.replace(/,/g, ""))
  if (isNaN(num)) return ""

  const formatDecimals = (val: number) => {
    const decimals = Math.round((val - Math.floor(val)) * 100)
    return `${decimals.toString().padStart(2, "0")}/100`
  }

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
        if (u > 0) return text + " y " + unidades(u)
        return text
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
    if (resto > 0) {
      if (resto < 10) return text + " " + unidades(resto)
      return text + " " + decenas(resto).toLowerCase()
    }
    return text
  }

  const miles = (m: number) => {
    const mil = Math.floor(m / 1000)
    const resto = m % 1000
    let text = ""
    if (mil === 1) text = "mil"
    else if (mil > 1) {
      if (mil < 10) text = unidades(mil) + " mil"
      else if (mil < 100) text = decenas(mil) + " mil"
      else text = centenas(mil) + " mil"
    }
    if (resto > 0) {
      if (resto < 10) text += " " + unidades(resto)
      else if (resto < 100) text += " " + decenas(resto).toLowerCase()
      else text += " " + centenas(resto).toLowerCase()
    }
    return text
  }

  const entero = Math.floor(num)
  let letras = ""
  if (entero === 0) letras = "cero"
  else if (entero < 10) letras = unidades(entero)
  else if (entero < 100) letras = decenas(entero)
  else if (entero < 1000) letras = centenas(entero)
  else if (entero < 1000000) letras = miles(entero)
  else letras = "monto grande"

  letras = letras.trim()
  letras = letras.charAt(0).toUpperCase() + letras.slice(1)

  const decs = formatDecimals(num)
  const monName = moneda.toLowerCase() === "soles" ? "Soles" : "Dolares"
  return `${letras} con ${decs} ${monName}`
}

export default function CotizacionManualDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [showDocumentHeader, setShowDocumentHeader] = React.useState(true)
  const row = (cotizacionManualData as any[]).find(c => String(c.id) === String(id))

  if (!row) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-500 text-sm">
        Cotización no encontrada.
      </div>
    )
  }

  const amount = montoSinSimbolo(row.importeT)
  const cotizacion = {
    moneda: "Soles",
    total: amount,
    subtotal: amount,
    opGravada: amount,
    opInafecta: "0.00",
    opExonerada: "0.00",
    igv: "0.00",
    vencimiento: "-",
    diasRestantes: "-",
    validez: "1 DIAS",
    garantia: "6 MESES",
    observacion: "Emitimos la siguiente Cotización a vuestra solicitud",
    comisionista: "VE001 - Demo - 100%",
    direccion: "-",
    nContrato: "0000000 / 00000",
    items: [{
      item: "1",
      codigo: row.numero,
      descripcion: "Servicio / producto cotizado manualmente",
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
      email: "demo@mi-empresa.com",
      celular: "999-999-9999",
      web: "https://www.demo.com/",
    },
    ...row,
  }

  const currencySymbol = cotizacion.moneda?.toLowerCase() === "soles" ? "S/" : "$"

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6 font-sans text-sm text-[#676a6c]">
      <Accordion
        type="single"
        collapsible
        value={showDocumentHeader ? "document-header" : ""}
        onValueChange={(value) => setShowDocumentHeader(value === "document-header")}
        className="w-full bg-white shadow-sm border border-gray-200 overflow-hidden"
      >
        <AccordionItem value="document-header" className="border-none">
          <div className="h-[4.5rem] bg-white px-4 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="hover:text-gray-800 transition-colors flex items-center"
            >
              <i className="bi bi-arrow-left text-[16px] font-bold" />
            </button>
            <div className="flex items-center gap-3">
              <AccordionTrigger
                className="flex-none p-0 cursor-pointer bg-white hover:bg-white hover:no-underline rounded-md [&>svg]:!hidden"
                title={showDocumentHeader ? "Ocultar cabecera" : "Mostrar cabecera"}
              >
                <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
              </AccordionTrigger>
              <button
                onClick={() => router.back()}
                className="hover:text-gray-800 transition-colors flex items-center"
                title="Cerrar"
              >
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="px-8 pb-8">
            <AccordionContent className="pb-0">
              <div className="h-[4.5rem] -mx-8 px-8 flex items-center justify-between border-b border-gray-200">
                <div className="text-left">
                  <h2 className="font-extrabold tracking-wide">{cotizacion.numero}</h2>
                  <p className="font-bold mt-0.5">R.U.C : {cotizacion.rucDni}</p>
                </div>

                <h1 className="text-[20px] font-light tracking-[0.25em] uppercase">
                  COTIZACIÓN
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

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 mb-6 transition-all duration-200 ${showDocumentHeader ? "mt-16" : "mt-6"}`}>
              <div className="border border-gray-200 rounded-[12px] p-5 flex flex-col justify-between">
                <p className="text-center font-bold mb-4">Contacto Cliente</p>
                <div className="space-y-1 pl-2 leading-relaxed">
                  <p><span className="font-bold">Señor(es):</span> {cotizacion.cliente}</p>
                  <p><span className="font-bold">RUC :</span> {cotizacion.rucDni}</p>
                  <p><span className="font-bold">Dirección:</span> {cotizacion.direccion}</p>
                  <p><span className="font-bold">N° Contacto:</span> {cotizacion.nContrato}</p>
                  <p>
                    <span className="font-bold">F. Vencimiento:</span> {cotizacion.vencimiento}
                    <span className="ml-4 font-bold">Días restantes:</span> {cotizacion.diasRestantes}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-[12px] p-5 flex flex-col justify-between">
                <p className="text-center font-bold mb-4">Condiciones Generales</p>
                <div className="space-y-1 pl-2 leading-relaxed">
                  <div className="flex justify-between gap-4">
                    <p className="flex-1"><span className="font-bold">Forma De Pago:</span> {cotizacion.forma}</p>
                    <p className="flex-1"><span className="font-bold">Fecha:</span> {cotizacion.emision}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="flex-1"><span className="font-bold">Validez :</span> {cotizacion.validez}</p>
                    <p className="flex-1"><span className="font-bold">Garantía:</span> {cotizacion.garantia}</p>
                  </div>
                  <p><span className="font-bold">Tipo de Moneda:</span> {cotizacion.moneda}</p>
                  <p><span className="font-bold">Comisionista:</span> {cotizacion.comisionista}</p>
                </div>
              </div>
            </div>

            {cotizacion.observacion && (
              <p className="mx-4 mb-6 pl-2">
                <span className="font-bold">Observaciones:</span> {cotizacion.observacion}
              </p>
            )}

            <div className="mx-4 mb-6 overflow-x-auto">
              <table className="cotizacion-items-table w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 font-bold tracking-wide">
                    <th className="py-2.5 text-left w-12 uppercase">ITEM</th>
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
                  {cotizacion.items?.map((item: any, idx: number) => (
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
                      <td className="py-3 text-center">{item.puComision || "0.00"}</td>
                      <td className="py-3 text-right font-bold">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <style jsx>{`
                .cotizacion-items-table th:not(:first-child) {
                  text-transform: none;
                }
              `}</style>
            </div>

            <div className="mx-4 flex flex-col md:flex-row items-start justify-between gap-6 mb-8 pt-4">
              <div className="pt-1">
                <span className="font-bold">Son : {numeroALetras(cotizacion.total, cotizacion.moneda)}</span>
              </div>

              <div className="border border-gray-200 rounded-[12px] p-4 bg-white w-full md:w-[270px]">
                <div className="space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{currencySymbol} {cotizacion.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Op. Gravada:</span>
                    <span>{currencySymbol} {cotizacion.opGravada}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Op. Inafecta:</span>
                    <span>{currencySymbol} {cotizacion.opInafecta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Op. Exonerada:</span>
                    <span>{currencySymbol} {cotizacion.opExonerada}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>I.G.V.:</span>
                    <span>{currencySymbol} {cotizacion.igv || "0.00"}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-gray-100 pt-1.5 mt-1.5">
                    <span>Importe Total:</span>
                    <span>{currencySymbol} {cotizacion.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {cotizacion.bancos?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 mb-8">
                {cotizacion.bancos.map((banco: any) => (
                  <BankCard key={banco.nombre} banco={banco} currency={cotizacion.moneda} />
                ))}
              </div>
            )}

            {cotizacion.mandatario && (
              <div className="mx-4 flex flex-col sm:flex-row justify-between items-end gap-6 pt-6">
                <div className="space-y-1 leading-relaxed">
                  <p className="font-bold underline">Atendido por:</p>
                  <p><span className="font-bold">Teléfono:</span> {cotizacion.mandatario.telefono}</p>
                  <p><span className="font-bold">Celular:</span> {cotizacion.mandatario.celular || "95555 SIN CORRIENTE"}</p>
                  <p>
                    <span className="font-bold">Web:</span>{" "}
                    <a
                      href={cotizacion.mandatario.web}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-gray-800"
                    >
                      {cotizacion.mandatario.web}
                    </a>
                  </p>
                </div>
                <div className="w-[280px] text-center pr-12 pb-2">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold tracking-wide uppercase">SSSS</p>
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
    <button
      className={`flex items-center justify-center w-[32px] h-[32px] ${color} text-white rounded-[4px] hover:brightness-95 active:brightness-90 transition-all`}
    >
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

function BankCard({ banco, currency }: { banco: any; currency: string }) {
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
    <div className="bg-white border border-gray-200 rounded-[12px] p-5 shadow-sm text-center flex flex-col justify-between min-h-[95px]">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={logoSrc}
          alt={logoAlt}
          className="max-h-[24px] w-auto object-contain"
        />
      </div>
      <p className="font-bold mt-4 tracking-wide">
        Cta C. {symbolPrefix}{rawNumber}
      </p>
    </div>
  )
}
