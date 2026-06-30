import React, { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { Check, X, AlertTriangle, Info } from "lucide-react"

export type ToastType = 1 | 2 | 3 | 4

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
  duration,
}: {
  t: string | number
  message: string
  description?: string
  bgColor: string
  shadowStyle: string
  icon: React.ReactNode
  duration: number
}) => {
  const [clicked, setClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(100)
  
  const timerRef = useRef<number | null>(null)
  const progressRef = useRef(100)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (clicked) return
    setClicked(true)
    setTimeout(() => {
      toast.dismiss(t)
    }, 200) // Fast click-to-dismiss animation (200ms)
  }

  useEffect(() => {
    if (isHovered || clicked) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    const intervalTime = 20
    const step = (intervalTime / duration) * 100

    timerRef.current = window.setInterval(() => {
      const next = Math.max(0, progressRef.current - step)
      progressRef.current = next
      setProgress(next)
      if (next <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    }, intervalTime)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isHovered, clicked, duration])

  // Helper function to convert hex color to rgba color
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const currentBgColor = hexToRgba(bgColor, isHovered ? 1.0 : 0.85)

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: currentBgColor }}
      className={`relative flex items-center w-75 min-h-15 h-auto pl-12.5 pr-3.75 py-3 rounded-none text-white border border-white/10 ${shadowStyle} cursor-pointer transition-all duration-200 ease-in-out pointer-events-auto select-none animate-toast-in ${
        clicked 
          ? "opacity-0 scale-95 translate-y-2 blur-[2px]" 
          : "opacity-100"
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

      {/* Progress Bar */}
      {!clicked && (
        <div
          className="absolute bottom-0 left-0 h-[3px] bg-white/40 rounded-none"
          style={{
            width: `${progress}%`,
          }}
        />
      )}
    </div>
  )
}

export const showToast = (
  message: string,
  type: ToastType,
  options?: ToastOptions
) => {
  const isSuccess = type === 1
  const isError = type === 2
  const isWarning = type === 3
  const isInfo = type === 4

  let bgColor = "#51A351"
  if (isError) {
    bgColor = "#BD362F"
  } else if (isWarning) {
    bgColor = "#f8ac59"
  } else if (isInfo) {
    bgColor = "#2D9CDB"
  }
  
  const shadowStyle = "shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
  
  const defaultIconSize = "w-5 h-5"
  
  let DefaultIcon = Check
  if (isError) {
    DefaultIcon = X
  } else if (isWarning) {
    DefaultIcon = AlertTriangle
  } else if (isInfo) {
    DefaultIcon = Info
  }
  
  const icon = options?.icon || (
    <DefaultIcon 
      className={`${defaultIconSize} shrink-0 text-white`} 
      strokeWidth={isWarning ? 2.5 : 3.5} 
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
        duration={options?.duration || 4000}
      />
    ),
    {
      duration: options?.duration || 4000,
      position: "top-right",
    }
  )
}
