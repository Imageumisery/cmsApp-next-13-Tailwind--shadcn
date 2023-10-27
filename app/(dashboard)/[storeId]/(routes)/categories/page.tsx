import BillboardClient from "@/components/billboard-client";
import { BillboardColumn } from "@/components/ui/columns";
import prismaDb from "@/lib/prismadb";
import CategoryClient from "./components/category-client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    const categories = await prismaDb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include:{
            billboard:true,
        },
        orderBy: {
          createdAt: 'desc'
        }
    });
    const foramttedCategorires: CategoryColumn[] = categories.map((item) => {
        return {
            id: item.id,
            billboardLabel: item.billboard.label,
            name:item.name,
            createdAt: item.createdAt.toLocaleDateString(),
        };
    });
    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <CategoryClient data={foramttedCategorires} />
            </div>
        </div>
    );
};

export default CategoriesPage;
