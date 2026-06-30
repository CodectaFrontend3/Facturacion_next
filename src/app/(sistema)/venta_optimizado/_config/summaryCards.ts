// _config/summaryCards.ts
import {
  LucideIcon,
  FileText,
  FileSpreadsheet,
  Users,
  RefreshCcw,
} from "lucide-react"

export interface SummaryCardConfig {
  key:string
  label: string
  borderColorClass: string
  amountColorClass: string
  icon: LucideIcon
}

export const SUMMARY_CARDS: SummaryCardConfig[] = [
  {
    key: "cotizacion",
    label: "Cotización",
    borderColorClass: "border-[#008000]",
    amountColorClass: "text-[#008000]",
    icon: FileText,
  },

  {
    key: "cotizacionManual",
    label: "Cotización Manual",
    borderColorClass: "border-[#ffa500]",
    amountColorClass: "text-[#ffa500]",
    icon: FileText,
  },

  {
    key: "notaVenta",
    label: "Nota de Venta",
    borderColorClass: "border-[#ff0000]",
    amountColorClass: "text-[#ff0000]",
    icon: FileSpreadsheet,
  },

  {
    key: "clientes",
    label: "Clientes",
    borderColorClass: "border-[#0000ff]",
    amountColorClass: "text-[#0000ff]",
    icon: Users,
  },

  {
    key: "renovacion",
    label: "Renovación",
    borderColorClass: "border-[#808080]",
    amountColorClass: "text-[#808080]",
    icon: RefreshCcw,
  },
] 