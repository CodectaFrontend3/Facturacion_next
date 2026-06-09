import React from "react";
import { Upload, Download, Plus } from "lucide-react";
import KardexTabs from "../components/KardexTabs";

export default function KardexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Aquí defines los botones de acción compartidos o específicos si lo requieres
  const globalActions = (
    <>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Upload className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Download className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Plus className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
    </>
  );

  return <KardexTabs actions={globalActions}>{children}</KardexTabs>;
}
