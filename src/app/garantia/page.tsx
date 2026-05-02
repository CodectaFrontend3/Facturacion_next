"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SummaryCards from "@/components/garantia/summaryCards";
import TabsBar from "@/components/garantia/tabsBar";
import FilterBar from "@/components/garantia/filterBar";
import DataTable, { TableType } from "@/components/garantia/dataTable";
import PageNavigator from "@/components/garantia/pageNavigator";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const validTabs: TableType[] = ["ingreso", "egreso", "tecnico"];

  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<TableType>(
    validTabs.includes(tabFromUrl as TableType)
      ? (tabFromUrl as TableType)
      : "ingreso"
  );

  const handleTabChange = (tab: TableType) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 space-y-6">
      <div className="pl-5 pr-5 mt-5">
        <SummaryCards />
        <div className="bg-white p-6 rounded shadow space-y-4">
          <TabsBar activeTab={activeTab} setActiveTab={handleTabChange} />

          <FilterBar type={activeTab}/>

          <DataTable type={activeTab} />

          <PageNavigator />
        </div>
      </div>
    </main>
  );
}