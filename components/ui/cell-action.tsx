"use client";

import { CategoryColumn } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/columns";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, MoreHorizontal, PenSquare, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AlertModal from "../modals/AlertModal";
import { BillboardColumn } from "./columns";

interface CellActionProps {
    data: BillboardColumn | CategoryColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboar Id copied to clipboard");
    };

    const switchRoutes = () => {
        if ("billboardLabel" in data) {
            // toast.success("It's a category!!");
            return "categories";
        }
        if ("label" in data) {
            // toast.success("It's a billboard!!");
            return "billboards";
        }
    };
    const name: string | undefined = switchRoutes();
    const onDelete = async () => {
        const nameForDelete = name?.replace(name.charAt(name.length - 1), "");
        try {
            setLoading(true);
            axios.delete(`/api/${params.storeId}/${name}/${data.id}`);
            router.refresh();
            toast.success(`${nameForDelete} deleted!`);
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <div className="ml-7">
            <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onSubmit={onDelete} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/${name}/${data.id}`)}>
                        <PenSquare className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
