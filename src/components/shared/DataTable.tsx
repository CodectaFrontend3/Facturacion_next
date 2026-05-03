"use client"

import React, { useMemo, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    PaginationState,
    Table as TanStackTable,
    Row,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    Loader2Icon,
} from "lucide-react"

// ─── Selection column helper ────────────────────────────────────────────────
// Se extrajo fuera del componente para garantizar una referencia estable
export function getSelectColumn<TData>(): ColumnDef<TData> {
    return {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Seleccionar todo"
                className="hover:border-[#2C8F7B] hover:border-3 cursor-pointer border-[#D3CFC8] size-5 [&_svg]:size-4"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={`Seleccionar fila ${row.id}`}
                className="hover:border-[#2C8F7B] hover:border-3 cursor-pointer border-[#D3CFC8] size-5 [&_svg]:size-4"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    }
}

// ─── DataTable Props ────────────────────────────────────────────────────────
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    showSelection?: boolean
    showPagination?: boolean
    isLoading?: boolean
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
}

// ─── DataTable Component ────────────────────────────────────────────────────
export function DataTable<TData, TValue>({
    columns,
    data,
    pageSize = 10,
    showSelection = true,
    showPagination = true,
    isLoading = false,
    getRowId,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    })

    // Memorización de columnas para prevenir rerenderizados costosos innecesarios
    const allColumns = useMemo(() => {
        return showSelection ? [getSelectColumn<TData>(), ...columns] : columns
    }, [showSelection, columns])

    const table = useReactTable({
        data,
        columns: allColumns,
        state: {
            rowSelection,
            pagination,
        },
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: showSelection,
        getRowId: getRowId || ((row, index) => (row as any).id ? String((row as any).id) : String(index)),
    })

    return (
        <div className="w-full space-y-4 font-sans">
            {/* ── Table ─────────────────────────────────────────────── */}
            <div className="border border-gray-200 overflow-hidden rounded-none">
                <Table aria-label="Tabla de datos principal">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-white hover:bg-white"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={`border-r border-gray-200 last:border-r-0 text-[13px] font-bold font-sans tracking-wide text-[#676A6C] last:bg-[#F2F2F2] ${header.id === "select" ? "bg-[#F2F2F2]" : "bg-white"
                                            }`}
                                        style={{
                                            width:
                                                header.getSize() !== 150
                                                    ? header.getSize()
                                                    : undefined,
                                        }}
                                        aria-sort={header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? "ascending" : "descending") : "none"}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={allColumns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                                        <Loader2Icon className="size-6 animate-spin text-gray-400" aria-hidden="true" />
                                        <span aria-live="polite">Cargando datos...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="transition-colors odd:bg-[#F2F2F2] even:bg-white hover:bg-[#ECECEC] border-b border-gray-200"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="border-r border-gray-200 last:border-r-0 text-[13px] font-sans text-[#676A6C] py-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={allColumns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    <span aria-live="polite">Sin resultados.</span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Footer ────────────────────────────────────────────── */}
            {showPagination && (
                <DataTablePagination table={table} showSelection={showSelection} />
            )}
        </div>
    )
}

// ─── Subcomponent: Pagination ───────────────────────────────────────────────
interface DataTablePaginationProps<TData> {
    table: TanStackTable<TData>
    showSelection: boolean
}

function DataTablePagination<TData>({ table, showSelection }: DataTablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()

    return (
        <div className="flex items-center justify-between px-1">
            {/* Selection count */}
            <div className="text-sm text-gray-500" aria-live="polite">
                {showSelection && (
                    <span>
                        {table.getFilteredSelectedRowModel().rows.length} de{" "}
                        {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
                    </span>
                )}
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500" aria-live="polite">
                    Página {currentPage} de {totalPages}
                </span>

                <div className="flex items-center gap-1" role="group" aria-label="Controles de paginación">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="Ir a la primera página"
                    >
                        <ChevronsLeftIcon className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        aria-label="Ir a la página anterior"
                    >
                        <ChevronLeftIcon className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        aria-label="Ir a la página siguiente"
                    >
                        <ChevronRightIcon className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        aria-label="Ir a la última página"
                    >
                        <ChevronsRightIcon className="size-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
