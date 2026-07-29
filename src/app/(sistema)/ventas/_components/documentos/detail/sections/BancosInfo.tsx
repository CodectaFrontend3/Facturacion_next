// _components/documentos/detail/sections/BancosInfo.tsx
"use client"

import Image from "next/image"
import bbvaLogo from "@/assets/img/bancos/BBVA.png"
import interbankLogo from "@/assets/img/bancos/Interbank.png"
import scotiabankLogo from "@/assets/img/bancos/Scotiabank.png"
import { BancoInfo } from "../../../../_config/empresa.config"

interface BancosInfoProps {
  bancos: BancoInfo[]
  moneda: "soles" | "dolares"
  /** "rounded" para cotización/manual (bordes más curvos), "compact" para nota de venta */
  variant?: "rounded" | "compact"
}

export function BancosInfo({ bancos, moneda, variant = "rounded" }: BancosInfoProps) {
  if (!bancos.length) return null

  const roundedClass = variant === "rounded" ? "rounded-[12px]" : "rounded-[8px]"

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {bancos.map((banco) => (
        <BankCard key={banco.nombre} banco={banco} moneda={moneda} rounded={roundedClass} />
      ))}
    </div>
  )
}

function BankCard({
  banco,
  moneda,
  rounded,
}: {
  banco: BancoInfo
  moneda: "soles" | "dolares"
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
    symbolPrefix = moneda === "soles" ? "S/: " : "$: "
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
      <p className="mt-4 tracking-wide text-[13px] text-[#676a6c]">
        <span className="font-bold">Cta C. {symbolPrefix}</span>
        {rawNumber}
      </p>
    </div>
  )
}
