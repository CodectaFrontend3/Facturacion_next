import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import AppFooter from "@/components/layout/app-footer";

export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppSidebar>
      <AppHeader />
      <main className="flex min-w-0 flex-1 flex-col h-full">
        {/* Aquí se inyectan las páginas de ventas, tesorería, etc. */}
        <div className="flex-1 flex flex-col bg-[#f4f6f9] p-4 lg:p-6 overflow-y-auto">
          {children}
        </div>
      </main>
      <AppFooter />
    </AppSidebar>
  );
}
