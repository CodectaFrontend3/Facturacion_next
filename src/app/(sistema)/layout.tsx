import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import AppFooter from "@/components/layout/app-footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AddButton } from "@/components/shared/add-button";
import type { CSSProperties } from "react";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <AppHeader />
      <SidebarProvider 
        defaultOpen={false} 
        style={{ "--sidebar-width": "260px" } as CSSProperties}
        className="h-[calc(100vh-4rem)] min-h-0"
      >
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <main className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
            {/* Aquí se inyectan las páginas de ventas, tesorería, etc. */}
            <div className="flex-1 flex flex-col bg-[#f4f6f9] p-4 lg:p-6 overflow-y-auto">
                {children}
            </div>
          </main>
          <AppFooter />
          <AddButton />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}