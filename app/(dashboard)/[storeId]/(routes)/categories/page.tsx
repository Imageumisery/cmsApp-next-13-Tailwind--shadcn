import prismaDb from "@/lib/prismadb";
import CategoryClient from "./components/category-client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    const categories = await prismaDb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedCategories: CategoryColumn[] = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            billboardLabel: category?.billboard.label,
            createdAt: category.createdAt.toLocaleDateString(),
        };
    });

    return (
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
