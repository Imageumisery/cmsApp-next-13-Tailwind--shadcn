"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction, newColor } from "@/components/ui/cell-action";

export type ColorColumn = {
    id: string;
    name: string;
    colorValue: string;
    createdAt: string;
};

export const columns: ColumnDef<newColor>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "colorValue",
        header: "Value",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
