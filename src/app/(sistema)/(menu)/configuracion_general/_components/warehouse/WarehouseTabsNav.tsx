import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WarehouseTabsNavProps {
  activeTab: string;
}

const warehouseTabs = [
  { value: "general", label: "Información General" },
  { value: "sunat", label: "Información de la Sunat" },
] as const;

export function WarehouseTabsNav({ activeTab }: WarehouseTabsNavProps) {
  return (
    <TabsList
      variant="line"
      className="h-9 w-full justify-start gap-0 border-b border-gray-200 p-0"
    >
      {warehouseTabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`relative top-px h-9 flex-none rounded-none border-x border-t px-4 py-2 text-[13px] font-bold transition-all after:hidden focus-visible:outline-none focus-visible:ring-0 ${
              isActive
                ? "border-gray-200 bg-white text-gray-800"
                : "border-transparent bg-transparent text-gray-500"
            }`}
          >
            {tab.label}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
