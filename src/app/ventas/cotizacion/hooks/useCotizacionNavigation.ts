import { useRouter, useSearchParams } from "next/navigation"
import { TabKey } from "../types"
import { TABS } from "../config/constants"

export function useCotizacionNavigation() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab") as TabKey | null
  const activeTab: TabKey = tabParam && TABS.some(t => t.key === tabParam) ? tabParam : "cotizacion"

  const handleTabChange = (key: TabKey) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", key)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return {
    activeTab,
    handleTabChange,
  }
}
