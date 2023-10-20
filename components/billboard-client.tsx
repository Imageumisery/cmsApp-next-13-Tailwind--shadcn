"use client";
import React from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { BillboardColumn } from "./ui/columns";
import { DataTable } from "./data-table";

interface BillboardClientProps {
    data: BillboardColumn[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards(${data.length})`} description="Manage your billboards for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={[]}/>
        </div>
    );
};

export default BillboardClient;
