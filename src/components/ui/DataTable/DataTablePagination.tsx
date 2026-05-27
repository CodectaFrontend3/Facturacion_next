"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"

interface DataTablePaginationProps {
    pageIndex: number
    pageSize: number
    dataLength: number
    pageCount: number
    canPreviousPage: boolean
    canNextPage: boolean
    setPageIndex: (index: number) => void
}

export function DataTablePagination({
    pageIndex,
    pageSize,
    dataLength,
    pageCount,
    canPreviousPage,
    canNextPage,
    setPageIndex,
}: DataTablePaginationProps) {
    const startEntry = dataLength === 0 ? 0 : pageIndex * pageSize + 1
    const endEntry = Math.min((pageIndex + 1) * pageSize, dataLength)

    const generatePaginationLinks = () => {
        const pages: (number | string)[] = []
        if (pageCount <= 7) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i)
            }
        } else {
            if (pageIndex <= 3) {
                pages.push(0, 1, 2, 3, 4, '...', pageCount - 1)
            } else if (pageIndex >= pageCount - 4) {
                pages.push(0, '...', pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1)
            } else {
                pages.push(0, '...', pageIndex - 1, pageIndex, pageIndex + 1, '...', pageCount - 1)
            }
        }
        if (pages.length === 0) pages.push(0)
        return pages
    }

    return (
        <div className="flex items-center justify-between py-2 w-full">
            <div className="flex-1 text-left text-[13px] font-sans tracking-wide text-[#676A6C]">
                Ver {startEntry} a {endEntry} de {dataLength} entradas
            </div>

            <div className="flex justify-center">
                <Pagination className="w-auto mx-0">
                    <PaginationContent className="gap-0 -space-x-px">
                        <PaginationItem>
                            <button
                                onClick={() => setPageIndex(pageIndex - 1)}
                                disabled={!canPreviousPage}
                                className="relative inline-flex cursor-pointer items-center px-3 py-1.5 rounded-l border border-gray-300 bg-white text-[13px] font-sans font-medium text-[#676A6C] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                        </PaginationItem>

                        {generatePaginationLinks().map((page, idx) => (
                            <PaginationItem key={idx}>
                                {typeof page === 'number' ? (
                                    <button
                                        onClick={() => setPageIndex(page)}
                                        className={`relative inline-flex cursor-pointer items-center px-3.5 py-1.5 border text-[13px] font-sans font-medium ${pageIndex === page
                                            ? "z-10 bg-[#1D549F] border-[#1D549F] text-white hover:bg-[#15407A]"
                                            : "bg-white border-gray-300 text-[#676A6C] hover:bg-gray-50"
                                            }`}
                                    >
                                        {page + 1}
                                    </button>
                                ) : (
                                    <span className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 bg-white text-[13px] font-sans font-medium text-gray-500">
                                        {page}
                                    </span>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <button
                                onClick={() => setPageIndex(pageIndex + 1)}
                                disabled={!canNextPage}
                                className="relative inline-flex cursor-pointer items-center px-3 py-1.5 rounded-r border border-gray-300 bg-white text-[13px] font-sans font-medium text-[#676A6C] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Siguiente
                            </button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className="flex-1"></div>
        </div>
    )
}