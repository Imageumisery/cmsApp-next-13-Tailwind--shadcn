"use client";
import React from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const BillboardClient = () => {
    const params = useParams();
    const router = useRouter();
    return (
        <div className="flex items-center justify-between">
            <Heading title="Billboards (0)" description="Manage your billboards for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="mr-2 w-4 h-4" />
                Add new
            </Button>
        </div>
    );
};

export default BillboardClient;
