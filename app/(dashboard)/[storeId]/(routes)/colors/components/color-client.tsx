"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";

interface ColorClientProps {
    data: ColorColumn[];
}

const ColorClient = ({ data }: ColorClientProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading title={`Colors(${data.length})`} description="Manage your colors for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default ColorClient;
