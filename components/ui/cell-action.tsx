"use client";

import { Copy, MoreHorizontal, PenSquare, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BillboardColumn } from "./columns";
import { useState } from "react";
import AlertModal from "../modals/AlertModal";
import axios from "axios";

interface CellActionProps {
    data: BillboardColumn;
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

    const onDelete = async () => {
      try {
          setLoading(true);
          axios.delete(`/api/stores/${params.storeId}/billboards/${data.id}`);
          // router.refresh();
          toast.success("Billboard deleted!");
      } catch (error) {
          toast.error("Make sure you removed all categories using this billboard first.");
      } finally {
          setLoading(false);
          setOpen(false);
      }
  };

    return (
        <div className="ml-7">
          <AlertModal
          isOpen={open}
          loading={loading}
          onClose={() => setOpen(false)}
          onSubmit={onDelete}
          />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
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
