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
  icon?: React.ReactNode
  label?: string           // Texto accesible (aria-label / title)
  text?: string            // Texto visible junto al ícono
  variant?: "filled" | "outline" // Estilo del botón (por defecto: filled)
  size?: "sm" | "md"       // Tamaño (por defecto: md)
  onClick?: () => void
  href?: string
  isPopover?: boolean
  popoverOptions?: ActionPopoverOption[]
  popoverContent?: React.ReactNode
  className?: string
  popoverClassName?: string
  disabled?: boolean
}

export function ActionButton({
  icon,
  label,
  text,
  variant = "filled",
  size = "md",
  onClick,
  href,
  isPopover,
  popoverOptions,
  popoverContent,
  className,
  popoverClassName,
  disabled
}: ActionButtonProps) {

  const base = "inline-flex items-center justify-center gap-2 rounded font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"

  const variants = {
    filled:  "bg-[#2C1FF3] hover:bg-[#190FCE] text-white",
    outline: "bg-white hover:bg-blue-50 text-[#2C1FF3] border border-[#2C1FF3]",
  }

  const sizes = {
    sm: text ? "h-7 px-3 text-[12px]" : "h-7 w-7 p-0",
    md: text ? "h-9 px-4 text-[13px]" : "h-9 w-9 p-0",
  }

  const btnClass = cn(
    base,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none hover:translate-y-0 hover:shadow-none shadow-none",
    className
  )

  const renderButton = () => {
    if (href && !isPopover) {
      return (
        <Link href={href} className={btnClass} aria-label={label} title={label}>
          {icon}
          {text && <span>{text}</span>}
        </Link>
      )
    }

    return (
      <button
        type="button"
        className={btnClass}
        onClick={!isPopover && !disabled ? onClick : undefined}
        disabled={disabled}
        aria-label={label ?? text}
        title={label ?? text}
      >
        {icon}
        {text && <span>{text}</span>}
      </button>
    )
  }

  const [popoverOpen, setPopoverOpen] = React.useState(false)

  if (isPopover) {
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          {renderButton()}
        </PopoverTrigger>
        <PopoverContent className={cn("w-fit min-w-[180px] rounded-none p-2", popoverClassName)} align="end">
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
                  onClick={() => {
                    option.onClick?.()
                    setPopoverOpen(false)
                  }}
                >
                  {option.href ? (
                    <Link href={option.href} onClick={() => setPopoverOpen(false)}>{option.label}</Link>
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