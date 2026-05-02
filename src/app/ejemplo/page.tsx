"use client"
import { useState } from "react"
import { DataTable } from "@/components/shared/DataTable"
import { ColumnDef } from "@tanstack/react-table"

type Item = { id: number; nombre: string }

const data: Item[] = [
]

const columns: ColumnDef<Item>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
]

export default function TestTabla() {
    return (
        <div style={{ padding: 40 }}>
            <DataTable columns={columns} data={data} pageSize={5} showSelection={false} />
        </div>
    )
}