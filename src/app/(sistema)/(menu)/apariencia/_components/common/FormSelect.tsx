import { ChevronDown } from "lucide-react";
import type { AparienciaOption } from "../../types/apariencia";

interface FormSelectProps {
  id?: string;
  value: string;
  options: AparienciaOption[];
  onChange?: (value: string) => void;
  className?: string;
}

export function FormSelect({
  id,
  value,
  options,
  onChange,
  className = "",
}: FormSelectProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-9 w-full appearance-none rounded-[4px] border border-gray-300 bg-white px-3 pr-8 text-[13px] text-[#676a6c] outline-none transition-colors focus:border-[#1ab394]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
