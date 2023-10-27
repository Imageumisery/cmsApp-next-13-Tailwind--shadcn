"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./columns";

interface CategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient = ({ data }: CategoryClientProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading title={`Categories(${data.length})`} description="Manage your categories for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns}/>
        </div>
    );
};

export default CategoryClient;
