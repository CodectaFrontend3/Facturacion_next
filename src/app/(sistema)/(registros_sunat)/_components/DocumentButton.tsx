import * as React from "react"
import { Button } from "@/components/ui/button"

export interface DocumentButtonProps {
  type: "xml" | "pdf" | "cdr"
  codigo: string
  onClick?: () => void
  className?: string
}

export function DocumentButton({ type, codigo, onClick, className }: DocumentButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (onClick) {
      onClick()
    } else {
      console.log(`Descargar ${type.toUpperCase()} para:`, codigo)
    }
  }

  // Configuracion segun el tipo
  const configs = {
    pdf: {
      btnBorder: "border-[#f5b8b8]",
      iconClass: "fa fa-file-pdf-o text-red-500",
      barBg: "bg-[#d9534f]",
      label: "PDF",
    },
    xml: {
      btnBorder: "border-[#b2d0ec]",
      iconClass: "fa fa-file-text-o text-blue-400",
      barBg: "bg-[#1c84c6]",
      label: "XML",
    },
    cdr: {
      btnBorder: "border-gray-300",
      iconClass: "fa fa-file-text-o text-gray-400",
      barBg: "bg-[#7f7f7f]",
      label: "CDR",
    },
  }

  const current = configs[type]

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`flex flex-col items-center justify-between w-7 h-9 border ${current.btnBorder} bg-white hover:bg-white text-foreground hover:text-foreground rounded-[2px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer p-0.5 overflow-hidden ${className}`}
    >
      <div className="flex-1 flex items-center justify-center">
        <i className={`${current.iconClass} text-[13px]`} />
      </div>
      <div className={`${current.barBg} w-full text-[8px] font-bold text-white text-center py-0.5 uppercase tracking-tighter`}>
        {current.label}
      </div>
    </Button>
  )
}
