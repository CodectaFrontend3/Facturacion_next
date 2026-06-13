import React, { useState } from "react"
import { toast } from "sonner"
import { Check, X } from "lucide-react"

export type ToastType = 1 | 2

interface ToastOptions {
  icon?: React.ReactNode
  duration?: number
  description?: string
}

const ToastComponent = ({
  t,
  message,
  description,
  bgColor,
  shadowStyle,
  icon,
}: {
  t: string | number
  message: string
  description?: string
  bgColor: string
  shadowStyle: string
  icon: React.ReactNode
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setTimeout(() => {
      toast.dismiss(t)
    }, 1000)
  }

  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: bgColor }}
      className={`relative flex items-center w-75 min-h-15 h-auto pl-12.5 pr-3.75 py-3 rounded-md text-white border border-white/10 ${shadowStyle} cursor-pointer transition-all duration-1000 ease-in-out pointer-events-auto select-none animate-toast-in ${
        clicked 
          ? "opacity-0 scale-95 translate-y-2 blur-[2px]" 
          : "opacity-95 hover:opacity-100 hover:scale-[1.01]"
      }`}
    >
      {/* Icon container - absolutely positioned on the left */}
      <div className="absolute left-3.75 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {icon}
      </div>

      {/* Text container */}
      <div className="w-full min-w-0 flex flex-col justify-center gap-0.5">
        <p className="text-[13px] font-bold leading-tight text-white tracking-wide">
          {message}
        </p>
        {description && (
          <p className="text-[13px] font-normal leading-tight text-white/90">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export const showToast = (
  message: string,
  type: ToastType,
  options?: ToastOptions
) => {
  const isSuccess = type === 1
  const bgColor = isSuccess ? "#51A351" : "#BD362F"
  
  const shadowStyle = "shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
  
  const defaultIconSize = "w-5 h-5"
  const defaultStrokeWidth = 3.5
  
  const DefaultIcon = isSuccess ? Check : X
  const icon = options?.icon || (
    <DefaultIcon 
      className={`${defaultIconSize} shrink-0 text-white`} 
      strokeWidth={defaultStrokeWidth} 
    />
  )

  toast.custom(
    (t) => (
      <ToastComponent
        t={t}
        message={message}
        description={options?.description}
        bgColor={bgColor}
        shadowStyle={shadowStyle}
        icon={icon}
      />
    ),
    {
      duration: options?.duration || 4000,
      position: "top-right",
    }
  )
}
