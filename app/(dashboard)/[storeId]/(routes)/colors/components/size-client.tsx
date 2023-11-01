"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";

interface CategoryClientProps {
    data: SizeColumn[];
}

const SizeClient = ({ data }: CategoryClientProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes(${data.length})`}
                    description="Manage your sizes for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} />
        </div>
    );
};

export default SizeClient;
