import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[#676A6C] whitespace-nowrap font-sans">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-20 w-full bg-white border border-gray-300 px-3 py-2 text-sm outline-none rounded-none shadow-none transition-colors placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-[#18a689] font-sans text-[#676A6C] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70",
            error && "border-red-500 focus-visible:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-sans">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
