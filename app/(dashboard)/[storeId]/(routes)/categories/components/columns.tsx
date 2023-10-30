"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/ui/cell-action";

export type CategoryColumn = {
    id: string;
    name:string;
    billboardLabel: string;
    createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboardLabel",
        header: "BillboardLabel",
        cell: ({ row }) => row.original.billboardLabel,
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    },
    {
        id:'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    },
];
