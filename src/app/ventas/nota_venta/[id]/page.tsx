"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import notaVentaData from "../../data/nota_venta.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function montoSinSimbolo(value?: string) {
  return (value || "0.00").replace(/S\/|\$/g, "").replace(/,/g, "").trim()
}

function monedaDesdeImporte(value?: string) {
  return value?.trim().startsWith("$") ? "Dolares" : "Soles"
}

function simboloDesdeMoneda(moneda: string) {
  return moneda.toLowerCase() === "soles" ? "S/" : "$"
}

function numeroALetras(numStr: string, moneda = "Soles"): string {
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

export default function NotaVentaDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [showDocumentHeader, setShowDocumentHeader] = React.useState(true)
  const row = (notaVentaData as any[]).find(item => String(item.id) === String(id))

  if (!row) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500">
        Nota de venta no encontrada.
      </div>
    )
  }

  const total = montoSinSimbolo(row.importeT)
  const moneda = monedaDesdeImporte(row.importeT)
  const symbol = simboloDesdeMoneda(moneda)
  const notaVenta = {
    garantia: "6 MESES Mes(es)",
    observacion: "Emitimos la siguiente Nota de Venta a vuestra solicitud",
    fecha: row.emision,
    empresa: {
      nombre: "DEMO",
      ruc: "20522045773",
      telefono: "0133333333333333",
      movil: "970102509",
      correo: "eduardobuamncho@gmail.com",
      direccion: "Johan strauss 388 - Lima - Lima - Peru",
    },
    items: [
      {
        item: "1",
        descripcion: "Servicio / producto vendido",
        cantidad: "1",
        precioUnitario: total,
        total,
      },
    ],
    bancos: [
      { nombre: "Interbank", cuenta: "Cta: 8-012-091-2901005" },
      { nombre: "Scotiabank", cuenta: "Cta: 8-011-20017" },
      { nombre: "BNA Transnetel", cuenta: "Cta: 61-9013410001" },
    ],
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
            <button
              onClick={() => router.back()}
              className="flex items-center transition-colors hover:text-gray-800"
              title="Volver"
            >
              <i className="bi bi-arrow-left text-[16px] font-bold" />
            </button>

            <div className="flex items-center gap-3">
              <AccordionTrigger
                className="flex-none cursor-pointer rounded-md bg-white p-0 hover:bg-white hover:no-underline [&>svg]:!hidden"
                title={showDocumentHeader ? "Ocultar cabecera" : "Mostrar cabecera"}
              >
                <i className="bi bi-chevron-up text-[#8b8f94] [-webkit-text-stroke:1px_#8b8f94] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
              </AccordionTrigger>
              <button
                onClick={() => router.back()}
                className="flex items-center transition-colors hover:text-gray-800"
                title="Cerrar"
              >
                <i className="bi bi-x-lg cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="px-8 pb-10">
            <AccordionContent className="pb-0">
              <div className="-mx-8 flex h-[4.5rem] items-center justify-between border-b border-gray-200 px-8">
                <div className="text-left">
                  <h2 className="font-extrabold tracking-wide">{notaVenta.numero}</h2>
                  <p className="mt-0.5 font-bold">R.U.C : {notaVenta.empresa.ruc}</p>
                </div>

                <h1 className="text-[20px] font-light uppercase tracking-[0.25em]">
                  NOTA DE VENTA
                </h1>

                <div className="flex items-center gap-1">
                  <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
                  <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
                  <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
                  <ActionBtn icon="bi-envelope-fill" color="bg-[#6c757d]" title="Correo" />
                  <ActionBtn icon="bi-whatsapp" color="bg-[#008000]" title="WhatsApp" />
                </div>
              </div>
            </AccordionContent>

            <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr_430px] ${showDocumentHeader ? "mt-16" : "mt-8"}`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-[#1558ed] text-[56px] font-light leading-none text-white sm:h-[112px] sm:w-[112px] sm:text-[72px]">
                  G
                </div>
                <div className="leading-none text-[#1558ed]">
                  <p className="text-[38px] font-light tracking-[0.07em] sm:text-[58px]">ESENER</p>
                  <p className="mt-2 text-[14px] tracking-[0.45em] sm:text-[20px] sm:tracking-[0.65em]">SMART ENERGY</p>
                </div>
              </div>

              <div className="text-center leading-snug">
                <p className="font-bold">{notaVenta.empresa.nombre}</p>
                <p>Tel.: {notaVenta.empresa.telefono} / Movil: {notaVenta.empresa.movil}</p>
                <p>{notaVenta.empresa.correo}</p>
                <p>{notaVenta.empresa.direccion}</p>
              </div>

              <div className="rounded-[8px] border border-gray-200 px-8 py-7 text-center">
                <p className="text-[16px] font-extrabold">R.U.C {notaVenta.empresa.ruc}</p>
                <p className="mt-4 text-[18px] font-light uppercase tracking-[0.16em]">NOTA DE VENTA</p>
                <p className="mt-4 font-extrabold">{notaVenta.numero}</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <section className="rounded-[8px] border border-gray-200 px-4 py-4">
                <h2 className="mb-4 text-center text-[16px] font-extrabold">Contacto Cliente</h2>
                <div className="space-y-1 leading-relaxed">
                  <p><span className="font-bold">Senor(es):</span> {notaVenta.cliente}</p>
                  <p><span className="font-bold">RUC :</span> {notaVenta.rucDni}</p>
                  <p><span className="font-bold">Fecha:</span> {notaVenta.fecha}</p>
                </div>
              </section>

              <section className="rounded-[8px] border border-gray-200 px-4 py-4">
                <h2 className="mb-4 text-center text-[16px] font-extrabold">Condiciones Generales</h2>
                <div className="space-y-1 leading-relaxed">
                  <p><span className="font-bold">Garantia:</span> {notaVenta.garantia}</p>
                  <p><span className="font-bold">Tipo de Moneda:</span> {moneda}</p>
                </div>
              </section>
            </div>

            <p className="mt-6 pl-3">
              <span className="font-bold">observaciones:</span> {notaVenta.observacion}
            </p>

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
                  {notaVenta.items.map((item: any, index: number) => (
                    <tr key={item.item || index}>
                      <td className="py-3 text-left">{item.item}</td>
                      <td className="py-3 text-left">{item.descripcion}</td>
                      <td className="py-3 text-center">{item.cantidad}</td>
                      <td className="py-3 text-center">{symbol} {item.precioUnitario}</td>
                      <td className="py-3 text-center">{symbol} {item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-8 lg:flex-row">
              <p className="text-[16px] font-extrabold">
                Son : {numeroALetras(total, moneda)}
              </p>

              <div className="w-full rounded-[8px] border border-gray-200 px-8 py-5 text-center lg:w-[420px]">
                <p className="font-extrabold">Importe Total</p>
                <p className="mt-6 text-[16px]">{symbol} {Number(total).toFixed(2)}</p>
              </div>
            </div>

            {notaVenta.bancos?.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {notaVenta.bancos.map((banco: any) => (
                  <BankCard key={banco.nombre} banco={banco} moneda={moneda} />
                ))}
              </div>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function ActionBtn({ icon, color, title }: { icon: string; color: string; title: string }) {
  return (
    <button
      className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}
      title={title}
    >
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

function BankCard({ banco, moneda }: { banco: any; moneda: string }) {
  const bankName = banco.nombre?.toLowerCase() || ""
  const cleanAccount = banco.cuenta || ""
  const symbolPrefix = moneda.toLowerCase() === "soles" ? "S/: " : "$: "
  const accountNumber = cleanAccount
    .replace(/Cta:\s*/i, "")
    .replace(/Cta\s*/i, "")
    .trim()

  let logo = (
    <div className="text-center">
      <p className="text-[18px] font-extrabold text-[#004481]">BBVA</p>
      <p className="text-[11px] text-[#004481]">Continental</p>
    </div>
  )

  if (bankName.includes("interbank")) {
    logo = (
      <div className="rounded-[3px] bg-[#00a859] px-4 py-1.5 text-[16px] font-bold tracking-wide text-white">
        Interbank
      </div>
    )
  } else if (bankName.includes("scotiabank")) {
    logo = (
      <div className="text-[16px] font-bold text-[#ec1c24]">
        Scotiabank
      </div>
    )
  }

  return (
    <div className="flex min-h-[95px] flex-col items-center justify-between rounded-[8px] border border-gray-200 bg-white p-5 text-center">
      <div className="flex flex-1 items-center justify-center">{logo}</div>
      <p className="mt-4 font-bold tracking-wide">
        Cta C. {symbolPrefix}{accountNumber}
      </p>
    </div>
  )
}
