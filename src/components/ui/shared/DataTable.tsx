"use client"

import { useMemo, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    Row,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/components/ui/DataTable/DataTablePagination"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2Icon } from "lucide-react"

export function getSelectColumn<TData>(): ColumnDef<TData> {
    return {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    showSelection?: boolean
    showPagination?: boolean
    isLoading?: boolean
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
    onRowSelectionChange?: (selectedRows: TData[]) => void
    pageIndex?: number
    onPageChange?: (index: number) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageSize = 3,
    showSelection = true,
    showPagination = true,
    isLoading = false,
    getRowId,
    onRowSelectionChange,
    pageIndex: pageIndexProp,
    onPageChange,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

    // Modo controlado: pageIndex viene del padre (useTableData)
    // Modo autónomo:  pageIndex vive acá adentro
    const isControlled = pageIndexProp !== undefined && onPageChange !== undefined
    const [internalPageIndex, setInternalPageIndex] = useState(0)

    const currentPageIndex = isControlled ? pageIndexProp : internalPageIndex
    const setCurrentPageIndex = isControlled ? onPageChange : setInternalPageIndex

    const selectColumn = useMemo(() => getSelectColumn<TData>(), [])
    const allColumns = useMemo(() => {
        return showSelection ? [selectColumn, ...columns] : columns
    }, [showSelection, columns, selectColumn])

    const pageCount = Math.ceil(data.length / pageSize)
    const paginatedData = useMemo(() => {
        const start = currentPageIndex * pageSize
        return data.slice(start, start + pageSize)
    }, [data, currentPageIndex, pageSize])

    const table = useReactTable({
        data: paginatedData,
        columns: allColumns,
        state: { rowSelection },
        onRowSelectionChange: (updater) => {
            const next = typeof updater === "function" ? updater(rowSelection) : updater
            setRowSelection(next)
            if (onRowSelectionChange) {
                const selectedRows = table
                    .getRowModel()
                    .rows.filter((row) => next[row.id])
                    .map((row) => row.original)
                onRowSelectionChange(selectedRows)
            }
        },
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: showSelection,
        getRowId: getRowId || ((_row, index) => String(currentPageIndex * pageSize + index)),
    })

    const canPreviousPage = currentPageIndex > 0
    const canNextPage = currentPageIndex < pageCount - 1

    return (
        <div className="w-full space-y-4 font-sans">
            <div className="border border-gray-200 overflow-hidden rounded-none">
                <Table aria-label="Tabla de datos principal">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-white hover:bg-white">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={`border-r border-gray-200 last:border-r-0 text-[13px] font-bold font-sans tracking-wide text-[#676A6C] last:bg-[#F2F2F2] ${header.id === "select" ? "bg-[#F2F2F2]" : "bg-white"}`}
                                        style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={allColumns.length} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                                        <Loader2Icon className="size-6 animate-spin text-gray-400" />
                                        <span>Cargando datos...</span>
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
                                        <TableCell key={cell.id} className="border-r border-gray-200 last:border-r-0 text-[13px] font-sans text-[#676A6C] py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="bg-[#F2F2F2] border-b border-gray-200">
                                <TableCell colSpan={allColumns.length} className="text-left text-[13px] font-sans text-[#676A6C] py-3 px-4">
                                    No hay datos disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {showPagination && data.length > 0 && (
                <DataTablePagination
                    pageIndex={currentPageIndex}
                    pageSize={pageSize}
                    dataLength={data.length}
                    pageCount={pageCount}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    setPageIndex={setCurrentPageIndex}
                />
            )}
        </div>
    )
}