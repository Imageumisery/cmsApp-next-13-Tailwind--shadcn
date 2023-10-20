"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BillboardColumn } from "./ui/columns";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable({ data, columns }: { data: BillboardColumn[]; columns: [] }) {
    // const table = useReactTable({
    //   data,
    //   columns,
    //   getCoreRowModel: getCoreRowModel(),
    // })

    return (
        <div className="rounded-md border mt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.label}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
