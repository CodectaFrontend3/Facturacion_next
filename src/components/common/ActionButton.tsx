import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils" // Usar la utilidad de shadcn para clases

export interface ActionPopoverOption {
  label: string
  onClick?: () => void
  href?: string
}

export interface ActionButtonProps {
  icon: React.ReactNode
  label?: string // Añadido para accesibilidad
  onClick?: () => void
  href?: string
  isPopover?: boolean
  popoverOptions?: ActionPopoverOption[]
  popoverContent?: React.ReactNode
  className?: string
}

export function ActionButton({
  icon,
  label,
  onClick,
  href,
  isPopover,
  popoverOptions,
  popoverContent,
  className
}: ActionButtonProps) {

  const btnClass = cn(
    "flex items-center justify-center h-9 rounded text-white! bg-[#1a5eb3] hover:bg-[#1a3bb3] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-[#1a5eb3] focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
    className || "w-9 p-0"
  )

  const renderButton = () => {
    if (href && !isPopover) {
      return (
        <Link href={href} className={btnClass} aria-label={label} title={label}>
          {icon}
        </Link>
      )
    }

    return (
      <button
        type="button"
        className={btnClass}
        onClick={!isPopover ? onClick : undefined}
        aria-label={label}
        title={label}
      >
        {icon}
      </button>
    )
  }

  if (isPopover) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          {renderButton()}
        </PopoverTrigger>
        <PopoverContent className="w-fit min-w-[144px] rounded-none p-2" align="end">
          {popoverContent ? (
            popoverContent
          ) : (
            <div className="flex flex-col gap-1">
              {popoverOptions?.map((option, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-start font-normal rounded-none h-8 px-2 hover:pl-4 transition-all duration-175 cursor-pointer"
                  asChild={!!option.href}
                  onClick={option.onClick}
                >
                  {option.href ? (
                    <Link href={option.href}>{option.label}</Link>
                  ) : (
                    option.label
                  )}
                </Button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  }

  return renderButton()
}