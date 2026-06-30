import type { ReactNode } from "react"

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-extrabold">{label}</span>
      {children}
    </label>
  )
}
