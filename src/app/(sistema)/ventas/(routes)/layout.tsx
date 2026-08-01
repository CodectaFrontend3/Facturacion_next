// (routes)/layout.tsx
import { VentasProvider } from "../VentasContext"

export default function VentasLayout({ children }: { children: React.ReactNode }) {
  return <VentasProvider basePath="/ventas">{children}</VentasProvider>
}
