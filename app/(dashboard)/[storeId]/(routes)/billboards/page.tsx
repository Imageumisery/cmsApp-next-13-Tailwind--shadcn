import BillboardClient from "@/components/billboard-client";
import { BillboardColumn } from "@/components/ui/columns";
import prismaDb from "@/lib/prismadb";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const billboards = await prismaDb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedBillboards: BillboardColumn[] = billboards.map((item) => {
        return {
            id: item.id,
            label: item.label,
            createdAt: item.createdAt.toLocaleDateString(),
        };
    });
    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
