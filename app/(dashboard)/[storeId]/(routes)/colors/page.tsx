import prismaDb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import SizeClient from "./components/size-client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const categories = await prismaDb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedSizes: SizeColumn[] = categories.map((item) => {
        return {
            id: item.id,
            name: item.name,
            value: item.value,
            createdAt: item.createdAt.toLocaleDateString(),
        };
    });

    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
