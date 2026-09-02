"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { getSubfamiliaColumns } from "../config/subfamilia-columns";
import type { FamiliaDetailManager } from "../hooks/useFamiliaDetailManager";

interface SubfamiliaListProps {
  manager: FamiliaDetailManager;
}

export function SubfamiliaList({ manager }: SubfamiliaListProps) {
  const {
    filteredSubfamilias,
    editingSubfamiliaId,
    editingSubfamiliaForm,
    search,
    pageSize,
    setSearch,
    setPageSize,
    openAddSubfamilia,
    startEditSubfamilia,
    cancelEditSubfamilia,
    setEditSubfamiliaDesc,
    saveEditSubfamilia,
    toggleSubfamiliaStatus,
  } = manager;

  const columns = useMemo(
    () =>
      getSubfamiliaColumns({
        onAddSubfamilia: openAddSubfamilia,
        editingSubfamiliaId,
        editingSubfamiliaDesc: editingSubfamiliaForm?.descripcion ?? "",
        onEditDescChange: setEditSubfamiliaDesc,
        onStartEdit: startEditSubfamilia,
        onCancelEdit: cancelEditSubfamilia,
        onSaveEdit: saveEditSubfamilia,
        onToggleStatus: toggleSubfamiliaStatus,
      }),
    [
      openAddSubfamilia,
      editingSubfamiliaId,
      editingSubfamiliaForm?.descripcion,
      setEditSubfamiliaDesc,
      startEditSubfamilia,
      cancelEditSubfamilia,
      saveEditSubfamilia,
      toggleSubfamiliaStatus,
    ],
  );

  return (
    <div className="flex flex-col gap-3 rounded border border-gray-200 bg-white p-5 shadow-xs">
      {/* Top Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Page size selector + info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[13px] text-[#676a6c]">
            <span>Ver</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-8 rounded-[2px] border border-gray-300 bg-white px-2 text-[12px] text-[#676a6c] outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entradas</span>
          </div>

          <span className="text-[12px] text-gray-500">
            Ver 1 a {filteredSubfamilias.length} de {filteredSubfamilias.length} entradas
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="subfamilia-search"
            className="text-[13px] text-[#676a6c]"
          >
            Buscar:
          </label>
          <Input
            id="subfamilia-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-44 rounded-[2px] border-gray-300 bg-white px-2 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0 sm:w-56"
          />
        </div>
      </div>

      {/* DataTable */}
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={filteredSubfamilias}
          pageSize={pageSize}
          showSelection={false}
          showPagination
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
